from django.urls import path
from .views import CountryCityView,CityView

urlpatterns = [
    path('country', CountryCityView.as_view(), name='country-city-view'),
    path('city', CityView.as_view()),
]
