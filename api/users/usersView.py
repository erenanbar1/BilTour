from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from users.models import Users, Guide, Advisor, PermissionLevel

class ListAllUsersView(APIView):
    """
    List all users with their roles.
    """
    def get(self, request):
        all_users = []
        users = Users.objects.all()

        for user in users:
            role = "User"
            if hasattr(user, 'advisor'):
                role = "Advisor"
            elif hasattr(user, 'guide'):
                role = user.guide.permission if user.guide.permission else "Guide"

            all_users.append({
                "user_id": user.id,
                "username": user.username,
                "email": user.emailAdress,
                "role": role
            })

        # Move the return statement outside the for loop
        return Response(all_users, status=status.HTTP_200_OK)

