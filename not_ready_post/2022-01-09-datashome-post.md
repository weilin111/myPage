---
layout: post
title: Data's home
date: 2022-1-9 00:00:00 +0800
category: ~~~~~~
thumbnail: style/image/postLogo/图片2.png
icon: book
cate: CS
---


* content
{:toc}


出发点
-  1.基于FLASK搭一个简单的服务器，当前端给定shotno和想看的数据，后端python绘图并返回。这样方便可视化数据
-  1.2 随机抽取数据查看
-  2.后期可以做测试模型并可视化之用

## trick

```python

def pltCanvas2img(canvas):
    buffer=io.BytesIO()
    canvas.print_png(buffer)
    data=buffer.getvalue()
    buffer.close()
    return data
fig,ax=plt.subplots(n_row,n_col,figsize=(9,7))
# your plot code
png=pltCanvas2img(fig.canvas)

```




## picture



![1641770769070](style/image/ALL_MD_PIC/1641770769070.png)

![1641770909655](style/image/ALL_MD_PIC/1641770909655.png)


## @2022年2月5日

<img src="style/image/ALL_MD_PIC/1644864021437.png" alt="1644864021437" style="zoom:80%;" />

![1644864037995](style/image/ALL_MD_PIC/1644864037995.png)

![1644864069515](style/image/ALL_MD_PIC/1644864069515.png)

![1644864136007](style/image/ALL_MD_PIC/1644864136007.png)

![1644864344649](style/image/ALL_MD_PIC/1644864344649.png)

![1644864390083](style/image/ALL_MD_PIC/1644864390083.png)