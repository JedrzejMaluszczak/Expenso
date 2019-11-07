from django.db import models

from users.models import User


class Category(models.Model):

    name = models.CharField(max_length=20)

    is_income = models.BooleanField()

    default_value = models.DecimalField(max_digits=8, decimal_places=2)

    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Balance(models.Model):

    date = models.DateField()

    value = models.DecimalField(max_digits=8, decimal_places=2)

    note = models.CharField(max_length=255, blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)
