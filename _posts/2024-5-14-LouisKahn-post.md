---
layout: post
title: Louis Kahn
date: 2024-4-2 00:00:00 +0800
category: ~~~~~
thumbnail: style/image/postLogo/图片2.png
icon: book
cate: Fun
---




<!-- <script src="{{ '/style/js/ezoom.js' | prepend: site.baseurl    }}   "></script> -->
<!-- <link rel="stylesheet" href="{{ '/style/css/ezoom.css' | prepend: site.baseurl    }}" /> -->

<style type="text/css">
/* https://codepen.io/NilsWe/pen/Axdozd */
body {	
  margin: 0;
  padding: 0;
  background: rgb(230,230,230);
  
  color: rgb(50,50,50);
  /* font-family: 'Open Sans', sans-serif; */
  font-size: 112.5%;
  line-height: 1.6em;
}

/* ================ The Timeline ================ */

.timeline {
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 1em 0;
  list-style-type: none;
}

h1{
  font-size:2.0rem !important;
  color:#fff !important;
}

h1:before{
  content: '' !important;
}

.timeline:before {
  position: absolute;
  left: 50%;
  top: 0;
  content: ' ';
  display: block;
  width: 15px;
  height: 100%;
  margin-left: -3px;
  background: rgb(80,80,80);
  background: -moz-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(30,87,153,1)), color-stop(100%,rgba(125,185,232,1)));
  background: -webkit-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  background: -o-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  background: -ms-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  background: linear-gradient(to bottom, rgba(80,80,80,100) 0%, rgb(9 68 246) 8%, rgb(236 20 20) 92%, rgba(80,80,80,0) 100%);
  background:linear-gradient(to bottom, rgb(255 0 0) 0%, rgb(215 0 0) 0.5%,rgb(255 255 255 / 100%) 1.5%, rgb(255 255 255 / 100%) 92%, rgba(80,80,80,0) 100%);
  
  z-index: 5;
}

.timeline li {
  padding: 1em 0;
}

.timeline li:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.direction-l {
  position: relative;
  width: 45%;
  float: left;
  text-align: right;
}

.direction-r {
  position: relative;
  width: 45%;
  float: right;
}

.flag-wrapper {
  position: relative;
  display: inline-block;
  
  text-align: center;
}

.flag {
  /* position: relative; */
  display: inline;
  background: black;
  color:white;
  padding: 6px 10px;
  border-radius: 5px;
  
  font-weight: 600;
  text-align: left;
}




.direction-l .flag {
  -webkit-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  -moz-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  float:right;
}

.direction-r .flag {
  -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  -moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  float:left;


}

.direction-l .flag:before,
.direction-r .flag:before {
  position: absolute;
  top: 50%;
  right: -75px;
  content: ' ';
  display: block;
  width: 62px;
  height: 12px;
  margin-top: -10px;
  background: white;
  /* border-radius: 10px; */
  border: 0px solid rgb(255,80,80);
  z-index: 10;
}

.direction-r .flag:before {
  left: -75px;
}

/* .direction-l .flag:after {
  content: "";
  position: absolute;
  left: 100%;
  top: 50%;
  height: 0;
  width: 0;
  margin-top: -8px;
  border: solid transparent;
  border-left-color: rgb(248,248,248);
  border-width: 8px;
  pointer-events: none;
}

.direction-r .flag:after {
  content: "";
  position: absolute;
  right: 100%;
  top: 50%;
  height: 0;
  width: 0;
  margin-top: -8px;
  border: solid transparent;
  border-right-color: rgb(248,248,248);
  border-width: 8px;
  pointer-events: none;
} */

.time-wrapper {
  display: inline;
  
  line-height: 1em;
  font-size: 0.66666em;
  color: rgb(250,80,80);
  vertical-align: middle;
}

.direction-l .time-wrapper {
  float: left;
}

.direction-r .time-wrapper {
  float: right;
}

.time {
  display: inline-block;
  padding: 4px 6px;
  background: rgb(248,248,248);
  border-radius:4px;
}

.desc {
  margin: 1em 0.75em 0 0;
  
  font-size: 0.77777em;
  font-style: italic;
  line-height: 1.5em;
  color: white;
}

.post-content p{
  text-indent:0rem;
}

.direction-r .desc {
  margin: 1em 0 0 0.75em;
}

/* ================ Timeline Media Queries ================ */

@media screen and (max-width: 660px) {

.timeline {
 	width: 100%;
	padding: 4em 0 1em 0;
}

.timeline li {
	padding: 2em 0;
}

.direction-l,
.direction-r {
	float: none;
	width: 100%;

	text-align: center;
}

.flag-wrapper {
	text-align: center;
}

.flag {
	background: rgb(0,0,0);
  color:white;
  position:relative;
	z-index: 15;
}

.direction-l .flag:before,
.direction-r .flag:before {
  position: absolute;
  top: -60px;
	left: 50%;
	content: ' ';
	display: block;
	width: 36px;
	height: 0px;
	margin-left: -9px;
	background: aquamarine;
	border-radius: 10px;
	border: 0px solid aquamarine;
	z-index: 15;
}

/* .direction-l .flag:after,
.direction-r .flag:after {
	content: "";
	position: absolute;
	left: 50%;
	top: -8px;
	height: 0;
	width: 0;
	margin-left: -8px;
	border: solid transparent;
	border-bottom-color: rgb(255,255,255);
	border-width: 8px;
	pointer-events: none;
} */

.time-wrapper {
	display: block;
	position: relative;
	margin: 4px 0 0 0;
	z-index: 14;
}

.direction-l .time-wrapper {
	float: none;
}

.direction-r .time-wrapper {
	float: none;
}

.desc {
	position: relative;
	margin: 1em 0 0 0;
	padding: 1em;
	background: rgb(0,0,0);
	-webkit-box-shadow: 0 0 1px rgba(0,0,0,0.20);
	-moz-box-shadow: 0 0 1px rgba(0,0,0,0.20);
	box-shadow: 0 0 1px rgba(0,0,0,0.20);
	text-indent:0rem;
  z-index: 15;
}

.direction-l .desc,
.direction-r .desc {
	position: relative;
	margin: 1em 1em 0 1em;
	padding: 1em;
	
  z-index: 15;
}

}

@media screen and (min-width: 400px ?? max-width: 660px) {

.direction-l .desc,
.direction-r .desc {
	margin: 1em 4em 0 4em;
}

}

.at-img-lc{
  z-index:10;
}
.at-img-lc:hover{
    transform: scale(1.6);
    transition: all 0.2s ease 0s;

}
</style>

<script>
    $(".post-container").css("max-width","1800px")
</script>



* content
{:toc}


<ul class="timeline">

<!-- num= {{ site.data.leCorbusier.imgList.size }} -->

{% for img in site.data.louisKahn.imgList    %}
  <li>
		<div class="direction-{% cycle 'r', 'l' %}">
  		<div class="flag-wrapper">
        <h1 style="z-index:10 !important;">{{ img.name }} <sub>{{ img.date }}</sub>  </h1>
				<span class="flag">{{ img.name }} {{ img.date }} </span>
				<!-- <span class="time-wrapper"><span class="time">建成年代: {{ img.date }}</span></span> -->
			</div>
			<div class="desc">
       <p>{{ img.location }}</p> 
       <p>{{ img.discription }} </p>
      </div>
			<div class="desc">
         <img class="at-img-lc" style="border-radius:8px" src="{{ img.path | prepend: site.baseurl }} "> 
      </div>
		</div>
	</li>
	
{% endfor %}

</ul>








<script >
$("#navigation")[0].innerHTML=""

$(".post-header")[0].innerHTML=""

window.onload = function() {
  $("#footer").remove()
  $("#header").css("backdrop-filter","blur(51px) saturate(13)")
  $("#header").css("z-index","16")
  $(".page-page")[0].remove()

}
</script>
