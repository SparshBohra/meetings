# Use an official Python runtime as the base image
FROM python:3.11.3

# Set the working directory in the container
WORKDIR /ultimeet

# Copy the Python script into the container
COPY ultimeet_backend .

# Specify the command to run the Python script
CMD ["python3", "python3 manage.py runserver"]
