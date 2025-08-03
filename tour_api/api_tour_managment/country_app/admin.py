from django.contrib import admin
from .models import Country_Model, City_Model
# Register your models here.
admin.site.register(Country_Model)
admin.site.register(City_Model)