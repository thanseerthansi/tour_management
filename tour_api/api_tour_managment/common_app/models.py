from django.db import models

# Create your models here.
class Image_model(models.Model):
    image = models.ImageField(upload_to='media/')
    def __str__(self):
        return str(self.image.url) if self.image else ""