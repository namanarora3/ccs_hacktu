from django.db import models
from users.models import *

# Create your models here.

class issue(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField(null=True, blank=True)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)
  # likes =
  # dislikes =
  # status =
  # long = models.DecimalField(max_digits=9, decimal_places=6)
  # lat  = models.DecimalField(max_digits=9, decimal_places=6)

class comment(models.Model):
  issue = models.ForeignKey(issue, on_delete=models.CASCADE)
  content = models.TextField()
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

class image(models.Model):
  issue = models.ForeignKey(issue, on_delete=models.CASCADE)
  image = models.ImageField(upload_to='images/issues/')
