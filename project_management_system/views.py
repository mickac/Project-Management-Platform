from .models import Project, Comments, ProjectOwnership
from rest_framework import viewsets, permissions, status, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    ProjectSerializer,
    CommentsSerializer,
    UserSerializer,
    UserSerializerWithToken,
    ProjectOwnershipSerializer,
)
from django.contrib.auth import get_user_model

User = get_user_model()


class ProjectView(APIView):
    def get(self, request, format=None):
        try:
            projects = Project.objects.filter(user=request.user)
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        try:
            User.objects.filter(email=request.user)
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request, pk, format=None):
        project = Project.objects.filter(pk=pk).first()
        project_owner = (
            ProjectOwnership.objects.filter(project_id=project.pk)
            .filter(is_owner=True)
            .first()
        )
        if request.user == project_owner.user_id:
            serializer = ProjectSerializer(project, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, pk, format=None):
        project_owner = (
            ProjectOwnership.objects.filter(project_id=pk).filter(is_owner=True).first()
        )
        if request.user == project_owner.user_id:
            Project.objects.filter(pk=pk).delete()
            ProjectOwnership.objects.filter(project_id=pk).delete()
            Comments.objects.filter(project_id=pk).delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class CommentsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk, format=None):
        comments = Comments.objects.filter(project_id=pk).order_by("added").select_related("user_id")
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request, pk=None, format=None):
        user_request = User.objects.filter(email=request.user).first()
        user_data = User.objects.filter(pk=request.data['user_id']).first()
        if user_request == user_data:
            serializer = CommentsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            User.objects.filter(email=request.user)
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request, format=None):
        user = User.objects.filter(email=request.user).first()
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OwnershipView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProjectOwnershipSerializer
    queryset = ProjectOwnership.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user_id", "project_id"]


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


class UserCreateAPIView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(["GET"])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)
