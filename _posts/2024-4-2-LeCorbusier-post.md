---
layout: post
title: Le Corbusier
date: 2024-4-2 00:00:00 +0800
category: ~~~~~
thumbnail: style/image/postLogo/图片2.png
icon: book
cate: Fun
---




<!-- <script src="{{ '/style/js/ezoom.js' | prepend: site.baseurl    }}   "></script> -->
<!-- <link rel="stylesheet" href="{{ '/style/css/ezoom.css' | prepend: site.baseurl    }}" /> -->


<script>
    $(".post-container").css("max-width","1800px")
</script>

* content
{:toc}


{% for img in site.data.leCorbusier.imgList    %}

##  {{ img.name }} {{ img.date }}

{{ img.name }}  年代: {{ img.date }}   地点: {{ img.location }}

{{ img.discription }}


 <img class="at-img-lc" style="border-radius:8px" src="{{ img.path | prepend: site.baseurl }} "> 

{% endfor %}


<script >

</script>
