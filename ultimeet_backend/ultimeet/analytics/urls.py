from django.urls import path
from meeting_summary import views

urlpatterns = [
   path('meeting/<int:meeting_id>/engagement/', views.engagement, name='engagement'),
]

