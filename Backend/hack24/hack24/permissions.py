from rest_framework.permissions import BasePermission

class IsOfficial(BasePermission):
  message = 'only officials can perform this action';
  def has_permission(self, request, view):
    return bool(request.user & request.user.is_official)