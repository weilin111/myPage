from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
 
def hello(request):
    return HttpResponse("Hello world ! ")


def sirius(request):
    return render(request,"w1.html")


def test_3js(request):
    return render(request,"w2.html")


def post_space(request):

    return render(request,"post_space.html")

def post_space_data(request):

    s='天青色等烟雨'
    def read():
        with open("/home/ubuntu/pluto/myPage/myScript/mysite/mysite/repo/post_space_data.txt","r",encoding="utf-8") as f:
            s=f.read()
        return s
    def write(s):
        with open("/home/ubuntu/pluto/myPage/myScript/mysite/mysite/repo/post_space_data.txt","w+",encoding="utf-8") as f:
            s=f.write(s)

    if request.method=="POST":
        write(request.POST["text"])
        return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})

    return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})