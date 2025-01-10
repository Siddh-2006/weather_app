from django.shortcuts import render
from django.http import JsonResponse
from . import data_featcher
# Create your views here.
def home(request):
    return render(request,"index.html")
def return_data_city(request):
    if request.method=="POST":
        location=request.POST["location"]
        if location:
            data=data_featcher.fetch_current(location)
            if 'error' in data:
                return JsonResponse({"error":data["error"]},status=400)
            else:
                return JsonResponse(data,status=200)
        else:
            return JsonResponse({"error":"no city provided"},status=400)
    else :
        return JsonResponse({"error":"forbidden"},status=402)