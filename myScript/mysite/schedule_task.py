import schedule
import time
import psutil
import datetime
import sqlite3
import json
import os

def write_to_file_cpu_and_memory_percent():
    b=psutil.cpu_percent(1)
    a=psutil.virtual_memory().percent

    y=datetime.datetime.now().year
    m=datetime.datetime.now().month
    d=datetime.datetime.now().day
    hour=datetime.datetime.now().hour
    minute=datetime.datetime.now().minute

    date=str(y)+"-"+str(m)+"-"+str(d)
    
    now=str(hour)+":"+str(minute)

    with open("server_status.txt","a+") as f:
        f.write( date+' '+now +' ' + str(a)+ ' '+str(b) +"\n"  )




def update_pic_json():
    base_url="/home/ubuntu/pluto/myPage/style/image"
    namelist=[]
    def get_list(dir_name):
        a=os.listdir(dir_name)
        for i in a:
            if "." not in i:
                if "logo" in i:
                    continue
                get_list(dir_name+"/"+i)
            else:
                namelist.append(dir_name+"/"+i)
    get_list(base_url)
    namelist2=[]
    for i in namelist:
        namelist2.append(os.path.abspath(i))
    namelist2[:20]
    with open("../mysite/cache/pic.json","w",encoding="utf-8") as f:
        json.dump(namelist2,f,ensure_ascii=False)


def update_sql_fun_fact():
        
    db=sqlite3.connect("/home/ubuntu/pluto/myPage/myScript/mysite/db.sqlite3")
    cur=db.cursor()

    # cur.fetchall()[0][1]

    #从json导入

    cur.execute("DELETE  FROM myDB_cool_knowledge " )
    
    import json

    with open("/home/ubuntu/pluto/myPage/myScript/cool.json","r",encoding="utf-8") as f:
        s=json.loads(f.read())

    count=0
    for i in s:
        # print(i)
        cur.execute("INSERT INTO myDB_cool_knowledge values("+str(count)+",'"+i+"')")
        count+=1
    cur.execute("SELECT * FROM myDB_cool_knowledge")
    # print(cur.fetchall())
    db.commit()
    

def POST_update_read_pic():
    #更新读书摘 2021年4月6日

    header=["---",
    "layout: post",
    "title: 读书摘",
    "date: 2021-3-29 00:00:00 +0800"
    ,
    "category: (^\^) windows",
    "thumbnail: style/image/Twitter/6-203.jpg",
    "icon: book",
    "---"]

    dirname="/home/ubuntu/pluto/myPage/style/image/书摘"
    table=os.listdir(dirname)
    # ![png]({{ '/style/image/书摘/IMG_20210216_173839_0004.PNG' | prepend: site.baseurl }}
    # )
    def inner(s):
        return "![png]({{'"+s+" ' | prepend : site.baseurl }})"
    l=[]
    dirname="/style/image/书摘/"
    for i in table:
        filename=dirname+i
        l.append(inner(filename))
    l.reverse()

    md_name="../../_posts/2021-03-01-读书摘1-post.md"

    with open(md_name,"w",encoding="utf-8") as f:
        for i in header:
            f.write(i+"\n")
        f.write("\n")
        f.write("\n")
        for i in l:
            f.write(i+"\n")
    

# todo---------------------

def clean_uwsgi_log():
    pass

def get_newest_prl():
    pass




def update_weekly():
    POST_update_read_pic()
    update_sql_fun_fact()
    update_pic_json()

# 定义你要周期运行的函数
def job():
    write_to_file_cpu_and_memory_percent()
    # print("I'm working...")

schedule.every(10).minutes.do(job)               # 每隔 10 分钟运行一次 job 函数
# schedule.every(1).minute.do()
# schedule.every().hour.do(job)                    # 每隔 1 小时运行一次 job 函数
# schedule.every().day.at("10:30").do(job)         # 每天在 10:30 时间点运行 job 函数
# schedule.every().monday.do(job)                  # 每周一 运行一次 job 函数
schedule.every().sunday.at("13:15").do(update_weekly)   # 每周三 13：15 时间点运行 job 函数
# schedule.every().minute.at(":13").do(job)        # 每分钟的 17 秒时间点运行 job 函数

while True:
    schedule.run_pending()   # 运行所有可以运行的任务
    time.sleep(1)