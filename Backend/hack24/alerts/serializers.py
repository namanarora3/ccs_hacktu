from rest_framework.serializers import ModelSerializer
from .models import *


class AlertSerializer(ModelSerializer):
  class Meta:
    model = Alert
    fields = "__all__"
