"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings

from . import views,testdb

urlpatterns = [
    path('admin/', admin.site.urls),
    path('page/',views.hello),
    path(r"sirius/",views.sirius),
    path(r"",views.sirius),
    path(r"1/",testdb.fun_fact),
    path(r"2/",testdb.get_random_pic),
    path(r"3/",views.test_3js),
    path(r"4/",views.post_space),
    path(r"post_data/",views.post_space_data),
    path(r"paper_item",testdb.get_paper_item),



] 
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)