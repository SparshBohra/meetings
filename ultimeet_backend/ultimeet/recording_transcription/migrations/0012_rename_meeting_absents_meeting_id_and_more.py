# Generated by Django 4.2.2 on 2023-07-03 14:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recording_transcription', '0011_rename_meeting_participant_meeting_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='absents',
            old_name='meeting',
            new_name='meeting_id',
        ),
        migrations.RenameField(
            model_name='action_item_approved_by',
            old_name='meeting',
            new_name='meeting_id',
        ),
    ]