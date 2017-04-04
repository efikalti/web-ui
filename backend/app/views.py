from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin'

# TEST DATA
user = {'username':'efi', 'password': 'efi_password'}

@api_view(['POST'])
def authenticate(request):
    # Check for request data,password and username
    print request.data
    if len(request.data) == 0:
        return Response({'error':'Username and password not provided'}, status=status.HTTP_400_BAD_REQUEST)
    if not 'username' in request.data or not 'password' in request.data:
        return Response({'error':'Username and password not provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Get username and password
    username = request.data['username']
    password = request.data['password']

    # Authenticate user

    # User authenticated
    if username == user['username'] and password == user['password']:
        return Response({'message': 'authenticated correctly',
                         'user': {'username': username}},
                         status=status.HTTP_200_OK,
                         headers={ACCESS_CONTROL_ALLOW_ORIGIN: 'http://localhost:8000'})

    # User not authenticated
    return Response({'error': 'wrong credentials'}, status=status.HTTP_401_UNAUTHORIZED)
