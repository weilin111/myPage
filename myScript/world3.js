function get_UI() {
    var UI2 = function(canvas_id) {
        var world = {
            phy_Object_list: [],

            t: 0,

            gravity: 0,

            fps: 12,

            dt: 1 / 35,

            stop: false,

            gravity_active: false,

            EM_active: true,

            draw_track: true,

            track_steppoint_maxNumber: 18,



        }




        world.dt = 1 / world.fps
        var canvas = document.getElementById(canvas_id)
        var pen = canvas.getContext("2d")
        let tem_xyz = [canvas.width * Math.random(), canvas.height * Math.random(), Math.random()]
        console.log(tem_xyz)
        var E_tem_xyz = [canvas.width / 2 * (1 + Math.random() * 0.6), canvas.height / 2 * (1 + Math.random() * 0.6), Math.random()]
        var is_field_move_with_cursor=false

        function E(xyz) {
            let center = [E_tem_xyz[0], E_tem_xyz[1], E_tem_xyz[2]]
            let dx = center[0] - xyz[0]
            let dy = center[1] - xyz[1]
            return [100 * dx / 500, 100 * dy / 500, 0]
        }

        var r_0 = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)

        function B(xyz) {


            if (tem_xyz[2] > 0.5) {
                let dx = canvas.width - xyz[0]
                let dy = canvas.height - xyz[1]
                let r = Math.sqrt(dx * dx + dy * dy)
                if (r > r_0) {
                    return [0, 0, 0]
                }
                return [0, 0, 3 * Math.exp(1.5 * (r / r_0 - 1))]
            }
            return [0, 0, 0]
        }




        var litle_dot = {
            xyz: [200, 200, 0],
            color: "#ff0000",
        }




        var add_phy_Object = function(phy_Object) {

            world.phy_Object_list.push(phy_Object)
        }

        var particle_ring = function() {
            // center = [event.offsetX, event.offsetY]

            let n = 6
            let center = [canvas.width * Math.random(), canvas.height * Math.random()]
            let r = Math.random() * 250
            let v = [Math.random() * 50, Math.random() * 50, 0]
            for (let i = 0; i < n; i++) {

                // center[0] + r * Math.cos(Math.PI * 2 * i / n)
                // center[1] + r * Math.sin(Math.PI * 2 * i / n)
                    // console.log(x, y)
                add_phy_Object(create_phy_Object([center[0] + r * Math.cos(Math.PI * 2 * i / n), center[1] + r * Math.sin(Math.PI * 2 * i / n), 0], [v[0],v[1],v[2]]))

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

            world.phy_Object_list[i].xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1])


        }

        var EM_module = function(i) {
            p = world.phy_Object_list[i]
            fb = vector_cross(p.velocity, B(p.xyz))
            fe = E(p.xyz)
                // console.log(fb)
                // console.log(fe)

            p.velocity[0] += fb[0] * p.charge / p.mass * world.dt + fe[0] * p.charge / p.mass * world.dt
            p.velocity[1] += fb[1] * p.charge / p.mass * world.dt + fe[1] * p.charge / p.mass * world.dt

            p.xyz[0] += world.dt * world.phy_Object_list[i].velocity[0]
            p.xyz[0] = world.phy_Object_list[i].xyz[0]

            p.xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1])



        }






        var draw_E = function() {

            n = 10
                // pen.beginPath()
            for (var i = 0; i < n; i++) {

                pen.moveTo(canvas.width * i / n, 0)
                pen.lineTo(canvas.width * i / n, canvas.height)
                pen.fillText("" + E([canvas.width * i / n, 0, 0]), canvas.width * i / n, 100)

            }
            // pen.stroke()


        }


        var draw_little_dot = function(l) {
            // pen.fillText("🐟", l.xyz[0], l.xyz[1])
            pen.fillText("✨", E_tem_xyz[0], E_tem_xyz[1])

        }

        let start_color = get_random_Color()
        let end_color = get_random_Color()


        var update = function() {
            pen.clearRect(0, 0, canvas.width, canvas.height)
                // pen.rect(0, 0, canvas.width, canvas.height)

            // draw_E()
            draw_little_dot(litle_dot)

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
                        world.phy_Object_list[i].velocity[0] *= -0.3
                    }
                    // *=-1 or 0 
                    if (world.phy_Object_list[i].xyz[1] <= 0 || world.phy_Object_list[i].xyz[1] >= canvas.height) {
                        world.phy_Object_list[i].velocity[1] *= -0.3
                    }

                    world.phy_Object_list[i].track_steppoint_list.push([world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1], world.phy_Object_list[i].xyz[2]])

                    if (world.phy_Object_list[i].track_steppoint_list.length > world.track_steppoint_maxNumber) {
                        world.phy_Object_list[i].track_steppoint_list.shift()
                    }

                }
                //00000000000000-------------------------CALCULATER---------------------------00000000000000000000000

                //00000000000000-------------------------DRAW---------------------------00000000000000000000000
                pen.fillStyle = "#000000"
                // "🌸"
                pen.fillText(" ", world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1], )

                if (world.draw_track) {


                    color_box = color_gradient(start_color, end_color, world.phy_Object_list[i].track_steppoint_list.length)


                    for (j in world.phy_Object_list[i].track_steppoint_list) {
                        pen.fillStyle = color_box[j]
                        pen.fillRect(world.phy_Object_list[i].track_steppoint_list[j][0], world.phy_Object_list[i].track_steppoint_list[j][1], 2, 2)
                            //需要优化

                    }

                }
                //00000000000000-------------------------DRAW---------------------------00000000000000000000000


            }
        }

        // var timer = setInterval(function() {
        //     update()
        // }, 1000 / world.fps)


        function draw_by_request_frame() {
            requestAnimationFrame(draw_by_request_frame)
            update()
        }
        draw_by_request_frame()






        canvas.addEventListener("click", function(event) {

            tem_xyz = [event.offsetX, event.offsetY, Math.random()]
            E_tem_xyz = [event.offsetX, event.offsetY, 0]

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


        function emitter() {
            let count = 10

            function add() {
                add_phy_Object(create_phy_Object([tem_xyz[0], tem_xyz[1], 0], [0, 0, 0]))
                count -= 1
                if (count == 0) {
                    clearInterval(t)
                    fireKeyEvent(document.getElementById(canvas_id), "keydown", "r")
                    E_tem_xyz = [canvas.width / 2 * (1 + Math.random() * 0.6), canvas.height / 2 * (1 + Math.random() * 0.6), Math.random()]
                }
            }

            var t = setInterval(() => {
                add()
            }, 1000 / 4);
        }

        canvas.addEventListener("keydown", function(event) {
            // console.log(event.key)

            // console.log(timer)

            switch (event.key) {
                case "p":
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
                case "2":
                    emitter()
                    break
                case "m":
                    is_field_move_with_cursor=!is_field_move_with_cursor
                    

            }

            canvas.addEventListener("mousemove",(event)=>{
                
                
                tem_xyz = [event.offsetX, event.offsetY, tem_xyz[2]]
                if(is_field_move_with_cursor){
                E_tem_xyz = [event.offsetX, event.offsetY, 0]

                }
                // console.log(tem_xyz)
            })


            canvas.addEventListener("keypress", (event) => {
                // console.log(event.key)
                switch (event.key) {
                    case "w":
                        litle_dot.xyz[1] -= 1
                        break
                    case "s":
                        litle_dot.xyz[1] += 1
                        break
                    case "a":
                        litle_dot.xyz[0] -= 1
                        break
                    case "d":
                        litle_dot.xyz[0] += 1
                        break
                }

            })


        })
        particle_ring()
        emitter()


    }
    return UI2
}