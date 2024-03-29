

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

            this.simulator = new emField(this)

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





    class emField {


        draw_position = {
            x: 100,
            y: 100,
        }
        draw_range = {
            left: this.draw_position.x + 0,
            right: canvas.width * 0.9,
            down: this.draw_position.y + 0,
            up: canvas.height * 0.9,
        }


        dt=1*0.3

        field_probe_list = []
        field_source_list = []

        k=1000

        max_E_field=0

        constructor(game) {
            this.ctx = game.ctx

            this.draw_range.x_mid=(this.draw_range.right - this.draw_range.left)/2
            this.draw_range.y_mid=(this.draw_range.up - this.draw_range.down)/2

            
            let n_E_source=getRandomInt(5,25)
            for (let index = 0; index < n_E_source; index++) {
                this.field_source_list.push(this.get_random_E_field_source())
            }


            let n_row = getRandomInt(10,25)
            let n_col = getRandomInt(10,25)
            let gird_length_row= (this.draw_range.up - this.draw_range.down) / n_row
            let gird_length_col= (this.draw_range.right - this.draw_range.left) / n_col

            for (let i = 0; i < n_row; i++) {
                for (let j = 0; j < n_col; j++) {
                    this.field_probe_list.push(
                        {
                            x:this.draw_range.left+gird_length_col*j,
                            y:this.draw_range.down+gird_length_row*i,
                            z:0,
                            ex:0,
                            ey:0,
                            ez:0,
                            e_strength:0,
                            q:1,
                            r:5,
                            angle:0,
                            color:get_random_Color()
                        }
                    )

                }
            }




        }


        draw() {


            this.field_source_list.forEach(
                e => {
                    this.ctx.fillStyle=e.color
                    this.draw_dot(e, e.r)
                    this.ctx.fillStyle=e.color2
                    this.ctx.font= e.r *2 + "px AGENCY"
                    let text=e.q.toFixed(2)
                    this.ctx.fillText(  text ,e.x,e.y)

                }
            )

            this.ctx.lineWidth=3.5*scale
            this.field_probe_list.forEach(
                e => {
                    this.ctx.fillStyle=e.color
                    this.ctx.strokeStyle=e.color
                    this.draw_field_probe(e)
                    let text=e.e_strength.toFixed(2)
                    this.ctx.font= e.r *5 + "px AGENCY"
                    this.ctx.fillText(  text ,e.x,e.y)
                }
            )


        }


        draw_field_probe(probe) {
            
            let width = 10 * probe.r
            let height = 10 * probe.r
            // this.ctx.fillRect(this.draw_position.x + position.x - width / 2, this.draw_position.y + position.y - height / 2, width, height)

            this.ctx.beginPath()
            this.ctx.arc(  probe.x,  probe.y, probe.r, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.closePath()

            this.ctx.beginPath()
            ctx.moveTo(probe.x,probe.y)

            let draw_E_size=10

            let dl=clamp(probe.e_strength,1.5,5)
            
            let dx=probe.ex/probe.e_strength*draw_E_size*dl
            let dy=probe.ey/probe.e_strength*draw_E_size*dl
            


            this.ctx.lineTo(probe.x+dx , probe.y+dy)

            this.ctx.closePath()
            this.ctx.stroke()

        }


        draw_dot(position, size = 1) {
            let width = 10 * size
            let height = 10 * size
            // this.ctx.fillRect(this.draw_position.x + position.x - width / 2, this.draw_position.y + position.y - height / 2, width, height)

            this.ctx.beginPath()
            this.ctx.arc(  position.x,   position.y, size, 0, 2 * Math.PI)
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

            let temp_E={
                fx:0,
                fy:0,
                fz:0,
            }
            let a=0
            let a_max=250

            this.field_probe_list.forEach(
                e=>{
                    temp_E=this.get_E_force_from_source(e,this.field_source_list)
                    e.ex=temp_E.fx/e.q
                    e.ey=temp_E.fy/e.q
                    e.ez=temp_E.fz/e.q

                    e.e_strength=Math.pow(e.ex*e.ex+e.ey*e.ey,0.5)

                    this.max_E_field=Math.max(this.max_E_field,e.e_strength)
                    a=(this.max_E_field-e.e_strength)/this.max_E_field 
                    a=Math.pow(a,6) *a_max
                    e.color=`hsl(${a},100%,50%)`
                }
            )


            let f={
                fx:0,
                fy:0,
                fz:0,
            }


            this.field_source_list.forEach(
                e=>{

                    let gap=100
                    if (e.x-gap < this.draw_range.left || e.x+gap > this.draw_range.right) {
                        e.vx = e.vx * -0.9
                    }
                    if (e.y-gap < this.draw_range.down || e.y+gap > this.draw_range.up) {
                        e.vy = e.vy * -0.9
                    }

                    
                    f=this.get_E_force_from_source(e,this.field_source_list)

                    e.vx+=f.fx/e.q *this.dt
                    e.vy+=f.fy/e.q *this.dt

                    e.x += e.vx * this.dt
                    e.y += e.vy * this.dt




                }
            )



        }


        get_E_force_from_source(body,source_list){
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

            source_list.forEach(
                e=>{
                    if (e!=body){

                        temp_f=this.get_E_force(e,body)
                        f.fx+=temp_f.fx
                        f.fy+=temp_f.fy
                        f.fz+=temp_f.fz

                    }
                }
            )

            return f

        }


        get_random_E_field_source() {

            let q0 = 50
            let q = (Math.random()-0.5)*2 * q0
            let r = Math.abs(q)

            let v0 = 5

            return {
                x: (Math.random() - 0.0) * (this.draw_range.right*0.9-this.draw_range.left)+this.draw_position.x,
                y: (Math.random() - 0.0) * (this.draw_range.up*0.9-this.draw_range.down)+this.draw_position.y,
                z: 0,
                vx: (Math.random() - 0.5) * 2 * v0,
                vy: (Math.random() - 0.5) * 2 * v0,
                vz: 0,
                q: q,
                r: r,
                color:get_random_Color(),
                color2:get_random_Color(),
            }
        }

        get_E_force(body1, body2) {

            let dx=body1.x-body2.x
            let dy=body1.y-body2.y
            let dz=body1.z-body2.z

            let k= this.k

            let dl2=dx*dx+dy*dy+dz*dz
            let min_dl2=50*50
            if (dl2<min_dl2){ dl2=min_dl2}

            let dl3=Math.pow(dl2,1.5)


            let q1q2=body1.q*body2.q * k

            // if (dl2<50*50){ q1q2*=0}

            return {
                fx:dx/dl3*q1q2,
                fy:dy/dl3*q1q2,
                fz:dz/dl3*q1q2,
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
            e_01: 0,
            e_02: 0,
            e_03: 0,
            e_04: 0,
            e_05: 0,
            e_06: 0,
            e_07: 0,
            e_08: 0,
        }
        sideBar_data_name = [
            "e_01",
            "e_02",
            "e_03",
            "e_04",
            "e_05",
            "e_06",
            "e_07",
            "e_08",
        ]


        dataManager_data_name = [
            "e_01",
            "e_02",
            "e_03",
            "e_04",
            "e_05",
            "e_06",
            "e_07",
            "e_08",
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

            this.simualtor_probe_data_index_list=[]
            for (var key in this.data){
                this.simualtor_probe_data_index_list.push( getRandomInt(0, this.game.simulator.field_probe_list.length-1 )  )
            }
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
                if (i>data_source.field_probe_list.length){break}
                let index= this.simualtor_probe_data_index_list[i]
                this.data[key]=data_source.field_probe_list[index].e_strength.toFixed(2)
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







