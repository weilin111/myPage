from django.http import HttpResponse
from django.http import JsonResponse


from myDB.models import cool_knowledge
from myDB.models import visited_number
import time
import random
import json
import os
# 数据库操作

def fun_fact(request):
    # 初始化
    response = ""
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list1 = cool_knowledge.objects.all()
    response = list1[random.randint(0,len(list1)-1)].piece_of_cool
#----------------------------
    list_t=visited_number.objects.all()
    t=str(time.ctime())
    
    index=int(len(list_t))-1
    if index<0:
        c=0
    else:
        c=list_t[index].total_visited_count
    visited_number1=visited_number(visit_time=t,total_visited_count=c+1)
    visited_number1.save()



    list_t=visited_number.objects.all()

#----------------------------
    print("fun_fact: "+request.method+" from "+str(request.META["REMOTE_ADDR"]) +"  "+ t)

    if(request.method=="GET"):
        return JsonResponse({"fun_fact":response,"time":t,"total_count":c+1},json_dumps_params={'ensure_ascii':False})
        # return 
    return HttpResponse("<p>" + response + "</p>")

def get_random_pic(request):
    with open("/home/ubuntu/pluto/myPage/myScript/mysite/cache/pic.json","r",encoding="utf-8") as f:
        b=json.load(f)
    name=b[random.randint(0,len(b)-1)]
    image_data=open(name,"rb").read()


    t=str(time.ctime())
    print("pic: "+request.method+" from "+str(request.META["REMOTE_ADDR"]) +"  "+ t)

    return HttpResponse(image_data,content_type="image/png")


def get_paper_item(request):

    base=r"/home/ubuntu/weilin/1_Playground/"
    file_name_list=os.listdir(base)
    json_list=[]
    for i in file_name_list:
        if "." not in i :
            for j in os.listdir(base+i):
                json_list.append(base+i+"/"+j)
    with open(json_list[random.randint(0,len(json_list)-1)],"r",encoding="utf-8") as f:
        s=json.load(f)

    return JsonResponse(s[random.randint(0,len(s)-1)],safe=False,json_dumps_params={'ensure_ascii':False})


def get_cpu_memory_percent_data(request):

    # 100条 时间
    l=[]
    with open("/home/ubuntu/pluto/myPage/myScript/mysite/server_status.txt","r") as f:
        s=f.readline()
        while(s):
            l.append(s.replace("\n","").split(" "))
            s=f.readline()
        # l.reverse()
    return JsonResponse(l,safe=False,json_dumps_params={'ensure_ascii':False})



        


