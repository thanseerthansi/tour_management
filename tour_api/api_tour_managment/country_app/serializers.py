from rest_framework import serializers
from .models import Country_Model, City_Model

class CountryWithCitiesSerializer(serializers.Serializer):
    country = serializers.CharField()
    cities = serializers.ListField(child=serializers.CharField(), write_only=True)
    def create(self, validated_data):
        city_names = validated_data.pop('cities')
        country_name = validated_data.get('country').strip()
        country_id = self.initial_data.get('id')

        if country_id:
            # Update existing country
            try:
                country = Country_Model.objects.get(id=country_id)
            except Country_Model.DoesNotExist:
                raise serializers.ValidationError({"id": "Country with this ID does not exist."})

            # Check if the new country name already exists in another country
            if Country_Model.objects.exclude(id=country_id).filter(country__iexact=country_name).exists():
                raise serializers.ValidationError({"country": "A country with this name already exists."})

            # Update country name
            country.country = country_name
            country.save()

            # Replace cities
            City_Model.objects.filter(country=country).delete()
        else:
            if Country_Model.objects.filter(country__iexact=country_name).exists():
                raise serializers.ValidationError({"country": "A country with this name already exists."})

   
            country = Country_Model.objects.create(country=country_name)

        city_objs = [
            City_Model(name=city_name.strip(), country=country)
            for city_name in city_names if city_name.strip()
        ]
        City_Model.objects.bulk_create(city_objs)

        return country
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country_Model
        fields = ['id', 'country']

class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True) 
    class Meta:
        model = City_Model
        fields = ['id', 'name', 'country']
    