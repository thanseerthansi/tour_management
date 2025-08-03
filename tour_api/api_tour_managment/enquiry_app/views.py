from django.shortcuts import render
from api_tour_managment.global_import import *
from .serializer import EnquirySerializer
from .models import EnquiryModel
from tour_app.models import Schedule_model
# Create your views here.
class EnquiryView(ListAPIView):
    serializer_class = EnquirySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get_queryset(self):
        obj = EnquiryModel.objects.all()
        id = self.request.GET.get('id')
        if id:obj = tour_obj.filter(id=id)
        return obj.order_by('-id')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        # return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response({
            "status": status.HTTP_200_OK,
            "data": serializer.data
        })
    def post(self, request):
        try:
            try:id = request.data['id']
            except: id = None
            try:related_package = request.data['related_package']
            except: related_package = None
            msg = ""
            request_data = request.data.copy()
            if related_package:
                try:
                    related_package = Schedule_model.objects.get(id=related_package)
                    
                    request_data['city'] = city_obj.id
                except Schedule_model.DoesNotExist:
                    return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Related package not found"})
            if id:
                obj = EnquiryModel.objects.filter(id=id)
                if obj.count():
                    obj = obj.first()
                    serializer = EnquirySerializer(obj, data=request_data, partial=True)
                    msg = "Enquiry updated successfully"
                else:
                    return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Enquiry not found"})
            else:
                serializer = EnquirySerializer(data=request_data)
                msg = "Enquiry added successfully"

            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "message":msg})
    
        except Exception as e:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "message": str(e)})

    def delete(self,request):
        try:
            id  = request.GET.get("id")
            u_obj = EnquiryModel.objects.filter(id=id)
            if u_obj.count():
                u_obj.delete()
                return Response({"status":status.HTTP_200_OK,"message":"Successfully deleted"})
            else:return Response({"status":status.HTTP_404_NOT_FOUND,"message":"NO data found with given id "})
        except Exception as e:return Response({"status":status.HTTP_400_BAD_REQUEST,"message":str(e)})
