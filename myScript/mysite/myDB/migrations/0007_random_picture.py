# Generated by Django 3.2 on 2021-04-22 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myDB', '0006_visited_number_total_visited_count'),
    ]

    operations = [
        migrations.CreateModel(
            name='random_picture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pic', models.ImageField(upload_to='')),
            ],
        ),
    ]
