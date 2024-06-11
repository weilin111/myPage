

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


    var scale_factor = 1.5
    scale = scale * window.devicePixelRatio * scale_factor
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
        scale_step: 0.02,
        max_scale: 4,
        min_scale: 0.01,
        offsetX: 0,
        offsetY: 0,
    }



    class Game {


        display = null

        display = 0
        orbitSystem = 0
        effect_list = []
        fps = 0

        is_stop = false

        constructor(ctx, canvas) {
            this.ctx = ctx

            this.simulator = new goldenPhiV2Lab(this)

            this.canvas = canvas
            this.display = new Display(this, this.ctx)
            this.input = new Input(this, canvas)

            // this.animate_list = [this.simulator, this.display]
            this.animate_list = [this.simulator]
        }


        update_and_draw(deltaTime) {



            this.animate_list.forEach(
                e => {
                    if (!this.is_stop) { e.update(deltaTime) }

                    e.draw()
                }
            )
            this.effect_list.forEach(
                e => {
                    if (!this.is_stop) { e.update() }
                    e.draw()
                }
            )


            this.effect_list = this.effect_list.filter(
                e => {
                    return e.frame >= 0
                }
            )


            this.fps = (1000 / deltaTime / 1000).toFixed(0)

        }







    }





    class goldenPhiV2Lab {

        draw_position = {
            x: canvas.width * 0.25,
            y: canvas.width * 0.05,
        }
        draw_range = {
            left: this.draw_position.x + 0,
            right: this.draw_position.x + canvas.width * 0.9,
            down: this.draw_position.y + 0,
            up: this.draw_position.y + canvas.height * 0.9,
        }

        graph_list = []


        constructor(game) {
            this.ctx = game.ctx
            this.game = game

            this.graph_list.push(new GotoPhiCurve())
            this.graph_list.push(new steinerChain())
            this.graph_list.push(new fieldGraph())

        }


        draw() {


            this.graph_list.forEach(
                e => {
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
                e => {
                    e.update()
                }
            )


        }

    }


    class GotoPhiCurve{

        width = canvas.width * 0.5
        draw_info = {
            x: canvas.width * 0.25,
            y: canvas.height * 0.1,
            width: this.width,
            height: this.width * 0.618,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()

        element_list=[]

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}
            

            let n=getRandomInt(5,20)*2

            for (let i = 0; i < n; i++) {
                
                let w=this.draw_info.width/(n+1)
                let h=this.draw_info.height*0.75
                let draw_info={
                    x: this.draw_info.x+w*0.1+ i*w,
                    y: this.draw_info.y+h*0.1,
                    width: w,
                    height: h,
                }
                let element=new GotoPhiElement(draw_info)
                element.k=Math.pow(5,0.5)/2-1/2+ (i-n/2)*0.02
                this.element_list.push( element)

                
            }

        
        }


        draw(){
            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )


            this.element_list.forEach(
                e=>{
                    e.draw()
                }
            )
        }


        update(){

            this.element_list.forEach(
                e=>{
                    e.update()
                }
            )
        }





    }

    class GotoPhiElement{


        width = canvas.width * 0.1
        draw_info = {
            x: canvas.width * 0.5,
            y: canvas.height * 0.10,
            width: this.width,
            height: this.width * 1.618,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()
        color3=get_random_Color()

        k=0.618
        tolerance=1e-5

        cur_pq={p:1,q:1}
        
        pq_list=[this.cur_pq]

        max_step_num=1500

        update_timer=0
        update_timer_max=1


        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}
            

        }


        draw(){
            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )

            ctx.fillStyle=this.color2
            let pq=this.pq_list[this.pq_list.length-1]



            let draw_k=0.61803
            ctx.fillStyle=this.color
            ctx.fillRect(this.draw_info.x,this.draw_info.y+this.draw_info.height*draw_k,
                this.draw_info.width*0.61803,
                this.draw_info.height*(1-draw_k)* this.pq_list.length/ this.max_step_num  )
            



            this.pq_list.forEach(
                (pq,index)=>{

                    let x0=this.draw_info.x 
                    let x1=this.draw_info.x+this.draw_info.width 
                    ctx.lineWidth = 3
                    let ratio=(index+1)/this.pq_list.length
                    let a=Math.pow(ratio,0.5) *360
                    ctx.strokeStyle=`hsl(${a},100%,50%)`
                    let y=this.draw_info.y+this.draw_info.height*draw_k*pq.p/pq.q
                    ctx.beginPath()
                    ctx.moveTo(x0, y)
                    ctx.lineTo(x1, y)
                    ctx.closePath()
                    ctx.stroke()


                }
            )

            ctx.save()
            ctx.translate(this.draw_info.x, this.draw_info.y)
            ctx.rotate(Math.PI*0.5)

            ctx.translate(this.draw_info.x*-1, this.draw_info.y*-1)
            
            ctx.font= this.draw_info.width / 2 + "px AGENCY"
            ctx.fillStyle=this.color3
            ctx.fillText(`k=${this.k.toFixed(3)}  p/q=${pq.p}/${pq.q}=${(pq.p/pq.q).toFixed(3)} n=${this.pq_list.length} `,
            this.draw_info.x
            ,this.draw_info.y
            )
            ctx.restore()

        }

        step(){
            if(this.pq_list.length<this.max_step_num){

                

                let pq=this.pq_list[this.pq_list.length-1]
                let ratio=this.k

                if(Math.abs(pq.p/pq.q-ratio)<this.tolerance ){return}

                let next_p_1=pq.p+1
                let next_q_1=pq.q
                let next_p_2=pq.p
                let next_q_2=pq.q+1


                let distance=Math.abs(next_p_1/next_q_1-ratio) -Math.abs(next_p_2/next_q_2-ratio)
                let next_pq={p:1,q:1}
                if (distance>0){
                    next_pq.p=next_p_2
                    next_pq.q=next_q_2
                }
                else{
                    next_pq.p=next_p_1
                    next_pq.q=next_q_1
                }
                this.pq_list.push(next_pq)
            }
        }

        update(){

            this.update_timer+=1
            if (this.update_timer>this.update_timer_max){

                this.step()
                this.update_timer=0

            }
        }






    }

    class steinerChain{

        width = canvas.width * 0.3
        draw_info = {
            x: canvas.width * 0.35,
            y: canvas.height * 0.6,
            width: this.width,
            height: this.width * 0.618,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()

        circle_a={x:this.draw_info.x+this.draw_info.width/2,
                  y:this.draw_info.y+this.draw_info.height/2,
                  r:this.draw_info.height/2,
                  color:get_random_Color(),
                }
        circle_b={x:this.draw_info.x+this.draw_info.width/2,
        y:this.draw_info.y+this.draw_info.height/2,
        r:this.draw_info.height/2*0.9*Math.random(),
        color:get_random_Color(),

        }

        circle_d={x:this.draw_info.x+this.draw_info.width/2 + this.draw_info.width*0.3,
            y:this.draw_info.y+this.draw_info.height/2,
            r:this.draw_info.height/2*(1+1.5*Math.random()),
            color:get_random_Color(),

         }


        circle_c_list=[]
        c_list_angle=0
        circle_c_number=getRandomInt(6,25)
        
         
        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}

            let n=this.circle_c_number
            let r_c=(this.circle_b.r+this.circle_a.r)/2
            for (let i = 0; i < n; i++) {
                
                let r=(this.circle_a.r-this.circle_b.r)/2
                let x=this.circle_a.x + r_c*Math.cos( i/n*2*Math.PI +this.c_list_angle )
                let y=this.circle_a.y + r_c*Math.sin( i/n*2*Math.PI +this.c_list_angle )

                this.circle_c_list.push(
                    {x:x,
                    y:y,
                    r:r,
                    color:get_random_Color(),
                }
                )
            }

        }


        draw(){
            ctx.lineWidth = 8

            // ctx.strokeStyle = this.color
            // ctx.strokeRect(this.draw_info.x,
            //     this.draw_info.y,
            //     this.draw_info.width,
            //     this.draw_info.height
            // )

            let circle_to_draw=[this.circle_a,this.circle_b,this.circle_d]

            circle_to_draw.forEach(
                e=>{
                    ctx.strokeStyle=e.color
                    this.draw_circle(e)
                    this.map_circle_and_draw(e)
                }
            )

            this.circle_c_list.forEach(
                e=>{
                    ctx.strokeStyle=e.color
                    this.draw_circle(e)
                    this.map_circle_and_draw(e)
                }
            )
            
        }


        map_circle_and_draw(circle){

            let n=48
            let xy_list=[]
            
            for (let i = 0; i < n; i++) {

                let x=circle.x + circle.r*Math.cos( i/n*2*Math.PI  )
                let y=circle.y + circle.r*Math.sin( i/n*2*Math.PI  )

                

                let x_d=this.circle_d.x
                let y_d=this.circle_d.y
                let r_d=this.circle_d.r
                
                let ratio=r_d*r_d/ ( (x_d-x)*(x_d-x)+(y_d-y)*(y_d-y) )

                xy_list.push(
                    {x:x_d*(1-ratio)+x*ratio ,
                     y:y_d*(1-ratio)+y*ratio  }
                )


            }

            // console.log(xy_list)
            ctx.lineWidth = 3
            ctx.beginPath()
        
            xy_list.forEach(
                (e,index)=>{
                    if(index>=(xy_list.length-1) ){    
                        ctx.moveTo( e.x,e.y )
                        ctx.lineTo( xy_list[0].x,xy_list[0].y )
                        
                    }
                    else{
                        ctx.moveTo( e.x,e.y )
                        ctx.lineTo( xy_list[index+1].x,xy_list[index+1].y )
                    }
                }
            )
            ctx.closePath()
            ctx.stroke()
            

        }

        draw_circle(circle){


            ctx.beginPath()
            ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.stroke()

        }


        update(){
            let factor_t0 = this.draw_info.x+this.draw_info.width/2 - this.draw_info.width*0.6
            let factor_t1 = this.draw_info.x+this.draw_info.width/2 + this.draw_info.width*1.5

            this.circle_d.x+=this.draw_info.width*0.3*0.01

            if (this.circle_d.x  > factor_t1) {
                this.circle_d.x = factor_t0
            }


            factor_t0 = 0
            factor_t1 = Math.PI*2
            this.c_list_angle+= Math.PI*2 *0.001
            if (this.c_list_angle  > factor_t1) {
                this.c_list_angle = factor_t0
            }
            this.set_rotate_c_circle_list(this.c_list_angle)

            
        }

        set_rotate_c_circle_list(angle){

            let r_c=(this.circle_b.r+this.circle_a.r)/2

            let n= this.circle_c_number
            this.circle_c_list.forEach(
                (e,i)=>{
                    e.x=  this.circle_a.x + r_c*Math.cos( i/n*2*Math.PI +this.c_list_angle )
                    e.y=  this.circle_a.y + r_c*Math.sin( i/n*2*Math.PI +this.c_list_angle )
                }
            )


        }



    


    }


    class fieldGraph{
        width = canvas.width * 0.15
        draw_info = {
            x: canvas.width * 0.15,
            y: canvas.height * 0.55,
            width: this.width,
            height: this.width ,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()

        line_list=[]

        xy_range={
            x_min:-1,
            x_max:10,
            y_min:-1,
            y_max:5
        }

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}

            let n=30
            for (let i = 0; i < n; i++) {
                
                let start_xy={
                    x:this.xy_range.x_min,
                    y:this.xy_range.y_min+ i/n *(this.xy_range.y_max-this.xy_range.y_min)
                }
                let line_info={
                    streamFunction:this.streamFunction,
                    start_xy:start_xy,
                    xy_range:this.xy_range
                }
                let temp_line=new fieldLine(this.draw_info,line_info)
                this.line_list.push(temp_line)
            }
            for (let i = 0; i < n; i++) {
                
                let start_xy={
                    x:this.xy_range.x_max,
                    y:this.xy_range.y_min+ i/n *(this.xy_range.y_max-this.xy_range.y_min)
                }
                let line_info={
                    streamFunction:this.streamFunction,
                    start_xy:start_xy,
                    xy_range:this.xy_range
                }
                let temp_line=new fieldLine(this.draw_info,line_info)
                this.line_list.push(temp_line)
            }

        }

        update(){




        }

        streamFunction(x,y){
            return x*x-2*x*y+y*y*y
        }

        draw(){
            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )

            this.line_list.forEach(
                e=>{e.draw()}
            )

        }
    }
    class fieldLine{
        width = canvas.width * 0.3
        draw_info = {
            x: canvas.width * 0.25,
            y: canvas.height * 0.6,
            width: this.width,
            height: this.width * 0.618,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()
        
        start_xy={
            x:-1,
            y:0
        }
        xy_list=[]

        
        constructor(draw_info,line_info){

            if (draw_info){ this.draw_info=draw_info}
            this.streamFunction=line_info.streamFunction
            this.start_xy=line_info.start_xy
            this.line_info=line_info

        for (let i = 0; i < 1500; i++) {
            this.step()            
        }

        }

        step(){

            if (this.xy_list.length<1){
                this.xy_list.push(this.start_xy)
                return
            }

            let cur_xy=this.xy_list[this.xy_list.length-1]
            let x=cur_xy.x
            let y=cur_xy.y
            let dt=0.01
            let f=this.streamFunction
            let direction=-1
            let u= ( f(x+dt,y)-f(x,y) )/dt *direction
            let v= ( f(x,y+dt)-f(x,y) )/dt *direction

            let l=Math.sqrt(u*u,v*v)

            this.xy_list.push(
                {x:x+u/l*dt,
                 y:y+v/l*dt}
            )

        }

        update(){

        }

        map_xy_to_draw(xy){

            let xy_range=this.line_info.xy_range
            let x_range=(xy_range.x_max-xy_range.x_min)
            let y_range=(xy_range.y_max-xy_range.y_min)


            return {
                x:this.draw_info.x+  this.draw_info.width*  (xy.x-xy_range.x_min)/ x_range ,
                y:this.draw_info.y+  this.draw_info.height*  (xy.y-xy_range.y_min)/ y_range 
            } 
        }


        draw(){
            ctx.lineWidth=2.5
            ctx.beginPath()
            for (let i = 0; i < this.xy_list.length-2; i++) {

                let cur_xy=this.map_xy_to_draw(this.xy_list[i])
                let next_xy=this.map_xy_to_draw(this.xy_list[i+1])

                let cur_x=cur_xy.x
                let cur_y=cur_xy.y
                let next_x=next_xy.x
                let next_y=next_xy.y
                ctx.moveTo(cur_x, cur_y)
                ctx.lineTo(next_x, next_y)
            }
            ctx.closePath()
            ctx.stroke()

            


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
                        case 80:
                            // p
                            game.is_stop = !game.is_stop
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
                        case 80:
                            // p
                            game.is_stop = !game.is_stop
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
                        x: e.offsetX * 2 *scale_factor - canvasInfo.offsetX,
                        y: e.offsetY * 2 *scale_factor - canvasInfo.offsetY
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

                    if (canvasInfo.scale < 0) {
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







