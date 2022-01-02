from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.views.generic import TemplateView
from project_management_system import views

router = routers.DefaultRouter()
router.register(r'projects', views.ProjectView, 'project')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
