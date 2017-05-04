from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from ldap_controller import LdapController

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

    ld = LdapController()
    user = ld.auth(username, password)
    user = serializeUser(user)
    # Correct credentials
    return Response({'message': 'authenticated correctly',
                     'user': user },status=status.HTTP_200_OK)


def serializeUser(user):
    ser_user = {}
    ser_user['name'] = " ".join(user[1]['cn'])
    ser_user['username'] = " ".join(user[1]['uid'])
    return ser_user
