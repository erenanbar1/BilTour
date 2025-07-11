from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from .models import Tour
from .serializers import TourSerializer
from users.models import Guide


class GetTourListView(APIView):
    """
    Handles listing all tours and creating new tours.
    """
    def get(self, request):
        """
        Retrieve a list of all tours.
        """
        tours = Tour.objects.all()
        serializer = TourSerializer(tours, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateTourView(APIView):

    def post(self, request):
        """
        Create a new tour.
        """
        serializer = TourSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TourRetrieveDeleteView(APIView):
    """
    Handles retrieving and deleting a specific tour.
    """
    def get(self, request, pk):
        """
        Retrieve details of a specific tour.
        """
        tour = get_object_or_404(Tour, pk=pk)
        serializer = TourSerializer(tour)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """
        Delete a specific tour.
        """
        tour = get_object_or_404(Tour, pk=pk)
        if(tour.claimed == True):
            tour.unassignGuide()
        tour.delete()
        return Response({'message': 'Tour successfully deleted'}, status=status.HTTP_204_NO_CONTENT)


class AssignTourToGuideView(APIView):
    """
    Handles assigning a guide to a tour (claiming a tour).
    """
    def post(self, request):
        """
        Assign a guide to a tour and mark it as claimed.

        Args:
            request: The HTTP request containing guide_id and tour_id.

        Returns:
            Response: JSON response with the updated tour details or an error.
        """
        guide_id = request.data.get('guide_id')
        tour_id = request.data.get('tour_id')

        # Validate that both guide_id and tour_id are provided
        if not guide_id:
            return Response({'error': 'guide_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not tour_id:
            return Response({'error': 'tour_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the guide and tour objects
        guide = get_object_or_404(Guide, pk=guide_id)
        tour = get_object_or_404(Tour, pk=tour_id)

        # Check if the tour is already claimed
        if tour.claimed:
            return Response({'error': 'Tour is already claimed'}, status=status.HTTP_400_BAD_REQUEST)

        # Assign the guide to the tour
        try:
            tour.assignGuide(guide)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize the updated tour and return response
        serializer = TourSerializer(tour)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DropGuideFromTourView(APIView):
    """
    Handles unassigning a guide from a tour (dropping the guide).
    """
    def post(self, request):
        """
        Unassign a guide from a tour and return the guide ID.

        Args:
            request: The HTTP request containing the tour_id.

        Returns:
            Response: JSON response with the guide ID or an error.
        """
        tour_id = request.data.get('tour_id')

        # Validate that tour_id is provided
        if not tour_id:
            return Response({'error': 'tour_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the tour object
        tour = get_object_or_404(Tour, pk=tour_id)

        # Check if the tour has a guide assigned
        if not tour.guide:
            return Response({'error': 'No guide is assigned to this tour'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the guide ID before unassigning
        guide_id = tour.guide.id

        # Unassign the guide from the tour
        tour.unassignGuide()

        # Serialize the updated tour and return response
        serializer = TourSerializer(tour)
        return Response({'guide_id': guide_id, 'tour': serializer.data}, status=status.HTTP_200_OK)
