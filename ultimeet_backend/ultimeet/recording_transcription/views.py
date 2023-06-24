from user_authentication.models import User, Session
from recording_transcription.models import Meeting, Transcript
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def create_meeting(request):
    if request.method == 'POST':
        # Retrieve the JSON data from the request body
        data = json.loads(request.body)

        # Retrieve the data from the JSON object
        meeting_title = data.get('meeting_title')
        meeting_time = data.get('meeting_time')
        meeting_organizer = data.get('meeting_organizer')
        meeting_type = data.get('meeting_type')
        meeting_channel = data.get('meeting_channel')
        participants_list = data.get('participants_list')

        # Create a new Meeting object with the retrieved data
        meeting = Meeting(
            meeting_title=meeting_title,
            meeting_time=meeting_time,
            meeting_organizer=meeting_organizer,
            meeting_type=meeting_type,
            meeting_channel=meeting_channel,
            participants_list=participants_list
        )

        # Save the meeting object
        meeting.save()

        # Return a JSON response indicating success
        return JsonResponse({'message': 'Meeting created successfully.'}, status=201)

@csrf_exempt
def create_transcript(request, meeting_id):
    if request.method == 'POST':
        # Retrieve the JSON data from the request body
        data = json.loads(request.body)

        # Retrieve the data from the JSON object
        raw_transcript = data.get('raw_transcript')

        try:
            # Retrieve the meeting based on the provided meeting_id
            meeting = Meeting.objects.get(pk=meeting_id)

            # Create a new Transcript object with the retrieved data
            transcript = Transcript(
                meeting=meeting,
                raw_transcript=raw_transcript
            )

            # Save the transcript object
            transcript.save()

            # Return a JSON response indicating success
            return JsonResponse({'message': 'Transcript created successfully.'}, status=201)
        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)

