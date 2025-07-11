
from django.urls import path
from .loginViews import UserRegistrationView, UserLoginView, UserChangePasswordView
from .usersView import ListAllUsersView
urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('change-password/', UserChangePasswordView.as_view(), name='change_password'),
    path('list-users/', ListAllUsersView.as_view(), name='list_users')
]
