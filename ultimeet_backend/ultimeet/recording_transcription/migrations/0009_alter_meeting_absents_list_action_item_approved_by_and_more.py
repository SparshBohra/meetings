# Generated by Django 4.2.2 on 2023-07-01 14:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recording_transcription', '0008_meeting_meeting_action_items_count_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='absents_list',
            field=models.ManyToManyField(related_name='meetings_absents', to='recording_transcription.absents'),
        ),
        migrations.CreateModel(
            name='Action_Item_Approved_By',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('profile_picture', models.URLField()),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recording_transcription.meeting')),
            ],
            options={
                'db_table': 'Action_Item_Approved_By',
            },
        ),
        migrations.AddField(
            model_name='meeting',
            name='action_item_approved_by_list',
            field=models.ManyToManyField(related_name='meetings_approved_by', to='recording_transcription.action_item_approved_by'),
        ),
    ]