from django.db import models
from datetime import datetime

# Create your models here.

class FoodItems(models.Model):
    Name=models.CharField(max_length=100,default="")
    Calories=models.IntegerField(default=0)
    Time=models.TimeField(default=datetime.now().time())
    Username=models.CharField(max_length=100,default="")
    Quantity=models.IntegerField(default=0)
    Status=models.BooleanField(default=False)
    Type=models.BooleanField(default=False)
    
    





