from django.shortcuts import render
from .models import Project, Comments, ProjectOwnership
from rest_framework import viewsets, permissions, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProjectSerializer, CommentsSerializer, UserSerializer, UserSerializerWithToken, ProjectOwnershipSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class CommentsView(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    queryset = Comments.objects.all().order_by('added').select_related('user_id')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user_id','project_id']


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class OwnershipView(viewsets.ModelViewSet):
    serializer_class = ProjectOwnershipSerializer
    queryset = ProjectOwnership.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user_id','project_id']


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)