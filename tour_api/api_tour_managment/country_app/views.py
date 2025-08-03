from api_tour_managment.global_import import *
from .models import Country_Model, City_Model
from .serializers import CountryWithCitiesSerializer,CitySerializer


class CountryCityView(ListAPIView):
    serializer_class = CountryWithCitiesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Country_Model.objects.all()

    def list(self, request, *args, **kwargs):
        countries = Country_Model.objects.all()
        data = []
        for country in countries:
            cities = City_Model.objects.filter(country=country).values_list('name', flat=True)
            data.append({
                "country": country.country,
                "cities": list(cities),
                "id": country.id
            })
        return Response({
            "status": status.HTTP_200_OK,
            "data": data
        })

    def post(self, request):
        try:
            serializer = CountryWithCitiesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"status": status.HTTP_200_OK, "Message": "Country and cities added successfully"})
            else:
                return Response({"status": status.HTTP_400_BAD_REQUEST, "Errors": serializer.errors})
        except Exception as e:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "Message": str(e)})

    def delete(self, request):
        try:
            country_id = request.GET.get("id")
            if not country_id:
                return Response({"status": status.HTTP_400_BAD_REQUEST, "Message": "ID is required"})
            try:
                country = Country_Model.objects.get(id=country_id)
            except Country_Model.DoesNotExist:
                return Response({"status": status.HTTP_404_NOT_FOUND, "Message": "Country not found"})
            country.delete() 
            return Response({"status": status.HTTP_200_OK, "Message": "Country and its cities deleted successfully"})

        except Exception as e:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "Message": str(e)})

class CityView(ListAPIView):
    serializer_class = CitySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)   
    def get_queryset(self):
        queryset = City_Model.objects.all()
        country_id = self.request.GET.get('country_id') 
        if country_id:
            queryset = queryset.filter(country__id=country_id)
        return queryset.order_by('-id')
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": status.HTTP_200_OK,
            "data": serializer.data
        })