from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category, Product

class ProductTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="u1", password="pass")
        self.client.login(username="u1", password="pass")
        self.category = Category.objects.create(name="Cat", slug="cat")

    def test_create_product(self):
        url = "/api/products/"
        data = {"title": "Item", "description": "desc", "price": "10.00", "stock": 5, "category": self.category.id}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "Item")
