from django.urls import path

from .views import issueView

urlpatterns = [
  path('', issueView.as_view()),

]
