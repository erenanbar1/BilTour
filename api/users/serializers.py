from rest_framework import serializers
from users.models import Users, Guide, PermissionLevel
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is not exposed in responses

    class Meta:
        model = Users
        fields = ['id', 'username', 'emailAdress', 'password']  # Include all necessary fields
        extra_kwargs = {
            'password': {'write_only': True},  # Password should not be included in serialized output
        }

    def create(self, validated_data):
        # Hash the password before creating the user
        validated_data['password'] = make_password(validated_data['password'])

        # Create a Guide instance instead of a Users instance
        guide = Guide.objects.create(
            username=validated_data.get('username'),
            emailAdress=validated_data.get('emailAdress'),
            password=validated_data.get('password'),
            permission=PermissionLevel.TRAINEE_GUIDE.name,  # Default permission level
        )
        return guide

    def update(self, instance, validated_data):
        # Hash the password if it is being updated
        password = validated_data.get('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)
    
    def validate_emailAdress(self, value):
        # Ensure email is unique
        if Users.objects.filter(emailAdress=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
