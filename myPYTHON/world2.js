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
            return [100 * dx / 500, 0, 0]
        },

        B: function(xyz) {
            return [0, 0, 2 * xyz[0] / 500]
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

        if (world.phy_Object_list[i].xyz[0] < 0) {
            world.phy_Object_list[i].xyz[0] += canvas.width
        }
        if (world.phy_Object_list[i].xyz[1] < 0) {
            world.phy_Object_list[i].xyz[1] += canvas.height
        }

        world.phy_Object_list[i].xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1]) % canvas.height


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
        p.xyz[0] = world.phy_Object_list[i].xyz[0] % canvas.width

        p.xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1]) % canvas.height
            // p.xyz[2] += world.dt * world.phy_Object_list[i].velocity[2]

        if (world.phy_Object_list[i].xyz[0] < 0) {
            world.phy_Object_list[i].xyz[0] += canvas.width
        }
        if (world.phy_Object_list[i].xyz[1] < 0) {
            world.phy_Object_list[i].xyz[1] += canvas.height
        }

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
            // pen.fillRect(50, 50, 20 * Math.random(), 200)
        pen.rect(0, 0, canvas.width, canvas.height)

        draw_E()

        pen.stroke()

        for (var i in world.phy_Object_list) {


            if (world.EM_active) {
                EM_module(i)
            }
            if (world.gravity_active) {
                gravity_module(i)
            }
            // pen.fillRect(world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1],
            //     20,
            //     20)

            world.phy_Object_list[i].track_steppoint_list.push([world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1], world.phy_Object_list[i].xyz[2]])
            if (world.phy_Object_list[i].track_steppoint_list.length > world.track_steppoint_maxNumber) {
                world.phy_Object_list[i].track_steppoint_list.shift()
            }

            pen.fillText("🌸", world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1], )
            if (world.draw_track) {

                pen.fillStyle = "#00eeff"

                for (j in world.phy_Object_list[i].track_steppoint_list) {

                    pen.fillRect(world.phy_Object_list[i].track_steppoint_list[j][0], world.phy_Object_list[i].track_steppoint_list[j][1], 2, 2)
                        //优化

                }
                pen.fillStyle = "#000000"
            }



            // fillText arc rect
            // pen.rect(0, 0, canvas.width, canvas.height)

            // pen.stroke()

        }
    }



    var timer = setInterval(function() {
            update()
        }, 1000 / world.fps)
        //清除动画
        // clearInterval(timer);
    canvas.addEventListener("click", function(event) {


        add_phy_Object(create_phy_Object([Math.random() * canvas.width, Math.random() * canvas.height, Math.random()], [Math.random() * 100, Math.random() * 100, Math.random()]),

        )
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