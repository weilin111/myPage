

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

add_game_canvas_to_container("canva_container")

function add_game_canvas_to_container(container_id) {




    let canvas_container = document.getElementById("canva_container")
    var canvas = document.createElement("canvas")
    canvas_container.appendChild(canvas)

    let scale = canvas_container.offsetWidth / 1600 

    var unit = 500 * scale * 0.8

    let width = 1600
    let height = 900

    canvas.style.width = (width * scale) + 'px'
    canvas.style.height = (height * scale) + 'px'


    var scale_factor=1.5
    scale = scale * window.devicePixelRatio *scale_factor
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


    var canvasInfo = {
        scale: 1,
        scale_step: 0.1,
        max_scale: 3,
        min_scale: 0.1,
        offsetX: 0,
        offsetY: 0,
    }
    


    class Game {


        display = null

        display = 0
        orbitSystem = 0
        effect_list = []
        fps=0

        constructor(ctx, canvas) {
            this.ctx = ctx

            this.simulator = new funCurveLab(this)

            this.canvas = canvas
            this.display = new Display(this, this.ctx)
            this.input=new Input(this,canvas)
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
            this.effect_list.forEach(
                e => {
                    e.update()
                    e.draw()
                }
            )
            this.effect_list = this.effect_list.filter(
                e => {
                    return e.frame >= 0
                }
            )
        this.fps = (1000 / deltaTime/1000).toFixed(0)

        }
        





    }







    class funCurveLab {

        draw_position = {
            x: canvas.width * 0.25,
            y: canvas.width * 0.05,
        }
        draw_range = {
            left: this.draw_position.x + 0,
            right: this.draw_position.x +canvas.width * 0.9,
            down: this.draw_position.y + 0,
            up:this.draw_position.y + canvas.height * 0.9,
        }

        graph_list=[]

        n_col=getRandomInt(2,14)
        n_row=getRandomInt(6,14)
        
        cell_width=(this.draw_range.right-this.draw_range.left)/(this.n_col+1)
        cell_height=(this.draw_range.up-this.draw_range.down)/(this.n_row+1)

        cell_width=Math.min(this.cell_width,this.cell_height)
        cell_height=Math.min(this.cell_width,this.cell_height)

        constructor(game) {
            this.ctx = game.ctx
            this.game = game



            for (let i = 0; i < this.n_row; i++) {
                for (let j = 0; j < this.n_col; j++) {

                    let draw_info={
                        x:this.draw_position.x+this.cell_width*j,
                        y:this.draw_position.y+this.cell_height*i,
                        width:this.cell_width,
                        height:this.cell_height,
                    }

                    let function_info={k:j+1,n:i+1}
                    this.graph_list.push(
                        new polarCoorGraph(draw_info,function_info  )
                    )
                }
            }


        }


        draw() {


            this.graph_list.forEach(
                e=>{
                    e.draw()
                }
            )

        }


        update(deltaTime) {
            let n = 1
            for (let index = 0; index < n; index++) {
                this.update_single(deltaTime)
            }
        }


        update_single(deltaTime) {
            
            this.graph_list.forEach(
                e=>{
                    e.update()
                }
            )


        }

    }






    class polarCoorGraph{

        draw_info={
            x:0,
            y:0,
            width:100,
            height:100
        }

        dot_phase=0  
        dot_phase_speed=Math.PI*2*0.01
        max_theta=Math.PI*2 * 3

        data_point_number=150
        data_point_list=[]  
        color=get_random_Color()
        color2=get_random_Color()

        constructor(draw_info,function_info){
            this.draw_info=draw_info
            this.function_info=function_info

            this.x0=draw_info.x+draw_info.width/2
            this.y0=draw_info.y+draw_info.height/2

            if( function_info.k>4 ){
                // this.max_theta=Math.PI*2 * 8
                this.data_point_number=300
                }
    
            if(function_info.n>3  ){
            this.max_theta=Math.PI*2 * 8
            this.data_point_number=300
            }


            for (let index = 0; index < this.data_point_number; index++) {

                let theta= this.max_theta  * index/this.data_point_number
                this.data_point_list.push( this.curve_function(theta)  )
            }

            // console.log(this.data_point_list)
        }

        curve_function(theta){
            let {k,n}=this.function_info
            let r= this.draw_info.width/2 * Math.cos( k/n * theta )

            // return  this.polar2xy( r,Math.pow(theta,1) )
            return  this.polar2xy( r,theta )
        }

        polar2xy(r,theta){
            let x=r*Math.cos(theta)
            let y=r*Math.sin(theta)
            return { x:x,y:y } 
        }

        update(){
            this.dot_phase+=this.dot_phase_speed
        }

        draw(){
            
            ctx.strokeStyle=this.color
            ctx.lineWidth = 4
            // ctx.beginPath()
            this.data_point_list.forEach(
                (e, i) => {
                    if (i + 1 < this.data_point_list.length) {
                        ctx.moveTo(e.x+this.x0, e.y+this.y0)
                        ctx.lineTo(this.data_point_list[i + 1].x+this.x0, this.data_point_list[i + 1].y+this.y0)
                    }
                }
            )
            // ctx.closePath()
            ctx.stroke()

            ctx.fillStyle=this.color
            ctx.fillText(`${this.function_info.k}/${this.function_info.n}`, this.draw_info.x,this.draw_info.y )


            ctx.fillStyle=this.color2
            let {x,y}=this.curve_function(this.dot_phase)
            ctx.beginPath()
            ctx.arc(x+this.x0, y+this.y0, 8, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()

        }

        
    }



    class Input {


        constructor(game, canvas) {
            this.game = game
            this.canvas = canvas
            this.add_listener(this.game, this)
        }

        offsetX = 0
        offsetY = 0



        add_listener(game, input) {
            window.addEventListener("keypress",
                e => {
                    // console.log(e, e.keyCode)
                    switch (e.keyCode) {
                        case 100:
                        case 68:
                            break;
                        case 97:
                        case 65:
                            break;
                        case 115:
                        case 83:
                            break;
                        case 119:
                        case 87:
                            break;
                        case 69:
                            break;

                        default:
                            break;
                    }



                })

            window.addEventListener("keydown",
                e => {
                    // console.log(e, e.keyCode)
                    console.log(e.keyCode)
                    switch (e.keyCode) {

                        case 70:
                            break;
                        case 69:
                            break;

                        case 82:
                            break;


                        default:
                            break;
                    }



                })

            



            this.canvas.addEventListener("click", function (event) {

                input.offsetX = event.offsetX
                input.offsetY = event.offsetY
                // input.add_bullet_then_emit(player, event)
            })
            this.canvas.addEventListener("mousemove", function (event) {

                input.offsetX = event.offsetX
                input.offsetY = event.offsetY
            })


            this.canvas.addEventListener("wheel",
            e => {
                e.preventDefault()
                
                let realPosition = {
                    x: e.offsetX*2 - canvasInfo.offsetX,
                    y: e.offsetY*2 - canvasInfo.offsetY
                }

                let { scale_step } = canvasInfo

                let dx = realPosition.x / canvasInfo.scale * scale_step  
                let dy = realPosition.y / canvasInfo.scale * scale_step  

                if (e.wheelDelta > 0) {
                    canvasInfo.offsetX -= dx
                    canvasInfo.offsetY -= dy

                    canvasInfo.scale += scale_step
                }
                else {
                    canvasInfo.offsetX += dx
                    canvasInfo.offsetY += dy
                    // canvasInfo.offsetX = 0
                    // canvasInfo.offsetY = 0

                    canvasInfo.scale -= scale_step
                }

                if(canvasInfo.scale<0){
                    canvasInfo = {
                        scale: 1,
                        scale_step: 0.1,
                        max_scale: 3,
                        min_scale: 0.1,
                        offsetX: 0,
                        offsetY: 0,
                    }
                }

            }
        )


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
            x: canvas.width * 0.12,
            y: canvas.height * 0.05
        }
        data = {
            bullets_number: 0,
            storage: 0,
            player_rotation: 0,
            fps: 0,
            mouse_X: 0,
            mouse_Y: 0,
        }
        sideBar_data_name = [
            "fps",
            "mouse_X",
            "mouse_Y",
        ]


        dataManager_data_name = [
            "storage",
            "mouse_X",
            "mouse_Y",
            "fps",

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

            this.data.mouse_X = this.game.input.offsetX
            this.data.mouse_Y = this.game.input.offsetY
            this.data.fps = this.game.fps
            this.data.storage = (window.performance.memory.usedJSHeapSize / 1000000).toFixed(1)


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
            let width = this.game.canvas.width / 15
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




    class EffectElement {
        color = get_random_Color()
        position = [0, 0]
        direction = random_direction()
        radius = 5 + 5 * Math.random()
        speed = 0.5 + 1 * Math.random()
        constructor(position) {
            this.position = Array.from(position)
        }
    
        update() {
            this.position[0] += this.direction[0] * this.speed
            this.position[1] += this.direction[1] * this.speed
            if (this.radius > 0.1) { this.radius -= 0.1 }
        }
    
    }
    
    
    
    class Effect {
    
        elements = []
        last_time = 0
        life = 500   //   500 ms
        elementNumber = 5 + 5 * Math.random().toFixed(0)
        frame = 60 + 20 * Math.random()
    
        constructor(ctx, position) {
            this.ctx = ctx
            // console.log(position)
            for (let i = 0; i < this.elementNumber; i++) {
                this.elements.push(new EffectElement(position))
            }
    
        }
    
        update() {
            this.elements.forEach(
                e => {
                    e.update()
                    // e.radius=0.5*(1+ this.frame/50 )*e.radius
                }
            )
            this.frame -= 1
    
        }
    
        draw() {
            this.elements.forEach(
                e => {
                    ctx.fillStyle = e.color
                    // ctx.fillRect(e.position[0],e.position[1],50,50)
                    ctx.beginPath()
                    ctx.arc(e.position[0], e.position[1], e.radius, 0 * Math.PI, 2 * Math.PI)
                    ctx.fill()
                    ctx.closePath()
    
    
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
    
        ctx.setTransform(canvasInfo.scale, 0, 0, canvasInfo.scale, canvasInfo.offsetX, canvasInfo.offsetY)

        game.update_and_draw(deltaTime / 1000)
    }




    animate(0)

    return canvas

}







