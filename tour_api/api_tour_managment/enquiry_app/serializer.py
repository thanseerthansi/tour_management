# enquiry_app/serializer.py

from rest_framework import serializers
from .models import EnquiryModel
from  tour_app.serializer import Schedule_serializer
from tour_app.models import Schedule_model
class EnquirySerializer(serializers.ModelSerializer):
    related_package = Schedule_serializer(read_only=True)
    related_package_id = serializers.PrimaryKeyRelatedField(
        queryset=Schedule_model.objects.all(),
        source='related_package',
        write_only=True,
        required=False
    )
    class Meta:
        model = EnquiryModel
        fields = '__all__'
