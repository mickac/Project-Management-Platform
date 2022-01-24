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
            if request.data["start_date"] > request.data["end_date"]:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            project = {
                "title": request.data["title"],
                "details": request.data["details"],
                "start_date": request.data["start_date"],
                "end_date": request.data["end_date"],
            }
            print(request.user.id)
            serializer = ProjectSerializer(data=project)
            if serializer.is_valid():
                serializer.save()
                project_id = serializer.data["id"]
                owner = {
                    "project_id": project_id,
                    "user_id": request.user.id,
                    "is_owner": True,
                }
                owner_serializer = ProjectOwnershipSerializer(data=owner)
                if owner_serializer.is_valid():
                    owner_serializer.save()
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
                del request.data["title"]
                del request.data["details"]
                del request.data["start_date"]
                del request.data["end_date"]
                for i in request.data:
                    member = {
                        "project_id": project_id,
                        "user_id": request.data[i]["value"],
                        "is_owner": False,
                    }
                    member_serializer = ProjectOwnershipSerializer(data=member)
                    if member_serializer.is_valid():
                        member_serializer.save()
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
        comments = (
            Comments.objects.filter(project_id=pk)
            .order_by("added")
            .select_related("user_id")
        )
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request, pk=None, format=None):
        try:
            user_request = User.objects.filter(email=request.user).first()
            user_data = User.objects.filter(pk=request.data["user_id"]).first()
            project_member = (
                ProjectOwnership.objects.filter(project_id=request.data["project_id"])
                .filter(user_id=request.user)
                .first()
            )
            print(project_member)
            project_member_validation = (
                ProjectOwnership.objects.filter(project_id=request.data["project_id"])
                .filter(user_id=request.data["user_id"])
                .first()
            )
            if project_member == None or project_member_validation == None:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            if (
                user_request == user_data
                and project_member == project_member_validation
            ):
                serializer = CommentsSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
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
    http_method_names = ["get"]


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
