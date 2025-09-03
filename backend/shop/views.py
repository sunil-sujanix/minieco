from decimal import Decimal
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import User
from django.db import transaction

from .models import Category, Product, CartItem, Order, OrderItem
from .serializers import (
    CategorySerializer, ProductSerializer, CartItemSerializer,
    OrderSerializer, UserSerializer
)
from .permissions import IsAdminOrOwnerOrReadOnly
from .tasks import send_order_confirmation_email

@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    def get_permissions(self):
        if self.request.method in ("POST", "PUT", "PATCH", "DELETE"):
            return [IsAdminUser()]
        return [AllowAny()]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrOwnerOrReadOnly]
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user).select_related("product")
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by("-id")
        return Order.objects.filter(user=user).order_by("-id")

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def create_from_cart(self, request):
        user = request.user
        cart_items = CartItem.objects.filter(user=user).select_related("product")
        if not cart_items.exists():
            return Response({"detail": "Cart is empty"}, status=400)

        from django.db import transaction
        with transaction.atomic():
            order = Order.objects.create(user=user, status="PAID")  # mock payment -> directly PAID
            total = Decimal("0.00")
            for ci in cart_items:
                price = ci.product.price
                OrderItem.objects.create(order=order, product=ci.product, quantity=ci.quantity, price=price)
                total += price * ci.quantity
            order.total_amount = total
            order.payment_id = "MOCK-" + str(order.id)
            order.save()
            cart_items.delete()

        if user.email:
            send_order_confirmation_email.delay(user.email, order.id)

        return Response(OrderSerializer(order).data, status=201)
