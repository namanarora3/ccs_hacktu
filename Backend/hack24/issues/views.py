from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import issue
from .serializers import IssueSerializer

# Create your views here.
class issueView(ListCreateAPIView):
  permission_classes = [IsAuthenticated]
  authentication_classes = [TokenAuthentication]
  serializer_class = IssueSerializer
  queryset = issue.objects.all()

  def post(self, request, *args, **kwargs):
    user = request.user
    request.data._mutable = True
    request.data['user'] = user.id
    return super().post(request, *args, **kwargs)
