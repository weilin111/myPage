---
layout: post
title: 鸱吻
date: 2024-3-26 00:00:00 +0800
category: ~~~~~
thumbnail: style/image/postLogo/图片2.png
icon: book
cate: Fun
---


* content
{:toc}


{% assign filter_tag = '鸱吻' %}

<style type="text/css">

  .title{
    font-size:1.0rem;
    text-align:center;
    text-indent:0rem !important; 
    color:white;
    text-shadow: 5px 5px #558ABB;
  }
  .wen_div
  {
  }
</style>

<br><br>
<br><br>
<div style="display:grid;grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1.2fr; gap:8px; ">

{% assign image_files = site.static_files | where: "chiwen", true %}
{% for myimage in image_files    %}
    {% if myimage.path contains  filter_tag    %}  

<div class="wen_div">
<img class="at-img" style="border-radius:8px" src="{{ myimage.path | prepend: site.baseurl }} ">  
<p class="title"> {{ myimage.basename}}  </p>
</div>

  {% endif %}      
{% endfor %}

</div>


<script>
var get_random_color_str=()=>{
  return `rgb(${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)} / ${Math.floor(Math.random()*100)}%)`
}
var get_random_color_str_bright=()=>{
  return `rgb(${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)} / 100%)`
}

window.onload = function() {
  $(".post-container").css("max-width","1800px")
  $(".post-container .post-content").css("box-shadow",`${get_random_color_str()}  18px 0px,${get_random_color_str()}  35px 0px,${get_random_color_str()} 45px 0px, ${get_random_color_str()}  50px 0px, ${get_random_color_str()} 55px 0px`)





  $("#footer").remove()
  $("#header").css("backdrop-filter","blur(51px) saturate(13)")
  $("#header").css("z-index","16")
  $("#header").empty()
  $(".page-page")[0].remove()
  $(".navigation").empty()
  $(".a-container").append("<div><div style='margin:0 auto;margin-top:5%; width:85%; text-align:center;font-size:3.5rem'><span  style='color:white;'>Louis  Kahn</span></div> </div>")


  $(".title").css( "text-shadow",`${5}px 5px ${get_random_color_str()}`)
  $(".title").css( "color",`${get_random_color_str()}`)

}
</script>