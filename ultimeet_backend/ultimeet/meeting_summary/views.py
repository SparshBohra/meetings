# importing libraries, functions and models
import requests
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from user_authentication.models import User, Session
from recording_transcription.models import Meeting
from .key_points import get_key_points
from .key_points import get_audio_labels
from .users_audio_breakpoints import get_users_audio_breakpoints
from .agenda import meeting_agenda
from .summary_view import summary_text

@csrf_exempt
def summary_view(request, meeting_id):
    if request.method == 'GET':
        try:
            summary = summary_text(meeting_id)
            return JsonResponse({'Summary': summary})

        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def agenda(request, meeting_id):
    if request.method == 'GET':
        try:
            agenda = meeting_agenda(meeting_id)
            return JsonResponse({'Agenda': agenda})

        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def key_points(request, meeting_id):
    if request.method == 'GET':
        try:
            points = get_key_points(meeting_id)  
            return JsonResponse({'Key-Points': points})

        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def audio_labels(request, meeting_id):
    if request.method == 'GET':
        try:
            labels = get_audio_labels(meeting_id)  
            return JsonResponse({'Audio-Labels': labels})

        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def users_audio_breakpoints(request, meeting_id):
    if request.method == 'GET':
        try:
            breakpoints = get_users_audio_breakpoints(meeting_id)  
            return JsonResponse({'Audio-Breakpoints': breakpoints})

        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

