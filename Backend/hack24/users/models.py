from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, is_staff=False, is_superuser=False):
        if not email:
            raise ValueError('Users must have an email address')
        now = timezone.localtime(timezone.now())
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            last_login=now,

        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password,"admin", True, True)
        user.admin = True
        user.save(using=self._db)
        return user
# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
  name = models.CharField(max_length=255)
  email = models.EmailField(max_length=255, unique=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  is_official = models.BooleanField(default=False)

  USERNAME_FIELD = 'email'

  objects = UserManager()