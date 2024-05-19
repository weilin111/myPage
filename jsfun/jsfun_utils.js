

function binomial(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number')) 
 return false; 
   var coeff = 1;
   for (var x = n-k+1; x <= n; x++) coeff *= x;
   for (x = 1; x <= k; x++) coeff /= x;
   return coeff;
}
var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


 function get_random_Color() {
    //定义数组，值为1—f
    var num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    //颜色的值为16进制并且开头为#，
    str = "#";
    //我们需要的是一个6位的十六进制所以循环6次
    for (var i = 0; i < 6; i++) {
        //随机产生的数做数组的索引，索引值只能为整数所以需要转换为整型通过索引获得数组的值,

        str += num[parseInt(Math.random() * 15)];
    }
    return str;
}


function random_direction(){

    let vx=(Math.random()-0.5)*2
    let vy=(Math.random()-0.5)*2

    factor=Math.sqrt(vx*vx+vy*vy)
    vx=vx/factor
    vy=vy/factor

    return [vx,vy]
}



function get_direction(p1,p2){
    dx=p2[0]-p1[0]
    dy=p2[1]-p1[1]
    l=Math.sqrt(dx*dx+dy*dy)
    return [dx/l,dy/l]
}



function direction2angle(direction){
    return Math.atan2(direction[1],direction[0])
}

function distance(p1,p2){
    let dx=p1[0]-p2[0]
    let dy=p1[1]-p2[1]

    return(Math.sqrt(dx*dx+dy*dy))
}

function fireKeyEvent(element, evtType, keyChar) {
    element.focus();
    var KeyboardEventInit = {key:keyChar, code:"", location:0, repeat:false, isComposing:false};
    var evtObj = new KeyboardEvent(evtType, KeyboardEventInit);
    element.dispatchEvent(evtObj);
}

