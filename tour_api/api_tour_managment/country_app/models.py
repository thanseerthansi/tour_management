from django.db import models

# Create your models here.
class Country_Model(models.Model):
    country = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.country

class City_Model(models.Model):
    name = models.CharField(max_length=100, unique=False)
    country = models.ForeignKey(Country_Model, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('country', 'name')

    def __str__(self):
        return f"{self.name} - {self.country.country}"