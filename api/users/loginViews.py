#views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password


class UserRegistrationView(APIView):
    """
    Handle user registration.
    """
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    """
    Handle user login.
    """
    def post(self, request):
        emailAdress = request.data.get('emailAdress')
        password = request.data.get('password')

        try:
            user = Users.objects.get(emailAdress=emailAdress)
        except Users.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

        if check_password(password, user.password):
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)


class UserChangePasswordView(APIView):
    """
    Handle password change for a user.
    """
    def put(self, request):
        email= request.data.get('emailAdress')
        new_password = request.data.get('password')

        try:
            user = Users.objects.get(emailAdress=email)
        except Users.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)

#end of views.py