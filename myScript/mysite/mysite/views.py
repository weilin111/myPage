from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
import json
import os
 
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
            json_dict=json.loads(json_str,strict=False)
            text=json_dict.get("text",None)
            write(text)
        return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})

    return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})


def post_space_data_string(request):

    def read():
        with open("/home/ubuntu/pluto/myPage/myScript/mysite/mysite/repo/post_space_data.txt","r",encoding="utf-8") as f:
            s=f.read()
        return s
    def write(s):
        with open("/home/ubuntu/pluto/myPage/myScript/mysite/mysite/repo/post_space_data.txt","w+",encoding="utf-8") as f:
            s=f.write(s)

       

        if request.POST:
            # print("======================")
            # print(request.POST  )
            # print(request.body  )
            # print("======================")
        
            write(request.POST["text"])
        else:
            json_str=request.body
            json_dict=json.loads(json_str,strict=False)
            text=json_dict.get("text",None)
            write(text)
        return JsonResponse({"text":read()},json_dumps_params={'ensure_ascii':False})

    return HttpResponse( read()  )

def get_local_json_dir_and_file(request):
    main_dir="/home/ubuntu/weilin/1_Playground"
    file_list=os.listdir(main_dir)

    def get_json_file_list(dir):
        l=os.listdir(dir)
        l2=[]
        for i in l:
            if ".json" in i:
                l2.append(i)
        return l2

    def get_folder_list(dir):
        l=os.listdir(dir)
        l2=[]
        for i in l:
            if  "." not in i:
                l2.append(i)
        return l2

    if request.method=="POST":
        print(dir(request.POST)  )
        print("======================")
        print(request.POST  )
        print(request.body  )

        if request.POST:
            print("post is not empty")
        else:
            print("BODY is NOT empty")
            json_str=request.body
            path_list=json.loads(json_str,strict=False)
            text=main_dir
            for i in path_list:
                text+="/"+i
            print(text)

            if ".json" in text:
                pass
                with open(text,"r",encoding="utf-8") as f:
                    l=json.load(f)
                return JsonResponse(l,safe=False,json_dumps_params={'ensure_ascii':False})


            print(get_folder_list(text))
            print(get_json_file_list(text))

            l=get_folder_list(text)+get_json_file_list(text)

            print(l)

        return JsonResponse(l,safe=False,json_dumps_params={'ensure_ascii':False})
        
    else:
        return JsonResponse({"text":""},json_dumps_params={'ensure_ascii':False})
        
    





