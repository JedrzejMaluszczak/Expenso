from rest_framework import routers

from balance.views import BalanceView, CategoryView

router = routers.DefaultRouter()

router.register("balance", BalanceView, basename="balance")
router.register("category", CategoryView, basename="category")
