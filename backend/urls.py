from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from project_management_system import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectView, 'project')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
