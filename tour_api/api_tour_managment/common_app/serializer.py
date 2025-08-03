from rest_framework import serializers
from .models import Image_model

class ImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Image_model
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return obj.image.url
            # return request.build_absolute_uri(obj.image.url)
        return None
