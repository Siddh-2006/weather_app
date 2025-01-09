from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class User_data(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    prefered_loction=models.CharField(max_length=70)
