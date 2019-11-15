from rest_framework import serializers

from balance.models import Category, Balance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CategorySimplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class CategoryBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "category_balance"]

    category_balance = serializers.SerializerMethodField()

    def get_category_balance(self, category: Category):
        balances = Balance.objects.filter(category=category)
        category_balance = 0
        for balance in balances:
            category_balance += balance.amount
        return category_balance


class SimplyBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = "__all__"


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = "__all__"
        depth = 1
