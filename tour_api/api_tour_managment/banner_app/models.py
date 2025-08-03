from django.db import models

# Create your models here.
class BannerModel(models.Model):
    image = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.title if self.title else "Banner without title"