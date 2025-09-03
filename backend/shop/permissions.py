from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        return user and user.is_authenticated and (user.is_staff or getattr(obj, "owner_id", None) == user.id)
