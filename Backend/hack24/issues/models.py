from django.db import models
from users.models import *

# Create your models here.
CATEGORY_CHOICES = (
  ('water',  'plumbing issues'),
  ('infra', 'infrastructure issues'),
  ('electrical', 'electrical issues'),
  ('social_justice', 'social_justice'),
)
class issue(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField(null=True, blank=True)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)
  image = models.ImageField(upload_to='images/issues/', blank=True, null=True)
  category = models.TextField(choices=CATEGORY_CHOICES, default='infra')
  # likes =
  # dislikes =
  # status =
  # long = models.DecimalField(max_digits=9, decimal_places=6)
  # lat  = models.DecimalField(max_digits=9, decimal_places=6)
  def __str__(obj):
    return obj.title+" by "+obj.user.name

class comment(models.Model):
  issue = models.ForeignKey(issue, on_delete=models.CASCADE)
  content = models.TextField()
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

class image(models.Model):
  issue = models.ForeignKey(issue, on_delete=models.CASCADE, related_name="issue_images")
  image = models.ImageField(upload_to='images/issues/')
