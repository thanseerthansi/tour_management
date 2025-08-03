from django.db import models
from country_app.models import City_Model

# Create your models here.  
class Tour_model(models.Model):
    package_title = models.CharField(max_length=100)
    city = models.ForeignKey(City_Model, on_delete=models.CASCADE)
    destination = models.ForeignKey(City_Model, on_delete=models.CASCADE, related_name='destination_city')
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    terms_and_conditions = models.TextField()
    package_photo = models.JSONField(default=list) 
    # package_photo = models.ImageField(upload_to='media/')


    def __str__(self):
        return self.package_title

class Schedule_model(models.Model):
    schedule_title = models.CharField(max_length=100)
    package = models.ForeignKey(Tour_model, on_delete=models.CASCADE, related_name='schedules')
    from_date = models.DateField()
    to_date = models.DateField()
    # amount = models.DecimalField(max_digits=10, decimal_places=2)
    schedule_description = models.TextField()
    schedule_photo = models.JSONField(default=list)  
    # schedule_photo = models.ImageField(upload_to='media/')

    def __str__(self):
        return self.schedule_title
