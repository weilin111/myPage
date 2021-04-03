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
    res = rgbToString(start_code[0] + Math.round(dx * i / step_number), start_code[1] + Math.round(dy * i / step_number), start_code[2] + Math.round(dz * i / step_number))
    return res
}


// ————————————————
// 版权声明：本文为CSDN博主「GIS开发者」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/GISuuser/article/details/84875008



var UI = function(canvas_id) {

    var world = {
        phy_Object_list: [],



        t: 0,

        gravity: 0,

        fps: 25,

        dt: 1 / 60,

        stop: false,

        gravity_active: false,

        EM_active: true,

        draw_track: true,

        track_steppoint_maxNumber: 100,

        E: function(xyz) {
            center = [250, 400, 0]
            dx = center[0] - xyz[0]
            dy = center[1] - xyz[1]
            return [100 * dx / 500, 100 * dy / 500, 0]
        },

        B: function(xyz) {
            // return [0, 0, 2 * xyz[0] / 500]
            return [0, 0, 0]
        }


    }

    world.dt = 1 / world.fps

    var add_phy_Object = function(phy_Object) {

        world.phy_Object_list.push(phy_Object)
    }

    var particle_ring = function() {
        // center = [event.offsetX, event.offsetY]

        let n = 10
        let center = [canvas.width * Math.random(), canvas.height * Math.random()]
        let r = Math.random() * 250
        let v = [Math.random() * 200, Math.random() * 200, Math.random()]
        for (let i = 0; i < n; i++) {

            let x = center[0] + r * Math.cos(Math.PI * 2 * i / n)
            let y = center[1] + r * Math.sin(Math.PI * 2 * i / n)
                // console.log(x, y)
            add_phy_Object(create_phy_Object([x, y, Math.random()], v))

        }
    }




    // EM module
    /*
    todo 
        EM module
            calcule
            vector 
        interaction
            emit as drag
        special key
            ring flower
                团的速度bug
        速度vector箭头

    */

    var vector_cross = function(a, b) {
        return [a[1] * b[2], -a[0] * b[2], 0]
    }





    var collider = function() {
        return
    }

    var gravity_module = function(i) {
        world.phy_Object_list[i].velocity[1] += world.gravity * 1 / world.fps
        world.phy_Object_list[i].velocity[1] %= 500
        world.phy_Object_list[i].xyz[0] += world.dt * world.phy_Object_list[i].velocity[0]
        world.phy_Object_list[i].xyz[0] = world.phy_Object_list[i].xyz[0] % canvas.width

        // if (world.phy_Object_list[i].xyz[0] < 0) {
        //     world.phy_Object_list[i].xyz[0] += canvas.width
        // }
        // if (world.phy_Object_list[i].xyz[1] < 0) {
        //     world.phy_Object_list[i].xyz[1] += canvas.height
        // }

        world.phy_Object_list[i].xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1])


    }

    var EM_module = function(i) {
        p = world.phy_Object_list[i]
        fb = vector_cross(p.velocity, world.B(p.xyz))
        fe = world.E(p.xyz)
            // console.log(fb)
            // console.log(fe)

        p.velocity[0] += fb[0] * p.charge / p.mass * world.dt + fe[0] * p.charge / p.mass * world.dt
        p.velocity[1] += fb[1] * p.charge / p.mass * world.dt + fe[1] * p.charge / p.mass * world.dt

        p.xyz[0] += world.dt * world.phy_Object_list[i].velocity[0]
        p.xyz[0] = world.phy_Object_list[i].xyz[0]

        p.xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1])


        // p.xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1]) % canvas.height
        // if (world.phy_Object_list[i].xyz[0] < 0) {
        //     world.phy_Object_list[i].xyz[0] += canvas.width
        // }
        // if (world.phy_Object_list[i].xyz[1] < 0) {
        //     world.phy_Object_list[i].xyz[1] += canvas.height
        // }

    }


    var canvas = document.getElementById(canvas_id)
    var pen = canvas.getContext("2d")

    var draw_E = function() {

        n = 10
            // pen.beginPath()
        for (var i = 0; i < n; i++) {

            pen.moveTo(canvas.width * i / n, 0)
            pen.lineTo(canvas.width * i / n, canvas.height)
            pen.fillText("" + world.E([canvas.width * i / n, 0, 0]), canvas.width * i / n, 100)

        }
        // pen.stroke()


    }




    var update = function() {
        pen.clearRect(0, 0, canvas.width, canvas.height)
        pen.rect(0, 0, canvas.width, canvas.height)

        draw_E()

        pen.stroke()

        for (var i in world.phy_Object_list) {

            //00000000000000-------------------------CALCULATER---------------------------00000000000000000000000
            if (true) {
                if (world.EM_active) {
                    EM_module(i)
                }
                if (world.gravity_active) {
                    gravity_module(i)
                }

                if (world.phy_Object_list[i].xyz[0] <= 0 || world.phy_Object_list[i].xyz[0] >= canvas.width) {
                    world.phy_Object_list[i].velocity[0] *= -1
                }

                if (world.phy_Object_list[i].xyz[1] <= 0 || world.phy_Object_list[i].xyz[1] >= canvas.height) {
                    world.phy_Object_list[i].velocity[1] *= -1
                }

                world.phy_Object_list[i].track_steppoint_list.push([world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1], world.phy_Object_list[i].xyz[2]])

                if (world.phy_Object_list[i].track_steppoint_list.length > world.track_steppoint_maxNumber) {
                    world.phy_Object_list[i].track_steppoint_list.shift()
                }

            }

            //00000000000000-------------------------DRAW---------------------------00000000000000000000000
            pen.fillStyle = "#000000"

            pen.fillText("🌸", world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1], )

            if (world.draw_track) {

                start_color = "#00eeff"
                end_color = "#ff0000"
                color_box = color_gradient(start_color, end_color, world.phy_Object_list[i].track_steppoint_list.length)


                for (j in world.phy_Object_list[i].track_steppoint_list) {
                    pen.fillStyle = color_box[j]
                    pen.fillRect(world.phy_Object_list[i].track_steppoint_list[j][0], world.phy_Object_list[i].track_steppoint_list[j][1], 3, 3)
                        //需要优化

                }

            }


        }
    }

    var timer = setInterval(function() {
        update()
    }, 1000 / world.fps)



    canvas.addEventListener("click", function(event) {


        add_phy_Object(create_phy_Object([Math.random() * canvas.width, Math.random() * canvas.height, Math.random()], [Math.random() * 100, Math.random() * 100, Math.random()]),

        )
    })

    var now_mousedown_position = [0, 0]

    canvas.addEventListener("mousedown", function(event) {

        console.log(event.offsetX, event.offsetY)
        now_mousedown_position[0] = event.offsetX
        now_mousedown_position[1] = event.offsetY


    })

    canvas.addEventListener("mouseup", function(event) {

        xyz = [event.offsetX, event.offsetY, 0]
        dx = -event.offsetX + now_mousedown_position[0]
        dy = -event.offsetY + now_mousedown_position[1]
        v = [dx, dy, 0]
        add_phy_Object(create_phy_Object(xyz, v))

    })


    canvas.addEventListener("keydown", function(event) {
        // console.log(event.key)

        // console.log(timer)

        switch (event.key) {
            case "s":
                if (world.stop) {
                    timer = setInterval(update, 1000 / world.fps)
                } else {
                    clearInterval(timer)
                }
                world.stop = !world.stop
                break;
            case "r":
                for (var i in world.phy_Object_list) {
                    world.phy_Object_list[i].velocity[1] *= -0.5
                }
                break;
            case "k":
                world.phy_Object_list = []
                break;
            case "1":

                particle_ring()
                break;

        }


    })



}


UI("draw2")