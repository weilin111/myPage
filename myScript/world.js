function create_phy_Object(xyz, v) {
    var phy_Object = {
        name: "wenmd",
        xyz: [0, 0, 0],
        velocity: [0, 0, 0],
        mass: 1

    }
    phy_Object.xyz = xyz
    phy_Object.velocity = v

    return phy_Object
}



var UI = function(canvas_id) {

    var world = {
        phy_Object_list: [],



        t: 0,

        gravity: 10,

        fps: 60,

        dt: 1 / 60,

        stop: false,







    }

    world.dt = 1 / world.fps

    var add_phy_Object = function(phy_Object) {

        world.phy_Object_list.push(phy_Object)
    }

    var particle_ring = function() {
        // center = [event.offsetX, event.offsetY]

        n = 10
        center = [canvas.width * Math.random(), canvas.height * Math.random()]
        r = Math.random() * 250
        v = [Math.random() * 200, Math.random() * 200, Math.random()]
        for (let i = 0; i < n; i++) {

            let x = center[0] + r * Math.cos(Math.PI * 2 * i / n)
            let y = center[1] + r * Math.sin(Math.PI * 2 * i / n)
            console.log(x, y)
            add_phy_Object(create_phy_Object([x, y, Math.random()], v))

        }
    }



    var E = function(xyz) {
        return 0
    }

    var B = function(xyz) {
            return 0
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
            

        */

    var vector_cross = function(a, b) {
        return [0, 0, 0]
    }


    var collider = function() {
        return
    }





    var canvas = document.getElementById(canvas_id)
    var pen = canvas.getContext("2d")


    var update = function() {
        pen.clearRect(0, 0, canvas.width, canvas.height)
            // pen.fillRect(50, 50, 20 * Math.random(), 200)
        pen.rect(0, 0, canvas.width, canvas.height)

        pen.stroke()
        for (var i in world.phy_Object_list) {
            world.phy_Object_list[i].velocity[1] += world.gravity * 1 / world.fps
            world.phy_Object_list[i].velocity[1] %= 500
            world.phy_Object_list[i].xyz[0] += world.dt * world.phy_Object_list[i].velocity[0]
            world.phy_Object_list[i].xyz[0] = world.phy_Object_list[i].xyz[0] % canvas.width

            world.phy_Object_list[i].xyz[1] = (world.phy_Object_list[i].xyz[1] + world.dt * world.phy_Object_list[i].velocity[1]) % canvas.height
            world.phy_Object_list[i].xyz[2] += world.dt * world.phy_Object_list[i].velocity[2]

            // pen.fillRect(world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1],
            //     20,
            //     20)

            pen.fillText("🌸", world.phy_Object_list[i].xyz[0], world.phy_Object_list[i].xyz[1],

            )

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



        add_phy_Object(create_phy_Object([Math.random() * 200, Math.random() * 200, Math.random()], [Math.random() * 200, Math.random() * 200, Math.random()]),

        )
    })


    canvas.addEventListener("keydown", function(event) {
        console.log(event.key)

        console.log(timer)

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


UI("draw")