from django.shortcuts import render
from .models import User, Project, Comments
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProjectSerializer, CommentsSerializer


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class CommentsView(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    queryset = Comments.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user_id','project_id']

def update_profile(request, user_id):
    user = User.objects.get(pk=user_id)
    user.profile.bio = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...'
    user.save()