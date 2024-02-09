from rest_framework.serializers import ModelSerializer, Serializer, SerializerMethodField
from .models import *


class IssueSerializer(ModelSerializer):
  user_name = SerializerMethodField()

  def get_user_name(self, obj):
    return obj.user.name
  class Meta:
    model = issue
    fields = '__all__'


class CommentSerializer(ModelSerializer):

  class Meta:
    model = comment
    fields = '__all__'

