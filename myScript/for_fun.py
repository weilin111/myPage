import numpy as np
import matplotlib.pyplot as plt


#图搜索 bfs
ver_tex_number=10

a_matrix=[]
for i in range(ver_tex_number):
    a_matrix.append([0]*ver_tex_number)

for i in range(ver_tex_number):
    a_matrix[2][i]=1

for i in range(ver_tex_number):
    a_matrix[i][2]=1

from collections import deque
def graph_bfs(a):
    visited_list=[]
    start=(0,0)
    q=deque()
    q.append(start)
    check=list(range(len(a)))

    res=[]

    dire=[[1,0],[0,-1],[-1,0],[0,1]]

    while(len(q)>0):
        now=q.popleft()
        visited_list.append( (now[0],now[1]) )
        for direction in dire:
            i=now[0]+direction[0]
            j=now[1]+direction[1]
            if (i in check and j in check and ( (i,j) not in visited_list )):
                q.append( (i,j))

        if(a[now[0]][now[1]]==2):
            res.append([now[0],now[1]])
            break
        res.append([now[0],now[1]])
    
    return res
        
a_matrix[1][3]=2
solution=graph_bfs(a_matrix)

def graw_scheme(g,solution):
    # s=np.array(solution)
    vlines=np.linspace(-0.5,len(g)-0.5,len(g))
    hlines=np.linspace(-0.5,len(g)-0.5,len(g))

    plt.vlines(vlines,min(vlines),max(vlines))
    plt.hlines(hlines,min(hlines),max(hlines))
    plt.gca().set_aspect(1)

    count=0
    for i in solution:
        plt.text(i[0],i[1],str(count))
        count+=1
    # plt.scatter(s[:,0]+0.5,s[:,1]+0.5)



    # plt.axis('off')
    
    




