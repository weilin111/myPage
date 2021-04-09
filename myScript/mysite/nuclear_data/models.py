from django.db import models

# Create your models here.



class Test(models.Model):
    name=models.CharField(max_length=20)

class Test2(models.Model):
    name=models.CharField(max_length=20)
    value=models.FloatField()