from rest_framework import serializers
from .models import Tour


class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = ['schoolName', 'schoolCity', 'counselarName','counselarPhoneNumber','counselarPosition','counselarEmail', 'date', 'time', 'studentCount',]
