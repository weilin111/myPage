# 写个A star 
# 2021年4月10日
import numpy as np

# 写个A star 
# 2021年4月10日

def A_start(a,start=(5,5),end=(9,9)):
    def distance2end(i,j):
        # return int(np.sqrt((end[0]-i)**2+(end[1]-j)**2))
        return abs(j-end[1])+abs(i-end[0])
    res=[]
    dic={}
    dic[start]=[0,distance2end( start[0],start[1] )]
    # [cost,goal]
    to_be_check=[]
    to_be_check.append(start)
    check=list(range(len(a)))

#----------------------------
    def get_best():
        min_cost_and_goal=100000
        now=None
        for i in to_be_check:
            if(dic[i][0]+dic[i][1]<min_cost_and_goal):
                min_cost_and_goal=dic[i][0]+dic[i][1]
                now=i
        to_be_check.remove(now)
        return now
#-----------------------------
    dire=[[1,0],[0,-1],[-1,0],[0,1]]

    while(len(to_be_check)>0):
        now=get_best()
    
        res.append(now)
        for direction in dire[:]:
            i=now[0]+direction[0]
            j=now[1]+direction[1]
            if (i in check and j in check and ( (i,j) not in to_be_check ) and a[i][j]!=WALL and (i,j) not in res):
                if (i,j) not in dic:
                    dic[(i,j)]=[dic[now][0]+1,distance2end(i,j)]
                else:
                    if (dic[(i,j)][0]+dic[(i,j)][1]>(dic[now][0]+1+distance2end(i,j))):
                        dic[(i,j)]=[dic[now][0]+1,distance2end(i,j)]
                to_be_check.append((i,j))
        if now==end:
            break

    return res

# 日期 需要提取路径
a_matrix=[]
ver_tex_number=10
END=2
WALL=0
ROAD=1
for i in range(ver_tex_number):
    a_matrix.append([ROAD]*ver_tex_number)

# for i in range(3,ver_tex_number-3):
#     a_matrix[2][i]=WALL

# for i in range(3,ver_tex_number-3):
#     a_matrix[i][2]=WALL

for i in a_matrix:
    print(i)

a_matrix[9][9]=END

# ---------------------
# fig = plt.figure(figsize=(10, 8), dpi=180)
solution=A_start(a_matrix)
# graw_scheme(a_matrix,solution,title="DFS with WALL")


#----------------------