from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import exceptions
from rest_framework import serializers

class RegisterUserSerializer(ModelSerializer):

  class Meta:
    model = CustomUser
    fields = "__all__"

  def create(self, validated_data):
    return CustomUser.objects.create_user(
      email=validated_data.get('email'),
      password=validated_data.get('password'),
      name=validated_data.get('name')
    )

class LoginUserSerializer(serializers.Serializer):
  email=serializers.EmailField(max_length=255)
  password=serializers.CharField(max_length=128,write_only=True)

  def validate(self, attrs):
    email = attrs.get('email')
    password = attrs['password']
    if email and password:
      print('ok')
      user = authenticate(email=email, password=password)
      if user:
        return {'user':user, 'email':email}
        # token,_ = Token.objects.get_or_create(email=email)
      else:
        raise exceptions.ValidationError("unable to login with these credentials")
    else:
      raise exceptions.ValidationError("provide both email and password")
