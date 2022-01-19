from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from project_management_system import views

router = routers.DefaultRouter()
#router.register(r'projects', views.ProjectView, 'project')
router.register(r'comments', views.CommentsView, 'comment')
router.register(r'userlist', views.UserView, 'userlist')
router.register(r'ownership', views.OwnershipView, 'ownership')
router.register(r'register', views.UserCreateAPIView, 'register')
router.register(r'update', views.UserUpdateAPIView, 'update')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/pms/', include('project_management_system.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
