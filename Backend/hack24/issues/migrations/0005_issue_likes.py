# Generated by Django 4.1 on 2024-02-09 16:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('issues', '0004_issue_lat_issue_long_alter_issue_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='likes',
            field=models.ManyToManyField(related_name='issue_like', to=settings.AUTH_USER_MODEL),
        ),
    ]
