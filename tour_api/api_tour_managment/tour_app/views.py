from api_tour_managment.global_import import *
from .models import Tour_model,Schedule_model
from .serializer import Tour_serializer , Schedule_serializer
from api_tour_managment.validation import Validate
from country_app.models import City_Model
# Create your views here.
class TourView(ListAPIView):
    serializer_class = Tour_serializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        tour_obj = Tour_model.objects.all()
        id = self.request.GET.get('id')
        if id:tour_obj = tour_obj.filter(id=id)
        return tour_obj.order_by('-id')

    def post(self, request):
        try:
            msg = ""
            request_data = request.data.copy()

            id = request_data.get('id', '')
            package_title = request_data.get('package_title', '')
            destination = request_data.get('destination', '')
            city = request_data.get('city', '')

            if city and destination:
                try:
                    city_obj = City_Model.objects.get(id=city)
                    dest_obj = City_Model.objects.get(id=destination)
                except City_Model.DoesNotExist:
                    return Response({
                        "status": status.HTTP_400_BAD_REQUEST,
                        "message": "City or Destination not found"
                    })

                request_data['city'] = city_obj.id
                request_data['destination'] = dest_obj.id

                
                photos = request_data.get("package_photo", [])
                if isinstance(photos, str):
                    photos = [p.strip() for p in photos.split(",") if p.strip()]
                elif not isinstance(photos, list):
                    photos = []
                request_data["package_photo"] = photos

                if id:
                    tour_obj = Tour_model.objects.filter(id=id).first()
                    if tour_obj:
                        serializer = Tour_serializer(tour_obj, data=request_data, partial=True)
                        msg = "Tour updated successfully"
                    else:
                        return Response({
                            "status": status.HTTP_404_NOT_FOUND,
                            "message": "Tour not found"
                        })
                else:
                    serializer = Tour_serializer(data=request_data)
                    msg = "Tour added successfully"

                serializer.is_valid(raise_exception=True)
                serializer.save()

                return Response({
                    "status": status.HTTP_200_OK,
                    "message": msg
                })

            else:
                return Response({
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "City and destination are required"
                })

        except Exception as e:
            print("e", e)
            return Response({
                "status": status.HTTP_400_BAD_REQUEST,
                "message": str(e)
            })

    def delete(self,request):
        try:
            id  = request.GET.get("id")
            u_obj = Tour_model.objects.filter(id=id)
            if u_obj.count():
                u_obj.delete()
                return Response({"status":status.HTTP_200_OK,"message":"Successfully deleted"})
            else:return Response({"status":status.HTTP_404_NOT_FOUND,"message":"NO data found with given id "})
        except Exception as e:return Response({"status":status.HTTP_400_BAD_REQUEST,"message":str(e)})

class ScheduleView(ListAPIView):
    serializer_class = Schedule_serializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get_queryset(self):
        schedule_obj = Schedule_model.objects.all()
        id = self.request.GET.get('id')
        from_date = self.request.GET.get('from_date')
        package = self.request.GET.get('package')

        if from_date:
            schedule_obj = schedule_obj.filter(from_date=from_date)
        if package:
            schedule_obj = schedule_obj.filter(package__id=package)
        if id:
            schedule_obj = schedule_obj.filter(id=id)

        return schedule_obj.order_by('-id')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "status": status.HTTP_200_OK,
            "data": serializer.data
        })

    def post(self, request):
        try:
            request_data = dict(request.data.copy())
            msg = ""

            # Get ID for update (optional)
            id = request_data.get('id', None)

            # Get and validate 'package'
            package = request_data.get('package')
            if not package:
                return Response({"status": status.HTTP_400_BAD_REQUEST, "message": "Package is required"})

            try:
                package_obj = Tour_model.objects.get(id=package)
                request_data['package'] = package_obj.id
            except Tour_model.DoesNotExist:
                return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Package not found"})
            print("request_datarequest_data",request_data)
            
            if id:
                try:
                    schedule_obj = Schedule_model.objects.get(id=id)
                    serializer = Schedule_serializer(schedule_obj, data=request_data, partial=True)
                    msg = "Schedule updated successfully"
                except Schedule_model.DoesNotExist:
                    return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Schedule not found"})
            else:
                serializer = Schedule_serializer(data=request_data)
                msg = "Schedule added successfully"

            # Validate and save
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({"status": status.HTTP_200_OK, "message": msg})

        except Exception as e:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "message": str(e)})

    def delete(self, request):
        try:
            id = request.GET.get("id")
            u_obj = Schedule_model.objects.filter(id=id)
            if u_obj.count():
                u_obj.delete()
                return Response({"status": status.HTTP_200_OK, "message": "Successfully deleted"})
            else:
                return Response({"status": status.HTTP_404_NOT_FOUND, "message": "No data found with given id"})
        except Exception as e:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "message": str(e)})