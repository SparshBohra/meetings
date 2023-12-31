# Generated by Django 4.2.2 on 2023-07-01 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recording_transcription', '0003_meeting_meeting_natures_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='meeting_natures',
            new_name='meeting_nature',
        ),
        migrations.AddField(
            model_name='meeting',
            name='meeting_from',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='meeting',
            name='meeting_to',
            field=models.DateTimeField(null=True),
        ),
        migrations.RemoveField(
            model_name='meeting',
            name='participants_list',
        ),
        migrations.AddField(
            model_name='meeting',
            name='participants_list',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
