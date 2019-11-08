from django.contrib import admin

from balance.models import Category, Balance


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = ["id", "is_income", "user"]

    list_display_links = ["id", "is_income", "user"]


@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):

    list_display = ["id", "date", "amount", "category"]

    list_display_links = ["id", "date", "amount", "category"]
