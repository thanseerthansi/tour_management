from django.shortcuts import render
from api_tour_managment.global_import import *
from .serializer import BannerSerializer
from .models import BannerModel
# Create your views here.
class BannerView(ListAPIView):
    serializer_class = BannerSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        obj = BannerModel.objects.all()
        id = self.request.GET.get('id')
        status = self.request.GET.get('status')
        if id:obj = obj.filter(id=id)
        if status: obj = obj.filter(status=True)
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
            msg = ""
            if id:
                obj = BannerModel.objects.filter(id=id)
                if obj.count():
                    obj = obj.first()
                    serializer = BannerSerializer(obj, data=request.data, partial=True)
                    msg = "Banner updated successfully"
                else:
                    return Response({"status": status.HTTP_404_NOT_FOUND, "message": "Banner not found"})
            else:
                serializer = BannerSerializer(data=request.data)
                msg = "Banner added successfully"

            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"status": status.HTTP_200_OK, "message":msg})
    
        except Exception as e:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "message": str(e)})

    def delete(self,request):
        try:
            id  = request.GET.get("id")
            u_obj = BannerModel.objects.filter(id=id)
            if u_obj.count():
                u_obj.delete()
                return Response({"status":status.HTTP_200_OK,"message":"Successfully deleted"})
            else:return Response({"status":status.HTTP_404_NOT_FOUND,"message":"NO data found with given id "})
        except Exception as e:return Response({"status":status.HTTP_400_BAD_REQUEST,"message":str(e)})
