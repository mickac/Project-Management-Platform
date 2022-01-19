from django.urls import path
from .views import current_user, UserList, ProjectView

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('projects/', ProjectView.as_view()),
    path('projects/<int:pk>/', ProjectView.as_view()),
]