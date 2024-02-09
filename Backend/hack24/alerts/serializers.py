from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *


class AlertSerializer(ModelSerializer):
  user_name = SerializerMethodField()

  def get_user_name(self, obj):
    return obj.user.name

  class Meta:
    model = Alert
    fields = "__all__"
