from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin'

# TEST DATA
users = [{'username':'efi', 'password': 'efi_password', 'name': 'Efi', 'surname': 'Kaltirimidou'},
        {'username':'efi2', 'password': 'efi_password', 'name': 'Effrosyni', 'surname': 'Kaltirimidou', 'notifications': ['Problem with job 123', 'Job 456 finished']}
        ,]

@api_view(['POST'])
def authenticate(request):
    # Check for request data,password and username
    if len(request.data) == 0:
        return Response({'error':'Username and password not provided'}, status=status.HTTP_400_BAD_REQUEST)
    if not 'username' in request.data or not 'password' in request.data:
        return Response({'error':'Username and password not provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Get username and password
    username = request.data['username']
    password = request.data['password']

    # Authenticate user

    # User authenticated
    for user in users:
        print user
        if username == user['username']:
            if password == user['password']:
                ser_user = serializeUser(user)
                return Response({'message': 'authenticated correctly',
                                 'user': ser_user },
                                 status=status.HTTP_200_OK)

    # User not authenticated
    return Response({'error': 'wrong credentials'}, status=status.HTTP_401_UNAUTHORIZED)


def serializeUser(user):
    ser_user = {}
    ser_user['name'] = user['name']
    ser_user['surname'] = user['surname']
    ser_user['username'] = user['username']
    if 'notifications' in user:
        ser_user['notifications'] = user['notifications']
    return ser_user
