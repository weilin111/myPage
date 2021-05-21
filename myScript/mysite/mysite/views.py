from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
import json
 
def hello(request):
    return HttpResponse("Hello world ! ")


def sirius(request):
    return render(request,"w1.html")

def server_status(request):

    return render(request,"server_status.html")



def test_3js(request):
    return render(request,"w2.html")


def post_space(request):

    return render(request,"post_space.html")

def post_space_data(request):

    def read():
        with open("/home/ubuntu/pluto/myPage/myScript/mysite/mysite/repo/post_space_data.txt","r",encoding="utf-8") as f:
            s=f.read()
        return s
    def write(s):
        with open("/home/ubuntu/pluto/myPage/myScript/mysite/mysite/repo/post_space_data.txt","w+",encoding="utf-8") as f:
            s=f.write(s)

    if request.method=="POST":
        # print(dir(request.POST)  )
        # print("======================")
        # print(request.POST  )
        # print(request.body  )

        # print("======================")
        if request.POST:
            write(request.POST["text"])
        else:
            json_str=request.body
            json_dict=json.loads(json_str)
            text=json_dict.get("text",None)
            write(text)
        return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})

    return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})










