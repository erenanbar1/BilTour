from django.urls import path
from .views import GetTourListView, CreateTourView, TourRetrieveDeleteView, AssignTourToGuideView, DropGuideFromTourView

urlpatterns = [
    path('tour-list/', GetTourListView.as_view(), name='get_tour_list'),
    path('create-tour/', CreateTourView.as_view(), name='create_tour'),
    path('retrieve-delete/<int:pk>/', TourRetrieveDeleteView.as_view(), name='retrieve_delete_tour'),
    path('assign-tour-to-guide/', AssignTourToGuideView.as_view(), name='assign_guide_to_tour'),
    path('drop-guide/', DropGuideFromTourView.as_view(), name='unassign_guide_from_tour'),
]
