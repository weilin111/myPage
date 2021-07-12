---
layout: post
title: ALGORITHM
date: 2021-7-9 00:00:00 +0800
category: random write
thumbnail: style/image/AST_GIF/1-3.gif
icon: book
---

* content
{:toc}

# 最短路


<a href="{{'/myScript/for_fun.html' | prepend : site.baseurl }} " style="color:#ff0000" target="_blank">FOR FUN</a>



# 全排列、全组合

递归

思路：

- 全组合:
- 全排列：

```python
# 2021年7月10日

def allCombination(array,k):
    res=[]
    temp=[]
    length=len(array)
    def recusive(start,n):
        
        for i in range(start,length-n+1):
    
            temp.append(array[i])
            if len(temp)==k:
                res.append(temp.copy())
            else:
                recusive(i+1,n-1)
            temp.pop(-1)
    recusive(0,k)
    return res
print( allCombination([5,2,4,52,3,3] ,2)  )

```



```python

def allPermutation(array,k):
    res=[]
    temp=[1]*k
    is_in=[0]*len(array)
    # who will be the first one
    def recusive(now_index):
        if now_index>k-1:
            return
        for i in range(len(array)):
            if not is_in[i]:
                temp[now_index]=array[i]
                if now_index==k-1:
                    res.append(temp.copy())
                is_in[i]=1
                recusive(now_index+1)
                is_in[i]=0
    recusive(0)
    return res
print(allPermutation([1,2,3,4,5],2)   )
```





# QuickSort

递归

```python
def quickSort(array):
    def recusive(left,right):
        if right<=left:
            return
        a,i=left,left
        b=right
        pivot=array[left]
        while b>=i:
            if array[i]<pivot:
                array[i],array[a]=array[a],array[i]
                i+=1
                a+=1
            elif array[i]>pivot:
                array[i],array[b]=array[b],array[i]
                b+=-1            
            else:
                i+=1
        recusive(left,a-1)
        recusive(b+1,right)
    recusive(0,len(array)-1)
    return array
print( quickSort([5,8,462,543,2,5,8,9])   )

```



