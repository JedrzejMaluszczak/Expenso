from rest_framework import serializers

from users.models import User


class UserSimplySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name"]
