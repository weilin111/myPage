from django.http import HttpResponse

from myDB.models import cool_knowledge
 

import random
# 数据库操作
def fun_fact(request):
    # 初始化
    response = ""
    response1 = ""
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list1 = cool_knowledge.objects.all()
        
    # # filter相当于SQL中的WHERE，可设置条件过滤结果
    # response2 = cool_knowledge.objects.filter(id=1) 
    
    # # 获取单个对象
    # response3 = cool_knowledge.objects.get(id=1) 
    
    # # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    # cool_knowledge.objects.order_by('piece_of_cool')[0:2]
    
    # #数据排序
    # cool_knowledge.objects.order_by("id")
    
    # # 上面的方法可以连锁使用
    # cool_knowledge.objects.filter(name="db.sqlite3").order_by("id")
    
    # 输出所有数据

    # for var in list1:
    #     response1 += var.piece_of_cool + " "

    response = list1[random.randint(0,len(list1)-1)].piece_of_cool
    return HttpResponse("<p>" + response + "</p>")

