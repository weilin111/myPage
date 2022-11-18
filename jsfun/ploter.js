


add_game_canvas_to_container("canva_container")

function add_game_canvas_to_container(container_id) {

    let canvas_container = document.getElementById("canva_container")
    var canvas = document.createElement("canvas")
    canvas_container.appendChild(canvas)

    console.log(window.devicePixelRatio)



    let scale = canvas_container.offsetWidth / 1600 


    
    canvas.style.width = (1600 * scale) +'px'
    canvas.style.height = (800 * scale) +'px'

    
    scale=scale*window.devicePixelRatio
    canvas.width = 1600 * scale 
    canvas.height = 800 * scale

    

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


    class Game {

        display = 0
        orbitSystem = 0
        constructor(ctx, canvas) {
            this.ctx = ctx
            this.canvas = canvas
            this.display = new Display(this, this.ctx)
            this.plot= new Plot(this,ctx)

            this.ploter=new Ploter(this,ctx)

            this.animate_list = [this.ploter]
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

    class Ploter{

        plot_list=[]
        constructor(game,ctx){

            this.game=game
            this.ctx=ctx


            let plot_func_list=[
                (e)=>{return Math.sin(e)},
                (e)=>{return Math.cos(e)},
                (e)=>{return Math.cos(e*e)},
                (e)=>{return Math.sin(e*e*e)},

                (e)=>{return e+Math.sin(e*e)},
                (e)=>{return e+Math.cos(e*e)},
                (e)=>{return e+Math.sin(e*e*e)},
                (e)=>{return e+Math.sin(e*e*e*e)},

                (e)=>{return e*e+e*e*Math.sin(e)},
                (e)=>{return e*e+e*e*Math.cos(e)},
                (e)=>{return e*e+e*e*Math.cos(e*e)},
                (e)=>{return e*e+e*e*Math.sin(e*e*e)},

                (e)=>{return e-e*Math.sin(e)},
                (e)=>{return e*e-e*e*Math.sin(e*e)},
                (e)=>{return Math.pow(e,3)-Math.pow(e,3)*Math.sin(Math.pow(e,3))},
                (e)=>{return Math.pow(e,4)-Math.pow(e,4)*Math.sin(Math.pow(e,4))},
            ]
            
            let row_number=4
            let width=Math.max(0.1,0.7/row_number)
            let padding_x=0.05/row_number
            let height=Math.min(0.12,0.6/(plot_func_list.length/row_number))
            // let height=0.15
            let padding_y=0.05/(plot_func_list.length/row_number)

            for (let index = 0; index < plot_func_list.length; index++) {
                this.plot_list.push(
                    new Plot(game,ctx,
                        {
                        x:(0.1+(padding_x+width)* (index%row_number)   )*canvas.width,
                        y:(0.3+(padding_y+height)*Math.floor(index/row_number)  )*canvas.height
                    },
                    {
                        width:canvas.width*width,
                        height:canvas.height*height,
                        dot_size:canvas.width/400,
                    },
                    plot_func_list[index]
                    )
                )

            }
            console.log(this.plot_list)
        }

        update(deltaTime){
            this.plot_list.forEach(
                e=>{
                    e.update(deltaTime)
                }
                )
        }

        draw(){
            this.plot_list.forEach(
                e=>{
                    e.draw()
                }
                )
        }

    }

    class Plot{

        // map x and y  0 ,1

        draw_padding_left_top=0.1
        draw_position={
            x:this.draw_padding_left_top*canvas.width,
            y:(1-this.draw_padding_left_top)*canvas.height,
        }
        size={
            width:canvas.width*0.7,
            height:canvas.height*0.7,
            dot_size:canvas.width/400*this.size,
        }
        
        max_point_number=10
        point_list=[
            {
                text:"",
                x:0,
                y:0,
            }
        ]
        color=get_random_Color()
        color_2=get_random_Color()

        plot_func=(e)=>{return e-e*Math.sin(e*e)}
        // plot_func=(e)=>{return Math.sin(e)}

        anotation_text=[
            {
                text:"",
                scaled_x:0,
                scaled_y:0.9,
            }
        ]


        constructor(game,ctx,draw_position=undefined,size=undefined,plot_func=undefined){
            this.ctx=ctx
            this.plot_fun_type_1()
            
            if(draw_position!=undefined){
                this.draw_position=draw_position
            }
            if(size!=undefined){
                this.size=size
            }
            if(plot_func!= undefined)
            {
                this.plot_func=plot_func
            }

            this.anotation_text.push(
                {
                    text:String(this.plot_func),
                    scaled_x:0,
                    scaled_y:0.75,
                }
            )
            
        }

        plot_fun_type_1(){
            let x=this.linspace(0,10,this.max_point_number)
            this.point_list=this.point_list.slice(0,0)
            ////////////
            x.forEach(
                e=>{
                    this.point_list.push(
                        {
                            text:"",
                            x:e,
                            y:this.plot_func(e),
                        }
                        )
                    }
                    )
            
        }



        update(deltaTime){
            this.max_point_number=this.max_point_number+deltaTime/50
            if(this.max_point_number>300){
                this.max_point_number=5
            }
            // console.log(this.max_point_number)
            this.plot_fun_type_1()
            this.anotation_text[0].text="#sample_point="+this.max_point_number.toFixed(0)

        }


        draw(){
            this.ctx.fillStyle=this.color_2
            this.ctx.strokeStyle=this.color
            this.ctx.strokeRect( this.draw_position.x,this.draw_position.y,this.size.width,-this.size.height)
            this.ctx.stroke()
            this.draw_anotation()
            
            let range=this.get_point_x_y_min_max()
            // console.log(range)
            let last_draw_x=null
            let last_draw_y=null

            this.ctx.beginPath()
            this.point_list.forEach(
                (point,i)=>{
                    let draw_x=point.x/(range.x_max-range.x_min)*this.size.width +this.draw_position.x
                    let draw_y=-(point.y-range.y_min)/(range.y_max-range.y_min)*this.size.height+this.draw_position.y
                    // console.log("11",draw_x,draw_y)
                    ctx.fillRect(draw_x-this.size.dot_size/2,draw_y-this.size.dot_size/2,this.size.dot_size,this.size.dot_size)
                    if(i!=0){
                        this.ctx.moveTo(draw_x,draw_y)
                        this.ctx.lineTo(last_draw_x,last_draw_y)
                    }
                    last_draw_x=draw_x
                    last_draw_y=draw_y
                }
            )
            this.ctx.closePath()
            ctx.stroke()

        }


        draw_axis(){

        }


        scaled_xy_2_draw_xy(scaled_xy){
            let draw_xy={
                x:0,
                y:0
            }
            // console.log(scaled_xy)
            draw_xy.x=scaled_xy.x*this.size.width +this.draw_position.x
            draw_xy.y=-scaled_xy.y*this.size.height+this.draw_position.y

            return draw_xy
        }

        draw_anotation(){
            this.ctx.font=font0
            this.anotation_text.forEach(
                e=>{
                    let draw_xy=this.scaled_xy_2_draw_xy( {x:e.scaled_x,y:e.scaled_y} )
                    ctx.fillText(e.text,  draw_xy.x,draw_xy.y )
                }
            )

        }

        linspace(min,max,num){
            let dx=(max-min)/num
            let res=[]
            for (let index = 0; index < num; index++) {
                res.push( min+dx*index )                
            }
            // console.log(res)
            return res
        }

        get_point_x_y_min_max(){
            let res={
                x_min:this.point_list[0].x,
                x_max:this.point_list[0].x,
                y_min:this.point_list[0].y,
                y_max:this.point_list[0].y,
            }
            
            this.point_list.forEach(
                e=>{
                    if(e.x<res.x_min){ res.x_min=e.x  }
                    if(e.x>res.x_max){ res.x_max=e.x  }
                    if(e.y<res.y_min){ res.y_min=e.y  }
                    if(e.y>res.y_max){ res.y_max=e.y  }
                }

                )
                
                return res

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
            GM: 1,
            Orbiter_Number: 1,
            angle_01: 0,
            omega_01: 0,
            r_01: 0,
            h_01:0,
            v_01:0,

        }
        sideBar_data_name = [
        ]



        dataManager_data_name = [

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
            this.ctx.lineWidth = 1*scale
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
            this.ctx.lineWidth = 4*scale

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
            let dot_size = this.width / 200
            let cur_x = 0
            let cur_y = 0

            // this.ctx.clearRect(this.x, this.y, this.width, this.height)
            this.ctx.fillStyle = this.color
            this.ctx.strokeStyle = this.color
            this.ctx.strokeRect(this.x, this.y, this.width, this.height)

            this.ctx.font = font0
            this.ctx.fillText(this.title, this.x + this.width * 0.05, this.y + this.height * 0.95)
            this.ctx.fillText("Max " + (this.y_value_max / 1.4).toFixed(1), this.x + this.width * 0.05, this.y + this.height * 0.3)

            let new_y_max = 1

            this.y_list.forEach(
                (e, i) => {
                    cur_x = begin_x + i * this.width / this.max_point_number * 0.9
                    cur_y = begin_y - e / this.y_value_max * this.height
                    this.ctx.beginPath()
                    this.ctx.arc(cur_x, cur_y, dot_size, 0, 2 * Math.PI)
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






    var game = new Game(ctx, canvas)


    var last_time = 0
    function animate(timeStamp) {

        let deltatime = timeStamp - last_time
        last_time = timeStamp
        // console.log(timeStamp)

        requestAnimationFrame(animate)

        // ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        game.update_and_draw(deltatime)
        // ctx.scale(window.devicePixelRatio,window.devicePixelRatio)
        // ctx.scale(1/window.devicePixelRatio,1/window.devicePixelRatio)
        // ctx.restore()
    }

    animate(0)


    return canvas

}

