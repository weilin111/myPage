---
layout: post
title: 尝试写一个edge插件
date: 2021-8-17 00:00:00 +0800
category: ~~~~~~
thumbnail: style/image/AT_GIF/AT10.gif
icon: book
cate: CS
---




* content
{:toc}



## demo

下图为云共享的剪贴板，`UWP`应用 和 `edge` 插件应用的交通。

![addon](/myPage/style/image/2021-08-17-edgeAddon-post_assets/addon.gif)

## how



其实很简单就可以把WEB app转化成为一个edge插件。

在插件当中可以获取浏览器的各种信息、当前标签页的信息、调用浏览器的API等等，在此基础上可以开发新的web应用。

其思路是

1. 先写一个一个作为入口的`html` ,例如`popup.html`

2. 配置一个manifest.json文件,指示如何配置插件。

   

   ```json
   {
       "name": "STAR",
       "version": "0.0.0.1",
       "manifest_version": 2,
       "description": "",
       "browser_action": {
           "default_popup": "popup.html"
       }
   }
   ```

   在其中,`"default_popup": "popup.html"`设置了插件入口`html`

3. 像写web app，一样编写html，css，js。。（我的目录结构如下）

   ![1629288937609](/myPage/style/image/2021-08-17-edgeAddon-post_assets/1629288937609.png)

   在`edge`中，可以实时得到代码的运行结果，`F12`可以调出`DevTool`

   值得注意的是，入口`html`不支持内联的`js`代码，需要做额外的处理。

4. 在edge安装插件处，选择此文件夹，将其打包成为插件

![1629289182245](/myPage/style/image/2021-08-17-edgeAddon-post_assets/1629289182245.png)

具体可以参看，

[MicrosoftEdge/MicrosoftEdge-Extensions-Demos (github.com)](https://github.com/MicrosoftEdge/MicrosoftEdge-Extensions-Demos)

[Microsoft Edge (Chromium) Extensions concepts and architecture - Microsoft Edge Development Microsoft Docs](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/)



