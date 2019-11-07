# Generated by Django 2.2.7 on 2019-11-06 14:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('balance', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.User'),
        ),
        migrations.AddField(
            model_name='balance',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='balance.Category'),
        ),
    ]
