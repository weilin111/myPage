/**
 * 16进制颜色字符串转RGB
 * @param color {Sting}
 * @returns {number[]}
 */
function stringToRGB(color) {
    let r, g, b;
    if (color.length === 4) { //4位颜色处理,简写模式
        r = parseInt(color.substring(1, 2) + color.substring(1, 2), 16);
        g = parseInt(color.substring(2, 3) + color.substring(2, 3), 16);
        b = parseInt(color.substring(3) + color.substring(3), 16)
    } else { //7位颜色字符串处理
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5), 16)
    }
    return [r, g, b]
}

/**
 * 255RGB转16进制颜色字符串
 * @param r {Number} 0-255红色分量
 * @param g {Number} 0-255绿色分量
 * @param b {Number} 0-255蓝色分量
 * @returns {string} 16进制颜色字符串
 */
function rgbToString(r, g, b) {
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

function color_gradient(start, end, step_number) {
    let res = []
    start_code = stringToRGB(start)
    end_code = stringToRGB(end)
    dx = end_code[0] - start_code[0]
    dy = end_code[1] - start_code[1]
    dz = end_code[2] - start_code[2]
    for (var i = 0; i < step_number; i++) {
        res.push(
            rgbToString(start_code[0] + Math.round(dx * i / step_number), start_code[1] + Math.round(dy * i / step_number), start_code[2] + Math.round(dz * i / step_number))
        )
    }
    return res
}

function color_gradient_point(start, end, i, step_number) {
    // let res = ""
    start_code = stringToRGB(start)
    end_code = stringToRGB(end)
    dx = end_code[0] - start_code[0]
    dy = end_code[1] - start_code[1]
    dz = end_code[2] - start_code[2]

    r = start_code[0] + Math.round(dx * Math.sin(Math.PI * i / step_number))
    g = start_code[1] + Math.round(dy * Math.sin(Math.PI * i / step_number))
    b = start_code[2] + Math.round(dz * Math.sin(Math.PI * i / step_number))
    res = rgbToString(r, g, b)
    return res
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


var change_title_color = function(title_id) {

    var change_count = 0
    var start_color = get_random_Color()
    var end_color = get_random_Color()
    var fps = 45
    var change_title = function(fps) {
        $("#" + title_id).css("color", color_gradient_point(start_color, end_color, change_count, fps))
        change_count = (change_count + 1) % fps
    }
    setInterval(function() {
        change_title(fps)
    }, 1000 / fps)

}


function create_phy_Object(xyz, v) {
    var phy_Object = {
        name: "wenmd",
        xyz: [0, 0, 0],
        velocity: [0, 0, 0],
        mass: 1,
        charge: 1,
        track_steppoint_list: [],



    }
    phy_Object.xyz = xyz
    phy_Object.velocity = v

    return phy_Object
}



function fireKeyEvent(element, evtType, keyChar) {
    element.focus();
    var KeyboardEventInit = { key: keyChar, code: "", location: 0, repeat: false, isComposing: false };
    var evtObj = new KeyboardEvent(evtType, KeyboardEventInit);
    element.dispatchEvent(evtObj);
}


function get_cool_display(url) {

    $("#post-content").css("color", "#ffffff")
    $("#post-content").css("background", "#000000")


    var request = new XMLHttpRequest()
    request.open("get", url) /*设置请求方法与路径*/
    request.send(null) /*不发送数据到服务器*/
    request.onload = function() { /*XHR对象获取到返回信息后执行*/
        if (request.status == 200) { /*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText)
            json.sort(function() {
                return (0.5 - Math.random())
            })
        }
        // console.log(json)
        let s = '<div id="to_change"> '
        let s_end = '</div>'
        for (var index = 0; index != 10; index++) {
            s += '<p>' + index + ". " + json[index] + '</p>'

        }
        s += s_end
        $(".post-content").append(s)
        for (var index = 10; json.length - index != 1; index++) {
            // console.log(json[index])
            s = '<p>' + index + ". " + json[index] + '</p>'
            $(".post-content").append(s)
        }
        change_title_color("to_change")





    }
}











// ————————————————
// 版权声明：本文为CSDN博主「小宇巴巴」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/xuefu2008/article/details/108727693