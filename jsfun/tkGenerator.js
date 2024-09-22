

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

            this.simulator = new tkGeneratorLab(this)

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





    class tkGeneratorLab {

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

            
            this.graph_list.push(new TK01() )
            // this.graph_list.push(new PA02() )
            // this.graph_list.push(new arrayManager() )
            // this.graph_list.push(new arrayManager2() )

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



    var get_scale_box=(box,scale)=>{

        let w=box.right-box.left
        let h=box.up-box.down
        return {
            left :box.left -w*(scale-1)/2 ,
            right:box.right+w*(scale-1)/2  ,
            down :box.down -h*(scale-1)/2,
            up   :box.up   +h*(scale-1)/2,
        }

    }

   

    class TK01{


        width=canvas.width*0.9
        height=canvas.height*0.9
        draw_info = {
            x: canvas.width * 0.1,
            y: canvas.height * 0.1,
            width: this.width,
            height: this.height ,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()


        pixel_per_meter=this.width*0.1

        vessel_raw_section_rz_list=[
            {r:1,z:1},
            {r:2,z:1},
            {r:2,z:0},
            {r:2,z:-1},
            {r:1,z:-1},
            {r:1,z:0},
        ]

        vessel_info={
            region_box:{left: 1,right:2,down: -1,up:   1,},
            color:getRandomInt()
        }


        tf_info={
            region_box:get_scale_box(this.vessel_info.region_box,1.2 + Math.random()*0.2 ),
            w_range:[0.15,0.3],
            h_range:[0.2,0.7],
            box_list:[],
            color:get_random_Color(),
            number:getRandomInt(6,15),
            thick:0.2+ 0.2* Math.random()
        }

        cs_info={
            region_box:{left: 0.1+0.5*Math.random(),right:this.tf_info.region_box.left,down: -2.0,up:   2.0,},
            w_range:[0.15,0.3],
            h_range:[0.2,0.7],
            box_list:[],
            color:get_random_Color(),
        }
        pf_info={
            region_box:{left: this.cs_info.region_box.left,right:2.5+0.5*Math.random(),down: -2.0,up:   2.0,},
            w_range:[0.05,0.25],
            h_range:[0.2,0.7],
            box_list:[],
            color:get_random_Color(),

        }

        vessel_bessel=null
        base_shape_list={

        }

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}

            // let vessel_raw_section_xy_list=this.vessel_raw_section_rz_list.map(  (rz)=>{  return this.map_rz(rz)  }     )
            // this.vessel_bessel=new BesselCurve(vessel_raw_section_xy_list)



            let n_cs=10
            for (let i = 0; i < n_cs; i++) {
                this.propose_cs()                
            }

            let n_pf=20
            for (let i = 0; i < n_pf; i++) {
                this.propose_pf()                
            }


        }

        update(){
        }


        draw(){


            ctx.strokeStyle = this.color
            this.draw_center_cross_line()
            // ctx.strokeRect(this.draw_info.x,
            //     this.draw_info.y,
            //     this.draw_info.width,
            //     this.draw_info.height
            // )


            this.draw_vessel()

            this.draw_cs_coil()
            this.draw_pf_coil()
            this.draw_tf_coil()
            this.draw_tk_plan()

        }

        draw_vessel(){

            ctx.strokeStyle=this.vessel_info.color
            this.draw_box(this.vessel_info.region_box)


        }


        is_overlap(r1,r2){

            let res=true

            if (r1.right<=r2.left || r1.left>=r2.right) {
                res=false
            }

            if (r1.up<=r2.down || r1.down>=r2.up) {
                res=false
                
            }

            return res
        }


        is_out(r1,r2){

            let res=true

            if (r1.left>r2.left && r1.right<r2.right ) {
                if (r1.up<r2.up && r1.down>r2.down) {
                    res=false
                }
            }
                return res

        }

        draw_box(box){


            let x_c= this.draw_info.x+this.draw_info.width/2
            let y_c= this.draw_info.y+this.draw_info.height/2

            let x=x_c +box.left *this.pixel_per_meter
            let y=y_c +box.down  *this.pixel_per_meter

            let w=(box.right-box.left)*this.pixel_per_meter
            let h=(box.up-box.down)*this.pixel_per_meter
            ctx.strokeRect( x,y,w,h )
            ctx.stroke()


        }
        draw_box_fill(box){


            let x_c= this.draw_info.x+this.draw_info.width/2
            let y_c= this.draw_info.y+this.draw_info.height/2

            let x=x_c +box.left *this.pixel_per_meter
            let y=y_c +box.down  *this.pixel_per_meter

            let w=(box.right-box.left)*this.pixel_per_meter
            let h=(box.up-box.down)*this.pixel_per_meter
            ctx.fillRect( x,y,w,h )
            // ctx.stroke()


        }


        propose_box(rigion_box,w_range,h_range){

            let left=rigion_box.left +  Math.random()*(rigion_box.right-rigion_box.left) 
            let down=rigion_box.down +  Math.random()*(rigion_box.up-rigion_box.down) 
            let new_box={
                left : left,
                right: left + w_range[0] +  Math.random()  *(w_range[1]-w_range[0]) ,
                down : down, 
                up   : down + h_range[0] +  Math.random()  *(h_range[1]-h_range[0]) ,
            }
            
            if (this.is_out(new_box,rigion_box) ) {  return null }

            return new_box
        }

        propose_cs(){

            let box=this.propose_box(this.cs_info.region_box,this.cs_info.w_range,this.cs_info.h_range)


            if (!box){return}

            let overlap=false
            this.cs_info.box_list.forEach(
                e=>{
                    if(this.is_overlap(e,box)){
                        overlap=true
                    }
                }
            )
            if (overlap){return}

            this.cs_info.box_list.push(box)
            this.cs_info.box_list.push(this.get_symmetry_box(box))

        }
        propose_pf(){


            let info=this.pf_info
            let box=this.propose_box(info.region_box
                                    ,info.w_range
                                    ,info.h_range)


            if (!box){return}

            let overlap=false
            info.box_list.forEach(
                e=>{
                    if(this.is_overlap(e,box)){
                        overlap=true
                    }
                }
            )

            let box_list=[this.cs_info.region_box,
                          this.vessel_info.region_box,
                          this.tf_info.region_box ]
            box_list.forEach(
                e=>{
                    if(this.is_overlap(e,box)){
                        overlap=true
                    }
                }
            )


            if (overlap){return}

            info.box_list.push(box)
            info.box_list.push(this.get_symmetry_box(box))

        }




        get_symmetry_box(box){

            return {
                left :box.left   ,
                right:box.right  ,
                up   :box.down*-1,
                down :box.up  *-1,
            }

        }




        draw_line(rz1,rz2){

            ctx.beginPath()
            let xy=this.map_rz(rz1)
            let next_xy=this.map_rz(rz2)

            ctx.moveTo( xy.x,xy.y  )
            ctx.lineTo(next_xy.x,next_xy.y)

            ctx.closePath()
            ctx.stroke()

        }

        draw_center_cross_line(){


            this.draw_line( 
                {r:0,z:3},
                {r:0,z:-3}
              )
            this.draw_line( 
                {r:3,z:0},
                {r:-3,z:0}
              )

        }

        display_tk_parameter(){}

        draw_cs_coil(){
            ctx.strokeStyle=this.cs_info.color
            this.cs_info.box_list.forEach(
                e=>{
                    this.draw_box(e)
                }
            )

            // this.draw_box(this.cs_info.region_box)

        }
        draw_pf_coil(){

            ctx.strokeStyle=this.pf_info.color
            this.pf_info.box_list.forEach(
                e=>{
                    this.draw_box(e)
                }
            )

            // this.draw_box(this.pf_info.region_box)

        }


        draw_tf_coil(){
            ctx.strokeStyle=this.tf_info.color

            this.draw_box(this.tf_info.region_box)

        }


        draw_tk_plan(){
            

            ctx.save()
            
            ctx.translate(-0.2*this.draw_info.width,0)
            
            
            ctx.strokeStyle=this.vessel_info.color
            this.draw_torus_from_box(this.vessel_info.region_box)
            
            ctx.strokeStyle=this.cs_info.color
            
            this.cs_info.box_list.forEach(
                e=>{
                    this.draw_torus_from_box(e)
                }
            )


            ctx.strokeStyle=this.pf_info.color
            this.pf_info.box_list.forEach(
                e=>{
                    this.draw_torus_from_box(e)
                }
            )
            

            ctx.strokeStyle=this.tf_info.color
            let x_c= this.draw_info.x+this.draw_info.width/2
            let y_c= this.draw_info.y+this.draw_info.height/2

            let tf_plan_box={
                            left: this.tf_info.region_box.left ,
                            right:this.tf_info.region_box.right,
                            up:   this.tf_info.thick/2         ,
                            down: this.tf_info.thick/2*-1      ,
                            }
            
            let n = this.tf_info.number
            for (let i = 0; i < n; i++) {
                ctx.translate(x_c,y_c)
                ctx.rotate(  Math.PI*2  * 1/n   )
                ctx.translate(-1*x_c,-1*y_c)

                this.draw_box(tf_plan_box)
            }



            ctx.restore()





        }

        draw_torus_from_box(box){
            this.draw_circle(  box.left  )
            this.draw_circle(  box.right  )
        }

        draw_circle(r){

            let x_c= this.draw_info.x+this.draw_info.width/2
            let y_c= this.draw_info.y+this.draw_info.height/2

            ctx.beginPath()
            ctx.arc(x_c, y_c, r*this.pixel_per_meter, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.stroke()



        }


        map_rz(rz){

            let x_c= this.draw_info.x+this.draw_info.width/2
            let y_c= this.draw_info.y+this.draw_info.height/2

            let x=x_c +rz.r*this.pixel_per_meter
            let y=y_c +rz.z*this.pixel_per_meter

            return  {x:x,y:y}

        }


        
    }




    class BesselCurve {

        // position=[0,0]

        color = get_random_Color()
        curve_color = get_random_Color()
        control_points = [
            { x: 100, y: 1500 },
            { x: 200, y: 1600 },
            { x: 300, y: 1500 },
            // { x: 1300, y: 1500 },
            { x: 400, y: 1600 },
            // { x: 500, y: 1000 },
        ]
        curve_points = []
        max_curve_points = 100

        t = 0
        t_direction = 1

        constructor(control_points) {
            if (control_points) {
                this.control_points = control_points
            }
            this.make_bessel_curve()
        }

        update(deltaTime) {

            this.t += deltaTime * this.t_direction
            if (this.t > 1 || this.t < 0) {
                this.t_direction *= -1
            }
        }

        draw() {

            let move_point = this.get_point_along_curve(this.t)

            ctx.fillStyle = this.color
            // ctx.beginPath()
            // ctx.arc(move_point[0], move_point[1], 8, 0, Math.PI * 2)
            // ctx.fill()
            // ctx.closePath()

            // this.control_points.forEach(
            //     e => {
            //         ctx.fillStyle = this.color
            //         ctx.beginPath()
            //         ctx.arc(e.x, e.y, 10, 0, Math.PI * 2)
            //         ctx.fill()
            //         ctx.closePath()
            //     }
            // )

            ctx.beginPath()
            this.curve_points.forEach(
                (e, i) => {
                    // console.log(e)
                    if (i != this.curve_points.length - 1) {
                        if (i == 0) {
                            ctx.moveTo(e[0], e[1])
                        }
                        ctx.strokeStyle = this.curve_color
                        ctx.lineTo(this.curve_points[i + 1][0], this.curve_points[i + 1][1])
                    }
                }
            )
            let i = this.curve_points.length - 1
            // ctx.moveTo(this.curve_points[i][0], this.curve_points[i][1])
            // ctx.lineTo(this.curve_points[0][0], this.curve_points[0][1])

            ctx.closePath()
            ctx.fillStyle = this.color
            ctx.fill()
            // ctx.stroke()
        }


        get_point_along_curve(t) {
            // t  in [0,1]
            let n = this.control_points.length - 1
            let position = [0, 0]
            for (let i = 0; i < this.control_points.length; i++) {
                position[0] += binomial(n, i) * this.control_points[i].x * Math.pow((1 - t), n - i) * Math.pow((t), i)
                position[1] += binomial(n, i) * this.control_points[i].y * Math.pow((1 - t), n - i) * Math.pow((t), i)
            }
            return position
        }

        make_bessel_curve() {
            let t = 0
            for (let i = 0; i <= this.max_curve_points; i++) {
                this.curve_points.push(this.get_point_along_curve(t))
                t = i / this.max_curve_points
            }
        }


    }






    class template{
        width = canvas.width * 0.15
        draw_info = {
            x: canvas.width * 0.55,
            y: canvas.height * 0.55,
            width: this.width,
            height: this.width ,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()


        xy_range={
            x_min:-1,
            x_max:10,
            y_min:-1,
            y_max:5
        }

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}

        }

        update(){


        }


        draw(){
            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )


        }
        
    }





    var random_select=(list)=>{

        let res = null
        res= list[ Math.floor(  Math.random()*list.length )  ]
        return res
    }

    var random_range=(range,width)=>{

        let left=range[0]
        let right=range[1]



        let bigWidth=right-left
        let new_left =0
        let new_right=0

        if (bigWidth>width){
            new_left=left + Math.random()*(bigWidth-width)
            new_right=new_left+width
        }
        else{
            new_left=left + Math.random()*(bigWidth-width)
            new_right=new_left+width
        }




        return [new_left,new_right]
    }
    var random_value=(range)=>{
        let width=range[1]-range[0]
        return range[0]+Math.random()*width
    }





    class arrayManager{
        width = canvas.width * 0.10
        draw_info = {
            x: canvas.width * 0.1,
            y: canvas.height * 0.8,
            width: this.width,
            height: this.width ,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()


        xy_range={
            x_min:-1,
            x_max:10,
            y_min:-1,
            y_max:5
        }

        grid_list=[]

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}
            let n_row=getRandomInt(2,4)
            let n_col=getRandomInt(2,6)

            for (let i = 0; i < n_row; i++) {

                for (let j = 0; j < n_col; j++) {


                    let width=this.width/n_row
                    let height=width
                    let gap=20

                    
                    let draw_info={
                        x: this.draw_info.x+j*(width+gap),
                        y: this.draw_info.y+i*(height+gap),
                        width: width,
                        height: height,
                    }
                    
                    let temp_grid=new PA01()
                    this.grid_list.push(temp_grid)

                }

            }
        }

        update(){
            this.grid_list.forEach(
                e=>{
                    e.update()
                }
            )

        }


        draw(){
            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            // ctx.strokeRect(this.draw_info.x,
            //     this.draw_info.y,
            //     this.draw_info.width,
            //     this.draw_info.height
            // )
            this.grid_list.forEach(
                e=>{
                    e.draw()
                }
            )



        }
        
    }


    class arrayManager2{
        width = canvas.width * 0.10
        draw_info = {
            x: canvas.width * 0.1,
            y: canvas.height * 0.8,
            width: this.width,
            height: this.width ,
        }

        color=get_random_Color()
        color1=get_random_Color()
        color2=get_random_Color()


        xy_range={
            x_min:-1,
            x_max:10,
            y_min:-1,
            y_max:5
        }

        grid_list=[]

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}
            let n_row=getRandomInt(0,2)
            let n_col=getRandomInt(0,2)

            for (let i = 0; i < n_row; i++) {

                for (let j = 0; j < n_col; j++) {


                    let width=this.width/n_row
                    let height=width
                    let gap=20

                    
                    let draw_info={
                        x: this.draw_info.x+j*(width+gap),
                        y: this.draw_info.y+i*(height+gap),
                        width: width,
                        height: height,
                    }
                    
                    let temp_grid=new PA02()
                    this.grid_list.push(temp_grid)

                }

            }
        }

        update(){
            this.grid_list.forEach(
                e=>{
                    e.update()
                }
            )

        }


        draw(){
            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            // ctx.strokeRect(this.draw_info.x,
            //     this.draw_info.y,
            //     this.draw_info.width,
            //     this.draw_info.height
            // )
            this.grid_list.forEach(
                e=>{
                    e.draw()
                }
            )



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

                        for (let i = 0; i < 20; i++) {
                        game.simulator.graph_list[0].generation()
                            
                        }
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







