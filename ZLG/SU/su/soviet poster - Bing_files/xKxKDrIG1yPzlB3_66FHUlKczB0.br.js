var FlagFeedback;(function(n){function st(n){n=n||window.event;var t=n.target||n.srcElement;i&&!i.contains(t)&&i.offsetHeight>0&&l()}function ht(n){var t,r;n=n||window.event;t=n.target||n.srcElement;i&&i.contains(t)&&(r=n?n.which?n.which:n.keyCode:n.keyCode,r==wt?(t.tagName=="INPUT"||t.className=="buttonLink"||t.id=="fbdialogcl")&&t.click():r==bt?(t.className=="buttonLink"||t.id=="fbdialogcl")&&(t.click(),w(n)):r==kt&&(l(),w(n)))}function ct(n){p&&!i.contains(n.target)&&(w(n),i.focus())}function w(n){sj_sp(n);sj_pd(n)}function dt(){y=document.activeElement;var n=this.metadata;n&&gt(n.turl,n.maw,n.mah)}function gt(n,t,r){c.textContent="";var f=_d.createElement("img");f.src=n;f.alt=rt&&rt.innerText;t&&r&&(t>250?(f.width=250,f.height=r*250/t):(f.width=t,f.height=r));c.appendChild(f);i.style.display="block";p=!0;u.focus()}function lt(){(u.checked||e.checked||o.checked||s.checked)&&(t.style.display="none",t.textContent="",t.setAttribute(v,"true"))}function l(){i.style.display="none";k.style.display="block";f.style.display="none";f.textContent="";c.style.display="block";t.style.display="none";t.textContent="";t.setAttribute(v,"true");g.style.display="block";nt.style.display="block";tt.style.display="none";u.checked=!1;e.checked=!1;o.checked=!1;s.checked=!1;var n=this.metadata;return n&&vt("flagClose",null,n.ns,n.k),p=!1,y&&y.focus(),sj_evt.fire(yt),!1}function at(){var i,r,n,f;if(!u.checked&&!e.checked&&!o.checked&&!s.checked){t.style.display="block";t.textContent=t.dataset.content;t.setAttribute(v,"false");t.focus();return}if(i=[],u.checked&&i.push("irrelevant"),e.checked&&i.push("offensive"),o.checked&&i.push("adult"),s.checked&&i.push("childabuse"),r=i.join(","),n=this.metadata,n&&(vt("flagSubmit",r,n.ns,n.k),f=d.getAttribute("fbposturl"),f)){var h=window.location.href.match("(images|videos)"),l=h?h[0]:"",c=window.location.href.match(/q=(.+?)(&|$)/),a=c?c[1]:"",y=d.getAttribute("ss"),p=!!n.md5&&n.md5.length>0?n.md5:null,w={partner:"",feedbackType:"",vertical:l,safesearchsetting:y,source:n.src,trafficType:"External",query:a,mUrl:encodeURIComponent(n.imgurl),pUrl:encodeURIComponent(n.surl),thumbUrl:encodeURIComponent(n.turl),hash:p,judgement:r,timestamp:_G.ST.toISOString(),itemId:n.itemId||"",entrypoint:n.entrypoint||""};ReportResult.send(f,w)}ni();sj_evt.fire(pt)}function vt(n,t,i,r){if(typeof mmLog!="undefined"&&mmLog){var u=['{"T":"CI.Click","Name":"',n,'","Meta":"',t,'","AppNS":"',i,'","K":"',r,".1",'","TS":',sb_gt(),"}"];mmLog(u.join(""))}}function ni(){k.style.display="none";f.style.display="block";f.textContent=f.dataset.content;c.style.display="none";g.style.display="none";nt.style.display="none";tt.style.display="block";f.focus()}function b(){sj_ue(_d,"click",st);sj_ue(_d,"keydown",ht);sj_ue(_d,"focusin",ct);sj_evt.unbind("ajax.unload",b);sj_ue(ut,"click",h);sj_ue(ft,"submit",a);sj_ue(u,"click",r);sj_ue(e,"click",r);sj_ue(o,"click",r);sj_ue(s,"click",r);sj_ue(et,"click",a);sj_ue(ot,"click",h);sj_ue(it,"click",h)}var v="aria-hidden",i=_ge("fbdialog"),k=_ge("fbdialog_message"),f=_ge("fbthankyou_message"),d=_ge("fbdialog_container"),c=_ge("fbdialog_thumb_container"),t=_ge("fbdialog_errormessage"),g=_ge("checkbox_region"),u=_ge("irrelevant_mark_checkbox"),e=_ge("offensive_mark_checkbox"),o=_ge("adult_mark_checkbox"),s=_ge("childabuse_mark_checkbox"),nt=_ge("fbdialog_buttons"),tt=_ge("fbthankyou_button"),it=_ge("adult_button_close"),yt="flagfeedback_close",pt="flagfeedback_submit",rt=_ge("fbdialog_title"),ut=_ge("fbdialogcl"),ft=_ge("fbdialog_mark_form"),et=_ge("adult_button_submit"),ot=_ge("adult_button_cancel"),wt=13,bt=32,kt=27,y,p=!1,h=function(){return l()},a=function(){return at()},r=function(){return lt()};sj_be(_d,"click",st);sj_be(_d,"keydown",ht);sj_be(_d,"focusin",ct);sj_be(_d,"unload",b);sj_evt.bind("ajax.unload",b);sj_be(ut,"click",h);sj_be(ft,"submit",a);sj_be(u,"click",r);sj_be(e,"click",r);sj_be(o,"click",r);sj_be(s,"click",r);sj_be(et,"click",a);sj_be(ot,"click",h);sj_be(it,"click",h);n.c=dt;n.p=lt;n.s=at;n.h=l})(FlagFeedback||(FlagFeedback={}))