import requests
import json
import time
# use the Python textwrap library to split the text into chunks of `max_prompt_tokens` length
import textwrap
import openai

# django imports
from django.http import HttpResponse
#from .recording_transcription.transcript import process_transcription

from user_authentication.models import User, Session
from recording_transcription.models import Meeting, Transcript
from django.shortcuts import get_object_or_404

def get_transcript_raw(meeting_id):
    transcript = get_object_or_404(Transcript, meeting_id=meeting_id)
    transcript_raw = transcript.raw_transcript
    return transcript_raw

# maximum tokens allowed for GPT-3
max_tokens = 4096  
# keep a buffer for response tokens. Let's assume 100 tokens for the completion
buffer_tokens = 100  
# calculate the maximum tokens we can use for the prompt
max_prompt_tokens = max_tokens - buffer_tokens

#process_transcription = ""
def get_users_audio_breakpoints():
    return {
        'users_audio_breakpoints': [
            {
                "name": "Nick",
                "avatar": "https://photos.com",
                "username": "nnick231",
                "audio_breakpoints": {
                    'start': [
                        23400,
                        23800,
                        45000
                    ],
                    'end': [
                        23400,
                        23800,
                        45000
                    ]
                },
                "talk_time": 11
            },
            {
                "name": "Sam",
                "avatar": "https://photos.com",
                "username": "sam12341",
                "audio_breakpoints": {
                    'start': [
                        23400,
                        23800,
                        45000
                    ],
                    'end': [
                        23400,
                        23800,
                        45000
                    ]
                },
                "talk_time": 38
            },
            {
                "name": "Seema",
                "avatar": "https://photos.com",
                "username": "seema2314",
                "audio_breakpoints": {
                    'start': [
                        23400,
                        23800,
                        45000
                    ],
                    'end': [
                        23400,
                        23800,
                        45000
                    ]
                },
                "talk_time": 47
            },
            {
                "name": "Mukesh",
                "avatar": "https://photos.com",
                "username": "mukesh413",
                "audio_breakpoints": {
                    'start': [
                        23400,
                        23800,
                        45000
                    ],
                    'end': [
                        23400,
                        23800,
                        45000
                    ]
                },
                "talk_time": 4
            }
        ]
    }
