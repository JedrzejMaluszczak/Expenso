# Generated by Django 2.2.7 on 2019-11-08 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('balance', '0003_auto_20191108_1458'),
    ]

    operations = [
        migrations.RenameField(
            model_name='balance',
            old_name='value',
            new_name='amount',
        ),
        migrations.RemoveField(
            model_name='category',
            name='default_value',
        ),
    ]
