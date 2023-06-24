
#from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('user_authentication/', include('user_authentication.urls')),
    path('recording_transcription/', include('recording_transcription.urls')),
    path('meeting_summary/', include('meeting_summary.urls')),
    path('meeting_action_tasks/', include('meeting_action_tasks.urls')),

]


