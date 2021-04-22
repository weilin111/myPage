from django.db import models

class cool_knowledge(models.Model):
    piece_of_cool=models.TextField()

class visited_number(models.Model):
    visit_time=models.CharField(max_length=30)   
    total_visited_count=models.IntegerField()


class random_picture(models.Model):
    pic=models.ImageField()