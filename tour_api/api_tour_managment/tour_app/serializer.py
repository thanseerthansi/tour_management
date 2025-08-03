from rest_framework import serializers
from .models import Tour_model, Schedule_model
from country_app.serializers import CitySerializer
from country_app.models import City_Model
class Tour_serializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    destination = CitySerializer(read_only=True)
    city_id = serializers.PrimaryKeyRelatedField(queryset=City_Model.objects.all(), write_only=True, source='city')
    destination_id = serializers.PrimaryKeyRelatedField(queryset=City_Model.objects.all(), write_only=True, source='destination')

    class Meta:
        model = Tour_model
        fields = '__all__'


class Schedule_serializer(serializers.ModelSerializer):
    package = serializers.PrimaryKeyRelatedField(queryset=Tour_model.objects.all(), write_only=True)
    package_details = Tour_serializer(source='package', read_only=True)
    class Meta:
        model = Schedule_model
        fields = '__all__'
        