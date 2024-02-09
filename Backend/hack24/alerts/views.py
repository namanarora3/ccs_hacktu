from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from hack24.permissions import *
from .serializers import *
# Create your views here.

class CreateAlert(APIView):
  permission_classes = [IsAuthenticated, IsOfficial]
  authentication_classes = [TokenAuthentication]

  def post(self, request):
    data = request.data.copy()
    data.user = request.user.id
    serializer = AlertSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'status':'success', 'data':serializer.data}, status=status.HTTP_201_CREATED)

class ViewAlert(APIView):
  permission_classes = [IsAuthenticated]
  authentication_classes = [TokenAuthentication]

  def get(self, request):
    alerts = Alert.objects.all()
    serializer = AlertSerializer(alerts, many=True)
    return Response({'status':'success', 'data':serializer.data}, status=status.HTTP_200_OK)



