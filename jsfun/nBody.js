

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var clamp = (num, min, max) => Math.min(Math.max(num, min), max)

add_game_canvas_to_container("canva_container")

function add_game_canvas_to_container(container_id) {




    let canvas_container = document.getElementById("canva_container")
    var canvas = document.createElement("canvas")
    canvas_container.appendChild(canvas)

    let scale = canvas_container.offsetWidth / 1600

    let width = 1600
    let height = 900

    canvas.style.width = (width * scale) + 'px'
    canvas.style.height = (height * scale) + 'px'


    scale = scale * window.devicePixelRatio
    canvas.width = width * scale
    canvas.height = height * scale



    var ctx = canvas.getContext("2d")

    let font0 = scale * 18 + "px AGENCY"
    let text_margin_y = scale * 19
    var font_icon_prefix = "px WEBDINGS"
    var font_icon = scale * 100 + "px WEBDINGS"
    var font_icon_passenger = scale * 40 + "px WEBDINGS"
    var font_big = scale * 180 + "px AGENCY"
    // var font_mid = "40px AGENCY"
    var font_mid = scale * 40 + "px AGENCY"
    ctx.font = "14px AGENCY"
    ctx.fillStyle = "#ffffff"





    ctx.lineWidth = 3
    var gameTime = 0
    var gameSpeed = 1
    var is_gameStop = false





    class Game {


        display = null

        display = 0
        orbitSystem = 0

        constructor(ctx, canvas) {
            this.ctx = ctx

            this.simulator = new nBody(this)

            this.canvas = canvas
            this.display = new Display(this, this.ctx)
            // this.orbitSystem = new OrbitSystem(this)
            this.animate_list = [this.simulator, this.display]
        }


        update_and_draw(deltaTime) {
            this.animate_list.forEach(
                e => {
                    e.update(deltaTime)
                    e.draw()
                }
            )
        }


    }



    class randomLab {

        constructor(game) {
            this.game = game
            this.randomWalk1d = new randomWalk1d()
            this.randomWalk2d = new randomWalk2d()
        }

        update_and_draw() {
            // this.randomWalk1d.update()
            // this.randomWalk1d.draw()

            [...[this.randomWalk1d], this.randomWalk2d].forEach(
                e => {
                    e.update()
                    e.draw()
                }
            )

        }


    }




    class nBody {



        time_step = 0
        dt = 1*0.5
        body_list = []

        body_max_track_pts = 20




        track_timer=0
        max_track_timer=1

        g=300


        draw_position = {
            x: 0,
            y: 0,
        }
        draw_range = {
            left: this.draw_position.x + 0,
            right: canvas.width * 0.9 +this.draw_position.x,
            down: this.draw_position.y +0,
            up: canvas.height * 0.9 + this.draw_position.y,
        }

        constructor(game) {
            this.ctx = game.ctx


            for (let index = 0; index < getRandomInt(1,4); index++) {
                this.body_list.push(this.get_random_body(400))
            }
            let n = getRandomInt(2,20)
            for (let index = 0; index < n; index++) {
                this.body_list.push(this.get_random_body(10))
            }


            // let big=30
            // this.body_list[0].m=big
            // this.body_list[0].r=big
        }


        draw() {


            this.body_list.forEach(
                e => {
                    this.ctx.fillStyle = e.color
                    this.ctx.strokeStyle=e.color

                    this.draw_dot(e, clamp(e.r,1,60) )
                    this.drawtrack(e)
                    this.ctx.font = font_mid
                    this.ctx.fillStyle = e.color2
                    this.ctx.fillText(e.m.toFixed(1), e.x+this.draw_position.x,e.y+this.draw_position.y)
                }
            )




        }


        drawtrack(body) {
            let ctx=this.ctx
            // ctx.strokeStyle=get_random_Color()
            ctx.lineWidth = 8
            // ctx.beginPath()
            body.position_history.forEach(
                (e, i) => {
                    if (i + 1 < body.position_history.length) {
                        ctx.moveTo(e.x+this.draw_position.x, e.y+this.draw_position.y)
                        // console.log(e[0])
                        ctx.lineTo(body.position_history[i + 1].x+this.draw_position.x, body.position_history[i + 1].y+this.draw_position.y)
                    }
                }
            )
            ctx.stroke()
        }


        draw_dot(position,size=1) {
            let width = 10*size
            let height = 10*size
            // this.ctx.fillRect(this.draw_position.x + position.x - width / 2, this.draw_position.y + position.y - height / 2, width, height)
            
            this.ctx.beginPath()
            this.ctx.arc(  position.x,  position.y, size, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.closePath()


        }




        update() {
            let n = 1
            for (let index = 0; index < n; index++) {
                this.update_single()
            }
        }


        update_single() {
            this.time_step += 1

            let f={
                fx:0,
                fy:0,
                fz:0,
            }

            this.body_list.forEach(
                e => {

                    let gap=20
                    if (e.x-gap < this.draw_range.left || e.x+gap > this.draw_range.right) {
                        e.vx = e.vx * -0.8
                    }
                    if (e.y-gap < this.draw_range.down || e.y+gap > this.draw_range.up) {
                        e.vy = e.vy * -0.8
                    }
                    // e.x=e.x % (this.draw_range.left-this.draw_range.right)
                    // e.y=e.y % (this.draw_range.down-this.draw_range.up)


                    f=this.get_gravity_from_other(e,this.body_list)

                    e.vx+=f.fx/e.m *this.dt
                    e.vy+=f.fy/e.m *this.dt

                    e.x += e.vx * this.dt
                    e.y += e.vy * this.dt


                    e.track_timer+=1

                    if (e.track_timer>this.max_track_timer){

                        e.position_history.push({x:e.x,y:e.y} )
                        e.track_timer=0
                        if (e.position_history.length>e.body_max_track_pts){ e.position_history.shift()}

                    }
                    


                }

                )
        


        }


        get_gravity_from_other(body1,body_list){

            let f={
                fx:0,
                fy:0,
                fz:0,
            }

            let temp_f={
                fx:0,
                fy:0,
                fz:0,
            }

            body_list.forEach(
                e=>{
                    if (e!=body1){

                        temp_f=this.get_gravity(e,body1)
                        f.fx+=temp_f.fx
                        f.fy+=temp_f.fy
                        f.fz+=temp_f.fz

                    }
                }
            )

            return f

        }

        get_gravity(body1, body2) {

            let dx=body1.x-body2.x
            let dy=body1.y-body2.y
            let dz=body1.z-body2.z

            let g= this.g

            let dl2=dx*dx+dy*dy+dz*dz
            let dl3=Math.pow(dl2,1.5)


            let m1m2=body1.m*body2.m * g

            if (dl2<100*100){ m1m2*=-0.05}

            return {
                fx:dx/dl3*m1m2,
                fy:dy/dl3*m1m2,
                fz:dz/dl3*m1m2,
            }



        }

        get_random_body(mass=10) {
            let m0 = mass

            let m = Math.random() * m0
            let r = m

            let l0 = 500
            let v0 = 5
            return {
                x: (Math.random() - 0.0) * (this.draw_range.right*0.9-this.draw_range.left),
                y: (Math.random() - 0.0) * (this.draw_range.up*0.9-this.draw_range.down),
                z: 0,
                vx: (Math.random()-0.5)*2 * v0,
                vy: (Math.random()-0.5)*2 * v0,
                vz: 0,
                m: m,
                r: r,
                color: get_random_Color(),
                color2: get_random_Color(),
                position_history: [],
                body_max_track_pts: getRandomInt(15,150),
                track_timer:0,
            }



        }




    }



    class Display {


        game = null
        color = get_random_Color()
        position = {
            x: canvas.width * 0.05,
            y: canvas.height * 0.05,
        }
        dataManager_position = {
            x: canvas.width * 0.17,
            y: canvas.height * 0.05
        }
        data = {
            v1: 0,
            v2: 0,
            v3: 0,
            v4: 0,
            v5: 0,
            v6: 0,
        }
        sideBar_data_name = [
            "v1",
            "v2",
            "v3",
            "v4",
            "v5",
            "v6",
        ]


        dataManager_data_name = [
            "v1",
            "v2",
            "v3",
            "v4",
            "v5",
            "v6",
        ]

        max_timer = 30
        timer = this.max_timer - 1
        data_managers = []

        constructor(game, ctx) {
            this.game = game
            this.ctx = ctx
            this.ctx_sideBar = ctx
            this.dataManager_data_name.forEach(
                (e, i) => {
                    this.data_managers.push(new DataManager(this.ctx,
                        this.dataManager_position.x,
                        this.dataManager_position.y + i * canvas.height / 10
                        , canvas.width / 10
                        , canvas.height / 15
                    ))
                }
            )
        }

        draw() {

            this.draw_sideBar()
            this.draw_dataManager()

            // if (this.timer == 0) { this.draw_dataManager() }

        }

        update(deltaTime) {

            let data_source = this.game.simulator

            let i=0
            for (var key in this.data){
                if (i>data_source.body_list.length){break}
                let vx=data_source.body_list[i].vx
                let vy=data_source.body_list[i].vy
                this.data[key]=Math.pow(vx*vx+vy*vy,0.5).toFixed(2)
                i+=1
            }



            if (this.timer < this.max_timer) {
                this.timer += 1
            }
            else {
                this.timer = 0
            }

        }

        fix_digital(d, j) {
            let res = Array.from(d)
            res.forEach(
                (e, i) => {
                    res[i] = e.toFixed(j)
                }
            )
            return res
        }


        draw_sideBar() {

            let marginY = this.game.canvas.height / 50
            let width = this.game.canvas.width / 10
            let height = this.game.canvas.height / 15
            this.ctx.lineWidth = 1 * scale
            let x = this.position.x
            let y = this.position.y
            let font_mid = height / 5 + "px AGENCY"
            let font_big = height / 1.8 + "px AGENCY"
            this.sideBar_data_name.forEach(
                dataName => {

                    this.ctx.strokeStyle = this.color
                    this.ctx.fillStyle = this.color
                    this.ctx.font = font_mid
                    this.ctx.strokeRect(x, y, width, height)
                    this.ctx_sideBar.fillText(dataName, x + width / 20, y + height * 0.95)
                    this.ctx_sideBar.font = font_big
                    this.ctx_sideBar.fillText(this.data[dataName], x + width / 4.5, y + height / 1.5)
                    y += marginY + height
                }

            )

            this.ctx.font = font_icon
            this.ctx.fillText("Z", x, y + marginY + height)
            this.ctx.stroke()

        }


        draw_dataManager() {

            if (this.data_managers.length == 0) {
                return
            }
            this.data_managers.forEach(
                (e, i) => {
                    e.y_list.push(this.data[this.dataManager_data_name[i]])
                    e.title = this.dataManager_data_name[i]
                    e.update()
                    e.draw()
                }
            )
        }


    }




    class DataManager {

        x_list = []
        y_list = []
        y_value_max = 20

        max_point_number = 40

        title = ""
        x_title = ""
        y_title = ""
        color = get_random_Color()



        constructor(ctx, x, y, width, height) {
            this.ctx = ctx
            this.ctx.font = font_mid
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.ctx.lineWidth = 4

        }


        update() {
            if (this.y_list.length > this.max_point_number) {
                this.y_list.shift()
            }
        }

        draw() {

            let marginX = this.width * 0.1
            let marginY = this.height * 0.1
            let begin_x = this.x + marginX
            let begin_y = this.y + this.height * 0.9
            let cur_x = 0
            let cur_y = 0
            let font_mid = this.height / 5 + "px AGENCY"

            // this.ctx.clearRect(this.x, this.y, this.width, this.height)
            this.ctx.fillStyle = this.color
            this.ctx.strokeStyle = this.color
            this.ctx.strokeRect(this.x, this.y, this.width, this.height)
            this.ctx.font = font_mid

            this.ctx.fillText(this.title, this.x + this.width * 0.05, this.y + this.height * 0.95)
            this.ctx.fillText("Max " + (this.y_value_max / 1.4).toFixed(1), this.x + this.width * 0.05, this.y + this.height * 0.3)

            let new_y_max = 1

            this.y_list.forEach(
                (e, i) => {
                    cur_x = begin_x + i * this.width / this.max_point_number * 0.9
                    cur_y = begin_y - e / this.y_value_max * this.height
                    this.ctx.beginPath()
                    this.ctx.arc(cur_x, cur_y, 2, 0, 2 * Math.PI)
                    this.ctx.fill()
                    this.ctx.closePath()

                    if (i < this.y_list.length) {
                        let next_x = begin_x + (i + 1) * this.width / this.max_point_number * 0.9
                        let next_y = begin_y - this.y_list[i + 1] / this.y_value_max * this.height

                        if (next_y < this.y + this.height * 0.4) {
                            new_y_max = this.y_list[i + 1] * 1.4
                        }

                        this.ctx.moveTo(cur_x, cur_y)
                        this.ctx.lineTo(next_x, next_y)
                        this.ctx.stroke()
                    }


                }
            )
            if (this.y_value_max < new_y_max) {
                this.y_value_max = new_y_max
            }
        }


    }








    let last_time = 0

    var game = new Game(ctx, canvas)




    var requestAnimateId = null
    function handle_stop_bnt() {
        is_gameStop = !is_gameStop
        if (is_gameStop == false) {
            animate(last_time)
        }
        else {
            cancelAnimationFrame(requestAnimateId)
            last_time = 0
        }
    }


    var DELTA_TIME = 300
    function animate(timeStamp) {

        requestAnimateId = requestAnimationFrame(animate)
        let deltaTime = timeStamp - last_time
        last_time = timeStamp
        if (deltaTime > DELTA_TIME) {
            return
        }
        gameTime += deltaTime
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update_and_draw(deltaTime / 1000)
    }




    animate(0)

    return canvas

}







