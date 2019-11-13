from django.contrib import admin

from users.models import User


@admin.register(User)
class CategoryAdmin(admin.ModelAdmin):

    list_display = ["id", "username", "email"]

    list_display_links = ["id", "username", "email"]
