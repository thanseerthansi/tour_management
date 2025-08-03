from django.db import models
from tour_app.models import Schedule_model
# Create your models here.
class EnquiryModel(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    message = models.TextField(null=True,blank=True)
    related_package = models.ForeignKey(Schedule_model, on_delete=models.PROTECT, null=True, blank=True)
