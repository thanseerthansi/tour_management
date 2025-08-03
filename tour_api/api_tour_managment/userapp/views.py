from api_tour_managment.global_import import *
# Create your views here.
class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print("data",self.request.data)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        try:
            test = serializer.is_valid(raise_exception=True) 
            user = serializer.validated_data['user']

            
            token, created = Token.objects.get_or_create(user=user)
            # print("token",token.key)
            return Response({
                "status":status.HTTP_200_OK,
                "data": {
                'token': "Token "+token.key,
                'user_id': user.pk,
                'is_superuser':user.is_superuser,
                }
               
            })
        except Exception as e:
            print("e",e)
            return Response({
                "status":status.HTTP_400_BAD_REQUEST,
                "message":"Incorrect Username or Password",
                "excepction":str(e),
            })


class Logout(ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)
  
    def get(self,request):
        try:
            Data = Token.objects.get(user = self.request.user.id)
            Data.delete()
            # print("ok")
            return Response({"status":status.HTTP_200_OK,"message":"logout successfully"})
        except Exception as e:
            # print("e",e)
            return Response({"status":status.HTTP_400_BAD_REQUEST,"message":str(e)})