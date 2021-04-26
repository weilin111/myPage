from django.http import HttpResponse
from django.shortcuts import render
 
def hello(request):
    return HttpResponse("Hello world ! ")


def sirius(request):
    return render(request,"w1.html")


def test_3js(request):
    return render(request,"w2.html")