from django.urls import path
from .views import current_user, UserList, ProjectView

app_name='project_management_system'

urlpatterns = [
    path('current_user/', current_user, name='current_user'),
    path('users/', UserList.as_view(), name='users'),
    path('projects/', ProjectView.as_view(), name='projects'),
    path('projects/<int:pk>/', ProjectView.as_view()),
]
