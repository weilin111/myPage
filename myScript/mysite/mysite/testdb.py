from django.http import HttpResponse
 
from nuclear_data.models import Test,Test2
 
import random
# 数据库操作
def testdb(request):
    test1 = Test(name=str(random.random() ))
    test1.save()
    return HttpResponse("<p>数据添加成功！</p>")

def testdb2(request):
    test2 = Test2(name="sirius",value=random.random())
    test2.save()
    return HttpResponse("<p>数据添加成功！</p>")



def testdb_out(request):

    # 初始化
    response = ""
    response1 = ""
    
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Test.objects.all()
        
    # filter相当于SQL中的WHERE，可设置条件过滤结果
    response2 = Test.objects.filter(id=1) 
    
    # 获取单个对象
    response3 = Test.objects.get(id=1) 
    
    # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    Test.objects.order_by('name')[0:2]
    
    #数据排序
    Test.objects.order_by("id")
    
    # 上面的方法可以连锁使用
    Test.objects.filter(name="db.sqlite3").order_by("id")
    
    # 输出所有数据
    for var in list:
        response1 += var.name + " "
    response = response1
    return HttpResponse("<p>" + response + "</p>")



def testdb_out2(request):

    # 初始化
    response = ""
    response1 = ""
    
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Test2.objects.all()
        
    # filter相当于SQL中的WHERE，可设置条件过滤结果
    response2 = Test2.objects.filter(id=1) 
    
    # 获取单个对象
    response3 = Test2.objects.get(id=1) 
    
    # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    Test2.objects.order_by('name')[0:2]
    
    #数据排序
    Test2.objects.order_by("id")
    
    # 上面的方法可以连锁使用
    Test2.objects.filter(name="db.sqlite3").order_by("id")
    
    # 输出所有数据
    for var in list:
        response1 +="<p>"+ var.name + " " +str(var.value)+"<p>"
    response = response1
    return HttpResponse("<p>" + response + "</p>")



