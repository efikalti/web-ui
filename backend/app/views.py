from django.http import HttpResponse


def authenticate(request):
    return HttpResponse("Hello, world.")
