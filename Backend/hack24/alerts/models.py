from django.db import models
from django.conf import settings
# Create your models here.
class Alert(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  title = models.CharField(max_length=255)
  area = models.CharField(max_length=100)
  discription = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  duration = models.DurationField()

  def __str__(obj):
    return obj.title