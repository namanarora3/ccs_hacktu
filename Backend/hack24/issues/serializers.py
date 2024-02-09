from rest_framework.serializers import ModelSerializer, Serializer, SerializerMethodField
from .models import *


class IssueSerializer(ModelSerializer):
  user_name = SerializerMethodField()
  is_liked = SerializerMethodField()
  liked_by = SerializerMethodField()
  like_count = SerializerMethodField()

  def get_like_count(self, obj):
    return obj.likes.count()

  def get_user_name(self, obj):
    return obj.user.name

  def get_is_liked(self, obj):
    user = self.context['request'].user
    return bool(obj.likes.filter(id=user.id).exists())

  def get_liked_by(self, obj):
    list = [];
    for like in obj.likes.all():
      list.append(like.name)
    return list
  class Meta:
    model = Issue
    fields = '__all__'


class CommentSerializer(ModelSerializer):

  class Meta:
    model = Comment
    fields = '__all__'

