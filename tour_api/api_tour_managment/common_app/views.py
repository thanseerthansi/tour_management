from api_tour_managment.global_import import *
from .serializer import ImageSerializer
from .models import Image_model
import hashlib

# Create your views here.
class ImageUploadView(ListAPIView):
    queryset = Image_model.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES.get('image')
            if not file:
                return Response({'error': 'Image file is required'}, status=status.HTTP_400_BAD_REQUEST)

            # Log file name/type
            print("Uploading file:", file.name, file.content_type)

            # Generate hash for duplicate checking
            file_hash = hashlib.md5(file.read()).hexdigest()
            file.seek(0)

            # Check for duplicate
            for instance in Image_model.objects.all():
                existing_file = instance.image
                with open(existing_file.path, 'rb') as f:
                    existing_hash = hashlib.md5(f.read()).hexdigest()
                    if file_hash == existing_hash:
                        serializer = ImageSerializer(instance, context={'request': request})
                        return Response(serializer.data, status=status.HTTP_200_OK)

            # Save new image
            serializer = ImageSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                instance = serializer.save()
                return Response(ImageSerializer(instance, context={'request': request}).data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch unexpected errors
            print("Exception occurred in upload:", str(e))
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
