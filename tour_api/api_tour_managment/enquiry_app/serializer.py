# enquiry_app/serializer.py

from rest_framework import serializers
from .models import EnquiryModel

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = EnquiryModel
        fields = '__all__'
