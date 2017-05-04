"""
This file includes all the custom made exceptions. These exceptions are thrown by the API and
used to override the structure of the response messages.
"""

from rest_framework import status
from rest_framework.exceptions import APIException


class CustomAuthenticationFailed(APIException):
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Unauthorized. Request failed because of invalid credentials."

class CustomRequestFailed(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Bad request."

class CustomServerFailed(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "Server error.Try again later."
