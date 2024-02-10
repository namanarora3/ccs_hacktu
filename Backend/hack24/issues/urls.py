from django.urls import path

from .views import *

urlpatterns = [
  path('', issueView.as_view()),
  path('<int:pk>/', issueDetailView.as_view()),
  path('update/<int:pk>/', updateStatusView.as_view()),
  path('comments/<int:pk>/', commentView.as_view()),
  path('like/<int:pk>/', ToggleLikeView.as_view()),
  path('dashboard/', dashboardStatView.as_view())
  # path('comments/add/<int:pk>/', commentAddView.as_view()),
]
