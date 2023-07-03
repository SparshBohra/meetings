from user_authentication.models import User, Session
from recording_transcription.models import Meeting, Transcript
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from datetime import datetime
from .transcript import process_transcription
from django.core.exceptions import ObjectDoesNotExist
from .models import Meeting, Participant, Absents, Action_Item_Approved_By,Transcript
import sounddevice as sd
import wave
import datetime
import speech_recognition as sr
from django.http import HttpResponse
import numpy as np
import threading
import requests
import pyaudio

@csrf_exempt
def get_meeting(request, meeting_id):
    if request.method == 'GET':
        try:
            # Retrieve the meeting object using the meeting_id
            meeting = Meeting.objects.get(pk=meeting_id)
            participants = Participant.objects.filter(meeting__pk=meeting_id)
            absents = Absents.objects.filter(meeting__pk=meeting_id)
            participants = meeting.participants_list.all()
            absents = meeting.absents_list.all()
            action_item_approved_bys = Action_Item_Approved_By.objects.filter(meeting__pk=meeting_id)
            action_item_approved_bys = meeting.action_item_approved_by_list.all()
            # Create a list to store participant data
            participants_list = []
            absents_list = []
            action_item_approved_by_list = []
            get_participants = get_participant_list(request,meeting_id)
            get_absents = get_absent_list(request,meeting_id)
            get_action_item_approved_by = get_action_item_approved_by_list(request,meeting_id)
            print("get_participants",get_participants)  # Print participant name
            participants_list.append(get_participants)
            print("get_absents@@",get_absents)  # Print participant name
            absents_list.append(get_absents)
            action_item_approved_by_list.append(get_action_item_approved_by)
            
            # Retrieve the participants list for the meeting
                #participants = meeting.participants_list.all()
            for participant in participants:
                participant_data = {
                    'name': participant.name,
                    'email': participant.email,
                    'profile_picture': participant.profile_picture,
                }
                participants_list.append(get_participants)
                print("get_participants@@",get_participants)  # Print participant name
                response_data.append(participants_list)

            for absent in absents:
                participant_data = {
                    'name': absent.name,
                    'email': absent.email,
                    'profile_picture': absent.profile_picture,
                }
                absents_list.append(get_participants)
                print("get_participants@@",get_participants)  # Print participant name
                response_data.append(participants_list)

            for action_item_approved_by in action_item_approved_bys:
                action_item_approved_by_data = {
                    'name': action_item_approved_by.name,
                    'email': action_item_approved_by.email,
                    'profile_picture': action_item_approved_by.profile_picture,
                }
                action_item_approved_by_list.append(get_participants)
                print("get_participants@@",get_participants)  # Print participant name
                response_data.append(action_item_approved_by_list)

            # Convert the meeting object to a JSON response
            response_data = {
                'meeting_id': meeting.meeting_id,
                'meeting_title': meeting.meeting_title,
                'meeting_from': meeting.meeting_from.strftime('%Y-%m-%d %H:%M:%S'),
                'meeting_to': meeting.meeting_to.strftime('%Y-%m-%d %H:%M:%S'),
                'meeting_organizer': {
                    'email': meeting.meeting_organizer_email,
                    'username': meeting.meeting_organizer_username,
                },
                'meeting_type': meeting.meeting_type,
                'meeting_channel': meeting.meeting_channel,
                'meeting_nature': meeting.meeting_nature,
                'participants_list': participants_list,
                'action_item_approved_by_list': action_item_approved_by_list,
                'absents_list': absents_list,
                'meeting_description': meeting.meeting_description,
                'meeting_location': meeting.meeting_location,
                'meeting_action_items_count': meeting.meeting_action_items_count,
               
            }

            
                
            return JsonResponse(response_data, status=200)
        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)

@csrf_exempt
def get_participant_list(request, meeting_id):
    if request.method == 'GET':
        try:
            # Retrieve the participants list for the meeting using the meeting_id
            participants = Participant.objects.filter(meeting__pk=meeting_id)
            absents = Absents.objects.filter(meeting__pk=meeting_id)

            

            # Create a list to store participant data
            participants_list = []

            # Iterate over the participants and retrieve their information
            for participant in participants:
                participant_data = {
                    'name': participant.name,
                    'email': participant.email,
                    'profile_picture': participant.profile_picture,
                }
                participants_list.append(participant_data)

            # Return the participant list as a JSON response
            return participants_list
        except Participant.DoesNotExist:
            return 'Participants not found for the meeting.'

@csrf_exempt
def get_action_item_approved_by_list(request, meeting_id):
    if request.method == 'GET':
        try:
            # Retrieve the participants list for the meeting using the meeting_id
            action_item_approved_bys = Action_Item_Approved_By.objects.filter(meeting__pk=meeting_id)

            absents = Action_Item_Approved_By.objects.filter(meeting__pk=meeting_id)

            

            # Create a list to store participant data
            action_item_approved_by_list = []

            # Iterate over the participants and retrieve their information
            for action_item_approved_by in action_item_approved_bys:
                action_item_approved_by_data = {
                    'name': action_item_approved_by.name,
                    'email': action_item_approved_by.email,
                    'profile_picture': action_item_approved_by.profile_picture,
                }
                action_item_approved_by_list.append(action_item_approved_by_data)

            # Return the participant list as a JSON response
            return action_item_approved_by_list
        except Participant.DoesNotExist:
            return 'action_item_approved_by not found for the meeting.'

@csrf_exempt
def get_absent_list(request, meeting_id):
    if request.method == 'GET':
        try:
            # Retrieve the participants list for the meeting using the meeting_id
            absents = Absents.objects.filter(meeting__pk=meeting_id)

            

            # Create a list to store participant data
            absents_list = []

            # Iterate over the participants and retrieve their information
            for absent in absents:
                absents_data = {
                    'name': absent.name,
                    'email': absent.email,
                    'profile_picture': absent.profile_picture,
                }
                absents_list.append(absents_data)

            # Return the participant list as a JSON response
            return absents_list
        except Absents.DoesNotExist:
            return 'Participants not found for the meeting.'

@csrf_exempt
def create_meeting(request):
    if request.method == 'POST':
        # Retrieve the JSON data from the request body
        data = json.loads(request.body)

        # Retrieve the data from the JSON object
        meeting_title = data.get('meeting_title')
        meeting_from = data.get('meeting_from')
        meeting_to = data.get('meeting_to')
        meeting_organizer = data.get('meeting_organizer')
        meeting_type = data.get('meeting_type')
        meeting_channel = data.get('meeting_channel')
        participants_list = data.get('participants_list')
        meeting_nature = data.get('meeting_nature')
        profile_picture = data.get('profile_picture')

        # Assuming meeting_organizer is an object with properties like 'id', 'email', 'username'
        # organizer_id = meeting_organizer.get('id')
        organizer_email = meeting_organizer.get('email')
        organizer_username = meeting_organizer.get('username')

        # Convert meeting_from and meeting_to to datetime objects
        from_date = datetime.strptime(meeting_from, '%Y-%m-%d %H:%M:%S')
        to_date = datetime.strptime(meeting_to, '%Y-%m-%d %H:%M:%S')

        # Create a Picture object for the profile picture
        # picture = Picture(profile_picture=profile_picture)
        # picture.save()

        # Create a new Meeting object with the retrieved data
        meeting = Meeting(
            meeting_title=meeting_title,
            meeting_from=from_date,
            meeting_to=to_date,
            # meeting_organizer_id=organizer_id,
            meeting_organizer_email=organizer_email,
            meeting_organizer_username=organizer_username,
            meeting_type=meeting_type,
            meeting_channel=meeting_channel,
            meeting_nature=meeting_nature
            # profile_picture=picture
        )

        # Save the meeting object
        meeting.save()

        # Process the participants list if it is not None
        if participants_list is not None:
            participants = []
            for participant_data in participants_list:
                participant_name = participant_data.get('name')
                participant_username = participant_data.get('username')
                participant_email = participant_data.get('email')
                participant = Participant(
                    name=participant_name,
                    username=participant_username,
                    email=participant_email
                )
                participant.save()
                participants.append({
                    'meeting_id':meeting.meeting_id,
                    'name': participant_name,
                    'username': participant_username,
                    'email': participant_email
                })

            # Add the participants list to the meeting
            
            meeting.participants_list.set(participants)
            print(participants)
        # Return a JSON response indicating success
        print(meeting.meeting_id)
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
            final_transcript = process_transcription()
            print(final_transcript)
            # Create a new Transcript object with the retrieved data
            transcript = Transcripts(
                meeting=meeting,
                raw_transcript=final_transcript
            )

            # Save the transcript object
            transcript.save()

            # Return a JSON response indicating success
            return JsonResponse({'message': 'Transcript created successfully.'}, status=201)
        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found.'}, status=404)


@csrf_exempt
def transcription_view(request,meeting_id):
    if request.method == 'POST':
        final_transcript = process_transcription()
        final_transcript = json.loads(final_transcript)
        return JsonResponse(final_transcript, safe=False)

    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def get_transcription(request, meeting_id):
    if request.method == 'GET':
        try:
            transcript = Transcript.objects.get(meeting_id=meeting_id)
            raw_transcript = json.loads(transcript.raw_transcript)
            return JsonResponse(raw_transcript, safe=False)
        except Transcript.DoesNotExist:
            return JsonResponse({'error': 'Meeting does not exist.'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

stop_recording_flag = False
recording_thread = None
server_url = "http://127.0.0.1:8000"  # Replace with your server URL


@csrf_exempt
def start_recording():
    if request.method == 'POST':
       # Set the audio parameters
        sample_rate = 44100  # Sample rate in Hz
        duration = 5  # Duration of the recording in seconds

        # Record audio
        print("Recording audio...")
        recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1)
        sd.wait()  # Wait until the recording is finished

        # Save the recording as a .wav file
        output_file = "audio_recording.wav"
        wav.write(output_file, sample_rate, recording)

        return "Audio saved as " + output_file


@csrf_exempt
def stop_recording(request):
    if request.method == 'GET':
        # Set the flag to stop recording
        global stop_recording_flag
        stop_recording_flag = True

        # Wait for the recording thread to complete
        global recording_thread
        recording_thread.join()

        return HttpResponse('Recording stopped.')
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)


def record_audio(fs, seconds, meeting_name):
    global stop_recording_flag

    # Start recording audio
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1)

    # Wait for the stop recording command or timeout
    timeout = seconds
    while timeout > 0 and not stop_recording_flag:
        timeout -= 1

    # Stop recording
    sd.stop()

    # Save the recording data as a .wav file
    file_name = f"meeting_{meeting_name}_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.wav"
    save_recording(recording, file_name)


def save_recording(recording, filename):
    # Set up audio parameters
    fs = 44100  # Sample rate

    # Create a .wav file with the specified filename
    wave_file = wave.open(filename, 'wb')
    wave_file.setnchannels(1)
    wave_file.setsampwidth(2)  # Sample width in bytes (16-bit audio)
    wave_file.setframerate(fs)

    # Convert the recording data to bytes
    audio_bytes = recording.astype(np.int16).tobytes()

    # Write the frames to the wave file
    wave_file.writeframes(audio_bytes)
    wave_file.close()


recording = False  # Flag to keep track of recording state
output_file = "output.wav"

@csrf_exempt
def record_audios(request):
    global recording

    if request.method == 'GET':
        if recording:
            return HttpResponse("Already recording...")

        print('API called')

        CHUNK = 1024
        FORMAT = pyaudio.paInt16
        CHANNELS = 1
        RATE = 44100
        RECORD_SECONDS = 10  # Adjust the duration as per your requirements

        p = pyaudio.PyAudio()

        stream = p.open(
            format=FORMAT,
            channels=CHANNELS,
            rate=RATE,
            input=True,
            frames_per_buffer=CHUNK
        )

        frames = []

        for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
            if not recording:
                break
            data = stream.read(CHUNK)
            frames.append(data)

        stream.stop_stream()
        stream.close()
        p.terminate()

        if frames:
            wf = wave.open(output_file, 'wb')
            wf.setnchannels(CHANNELS)
            wf.setsampwidth(p.get_sample_size(FORMAT))
            wf.setframerate(RATE)
            wf.writeframes(b''.join(frames))
            wf.close()

        recording = False

        return HttpResponse("Audio recorded successfully.")

def listen_for_commands():
    global recording

    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("Listening for commands...")

        while True:
            try:
                audio = r.listen(source)
                command = r.recognize_google(audio)
                print(f"Command: {command}")

                if command.lower() == "start":
                    if not recording:
                        recording = True
                        print("Recording started.")
                    else:
                        print("Already recording...")

                elif command.lower() == "stop":
                    if recording:
                        recording = False
                        print("Recording stopped.")
                    else:
                        print("Not currently recording.")

            except sr.UnknownValueError:
                print("Could not understand the audio")
            except sr.RequestError as e:
                print(f"Error: {e}")

# Create a thread to handle continuous listening
listening_thread = threading.Thread(target=listen_for_commands)
listening_thread.start()








