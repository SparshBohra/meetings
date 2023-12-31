# Generated by Django 4.2.2 on 2023-07-03 14:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting_summary', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agenda',
            old_name='meeting',
            new_name='meeting_id',
        ),
        migrations.RenameField(
            model_name='agenda',
            old_name='transcript',
            new_name='transcript_id',
        ),
        migrations.RenameField(
            model_name='keypoint',
            old_name='meeting',
            new_name='meeting_id',
        ),
        migrations.RenameField(
            model_name='keypoint',
            old_name='transcript',
            new_name='transcript_id',
        ),
        migrations.RenameField(
            model_name='summary',
            old_name='meeting',
            new_name='meeting_id',
        ),
        migrations.RenameField(
            model_name='summary',
            old_name='transcript',
            new_name='transcript_id',
        ),
    ]
