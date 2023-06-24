# Generated by Django 4.2.2 on 2023-06-24 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('meeting_id', models.AutoField(primary_key=True, serialize=False)),
                ('meeting_title', models.CharField(max_length=100)),
                ('meeting_time', models.DateTimeField()),
                ('meeting_organizer', models.CharField(max_length=100)),
                ('meeting_type', models.CharField(max_length=100)),
                ('meeting_channel', models.CharField(max_length=100)),
                ('participants_list', models.CharField(max_length=500)),
            ],
            options={
                'db_table': 'meetings',
            },
        ),
    ]