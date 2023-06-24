from django.urls import path
from recording_transcription import views

urlpatterns = [
   path('create_meeting/', views.create_meeting, name='create_meeting'),
   path('meeting/<int:meeting_id>/create_transcript/', views.create_transcript, name='create_transcript'),
]
