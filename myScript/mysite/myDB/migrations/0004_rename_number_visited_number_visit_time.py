# Generated by Django 3.2 on 2021-04-18 06:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myDB', '0003_alter_visited_number_number'),
    ]

    operations = [
        migrations.RenameField(
            model_name='visited_number',
            old_name='number',
            new_name='visit_time',
        ),
    ]
