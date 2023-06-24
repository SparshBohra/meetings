from django.db import models

# Create your models here.
class Meeting(models.Model):
    meeting_id = models.AutoField(primary_key=True)
    meeting_title = models.CharField(max_length=100)
    meeting_time = models.DateTimeField()
    meeting_organizer = models.CharField(max_length=100)
    meeting_type = models.CharField(max_length=100)
    meeting_channel = models.CharField(max_length=100)
    participants_list = models.CharField(max_length=500)

    class Meta:
        db_table = 'meetings' 

class Transcript(models.Model):
    transcript_id = models.AutoField(primary_key=True)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    raw_transcript = models.TextField()

    class Meta:
        db_table = 'transcripts'