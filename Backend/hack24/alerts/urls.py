from django.urls import path
from .views import *

urlpatterns = [
  path('', ViewAlert.as_view()),
  path('create/', CreateAlert.as_view()),
]
