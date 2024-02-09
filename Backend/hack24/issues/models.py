from django.db import models
from users.models import *

# Create your models here.
CATEGORY_CHOICES = (
  ('water',  'plumbing issues'),
  ('infra', 'infrastructure issues'),
  ('electrical', 'electrical issues'),
  ('social_justice', 'social_justice'),
  ('other', 'other')
)
STATUS_CHOICES = (
  (1, "Created"),
  (2, "Accepted by Authorities"),
  (3, "In Process"),
  (4, "Problem is fixed")
)
class Issue(models.Model):
  title = models.CharField(max_length=255)
  description = models.TextField(null=True, blank=True)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)
  image = models.ImageField(upload_to='images/issues/', blank=True, null=True)
  category = models.TextField(choices=CATEGORY_CHOICES, default='infra')
  # likes =
  # dislikes =
  # status =
  long = models.DecimalField(max_digits=19, decimal_places=16)
  lat  = models.DecimalField(max_digits=19, decimal_places=16)
  likes = models.ManyToManyField(CustomUser, related_name='issue_like', null=True, blank=True)
  status = models.IntegerField(choices=STATUS_CHOICES,  default=1)

  def number_of_likes(self):
      return self.likes.count()

  def __str__(obj):
    return obj.title+" by "+obj.user.name

class Comment(models.Model):
  issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
  content = models.TextField()
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
  issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name="issue_images")
  image = models.ImageField(upload_to='images/issues/')
