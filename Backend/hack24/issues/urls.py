from django.urls import path

from .views import *

urlpatterns = [
  path('', issueView.as_view()),
  path('comments/<int:pk>/', commentView.as_view()),
  path('like/<int:pk>/', ToggleLikeView.as_view()),
  # path('comments/add/<int:pk>/', commentAddView.as_view()),
]
