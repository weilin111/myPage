

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
        fps = 0

        is_stop = false

        constructor(ctx, canvas) {
            this.ctx = ctx

            this.simulator = new mudulorLab(this)

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







    class mudulorLab {

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

            this.graph_list.push(new modulorCurve())
            this.graph_list.push(new modulorGrid())
            this.graph_list.push(new goldenGrid())
            this.graph_list.push(new stationaryWaveLab())
            this.graph_list.push(new flowerFib())

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


    class modulorCurve {

        draw_info = {
            x: canvas.width * 0.1,
            y: canvas.height * 0.1,
            width: canvas.width * 0.4,
            height: canvas.width * 0.4,
        }
        color = get_random_Color()
        color2 = get_random_Color()
        color3 = get_random_Color()

        modulor_curve_start_1 = 1
        k = 0.618
        modulor_curve_start_2 = 1 - 0.5 * (1 - this.k)

        modulor_curve_point_list_1 = []
        modulor_curve_bessel_list_1 = []

        modulor_curve_point_list_2 = []
        modulor_curve_bessel_list_2 = []

        modulor = 2260

        iter_num = 15

        rotation_theta = 0 * Math.PI * 2

        constructor(draw_info) {


            if (draw_info) {

                this.draw_info = draw_info

            }

            for (let i = 0; i < this.iter_num; i++) {

                draw_info = this.draw_info

                let x = draw_info.x + draw_info.width * (1 - this.k)
                let k = this.modulor_curve_start_1 * Math.pow(this.k, i)
                let y = k * draw_info.height
                y = draw_info.height - y + draw_info.y
                this.modulor_curve_point_list_1.push({ x: x, y: y, k: k })

                x = draw_info.x + draw_info.width * (1 - this.k)
                k = this.modulor_curve_start_2 * Math.pow(this.k, i)
                y = k * draw_info.height
                y = draw_info.height - y + draw_info.y

                this.modulor_curve_point_list_2.push({ x: x, y: y, k: k })

            }


            let temp_point_list = []
            let x_temp = 0
            let y_temp = 0

            let curve_color = get_random_Color()
            let curve_color_2 = get_random_Color()

            let curve_color_3 = get_random_Color()
            let curve_color_4 = get_random_Color()

            this.modulor_curve_point_list_1.forEach(
                (e, i) => {
                    if (i != this.modulor_curve_point_list_1.length - 1) {

                        let e_next = this.modulor_curve_point_list_1[i + 1]
                        let curve = this.get_bessel(e, e_next, 0.5)
                        curve.curve_color = curve_color
                        curve.color = curve_color_2
                        this.modulor_curve_bessel_list_1.push(curve)

                        let e_middle = { x: (e.x + e_next.x) / 2, y: (e.y + e_next.y) / 2 }
                        curve = this.get_bessel(e, e_middle, 0.5)
                        curve.curve_color = curve_color_3
                        curve.color = curve_color_4
                        this.modulor_curve_bessel_list_1.push(curve)

                        curve = this.get_bessel(e_middle, e_next, 0.5)
                        curve.curve_color = curve_color_3
                        curve.color = curve_color_4
                        this.modulor_curve_bessel_list_1.push(curve)


                    }
                }
            )

            curve_color = get_random_Color()
            curve_color_2 = get_random_Color()
            curve_color_3 = get_random_Color()
            curve_color_4 = get_random_Color()
            this.modulor_curve_point_list_2.forEach(
                (e, i) => {
                    if (i != this.modulor_curve_point_list_2.length - 1) {

                        let e_next = this.modulor_curve_point_list_2[i + 1]
                        let curve = this.get_bessel(e, e_next, -0.5)
                        curve.curve_color = curve_color
                        curve.color = curve_color_2
                        this.modulor_curve_bessel_list_2.push(curve)


                        let k = 1 - this.k
                        let e_middle = {
                            x: k * e.x + (1 - k) * e_next.x,
                            y: k * e.y + (1 - k) * e_next.y
                        }
                        curve = this.get_bessel(e, e_middle, -0.5)
                        curve.curve_color = curve_color_3
                        curve.color = curve_color_4
                        this.modulor_curve_bessel_list_2.push(curve)

                        curve = this.get_bessel(e_middle, e_next, -0.5)
                        curve.curve_color = curve_color_3
                        curve.color = curve_color_4
                        this.modulor_curve_bessel_list_2.push(curve)

                    }
                }
            )


            let left_top_curve = this.get_bessel(this.modulor_curve_point_list_1[0],
                this.modulor_curve_point_list_2[0],
                -0.5)
            left_top_curve.curve_color = curve_color_3
            left_top_curve.color = curve_color_4
            this.modulor_curve_bessel_list_2.push(left_top_curve)


        }


        get_bessel(p1, p2, direction) {

            let e = p1
            let e_next = p2
            let y_temp = (e.y + e_next.y) / 2
            let dy = e_next.y - e.y
            let x_temp = (e.x + e_next.x) / 2 + dy * direction
            let e_middle = { x: x_temp, y: y_temp }

            return new BesselCurve([e, e_middle, e_next])
        }



        draw() {

            ctx.fillStyle = this.color
            ctx.fillRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )

            ctx.lineWidth = 5

            ctx.strokeStyle = this.color2
            ctx.beginPath()
            let x = this.draw_info.x + this.draw_info.width / 2
            ctx.moveTo(x, this.draw_info.y)
            ctx.lineTo(x, this.draw_info.y + this.draw_info.height)
            ctx.closePath()
            ctx.stroke()

            ctx.font = this.draw_info.height / 30 + "px AGENCY"

            this.modulor_curve_bessel_list_1.forEach(
                e => {
                    e.draw()
                }
            )
            this.modulor_curve_bessel_list_2.forEach(
                e => {
                    e.draw()
                }
            )


            ctx.fillStyle = this.color2


            let bar_height = 5
            this.modulor_curve_point_list_1.forEach(
                e => {

                    ctx.fillRect(e.x, e.y - bar_height / 2, 50, 5)
                    ctx.fillText(`${(e.k * this.modulor).toFixed(0)}`, e.x, e.y)
                }
            )

            ctx.fillStyle = this.color3
            this.modulor_curve_point_list_2.forEach(
                e => {
                    ctx.fillRect(e.x, e.y - bar_height / 2, -50, 5)
                    ctx.fillText(`${(e.k * this.modulor).toFixed(0)}`, e.x - 50, e.y)

                }
            )






        }

        update() {

            // this.draw_info.x+=0.1
        }




    }



    class modulorGrid {

        draw_info = {
            x: canvas.width * 0.55,
            y: canvas.height * 0.28,
            width: canvas.width * 0.3,
            height: canvas.width * 0.3,
        }

        color = get_random_Color()
        color2 = get_random_Color()

        k = 0.618

        start_dx = 2.5


        iter_num = 18

        update_timer = 0
        update_timer_max = 25

        gap = 5

        constructor(draw_info) {

        }

        draw() {

            ctx.fillStyle = this.color
            ctx.strokeStyle = this.color
            ctx.lineWidth = 2
            // ctx.fillRect(this.draw_info.x,
            //             this.draw_info.y,
            //             this.draw_info.width,
            //             this.draw_info.height
            //             )

            ctx.fillStyle = this.color2
            let k = this.k
            k = 1 + (1 - k)
            let gap = this.gap
            let x = this.draw_info.x + gap
            let y0 = this.draw_info.y + this.draw_info.height - gap
            let y = y0
            let dx = this.start_dx
            let dy0 = dx
            let dy = dy0

            let dx_list = []
            for (let i = 0; i < this.iter_num; i++) {
                dx_list.push(Math.pow(k, i) * dx)
            }
            // dx_list.reverse()
            // console.log(dx_list)

            for (let i = 0; i < this.iter_num; i++) {
                dx = dx_list[i]
                for (let j = 0; j < this.iter_num; j++) {
                    dy = dx_list[j]
                    // ctx.fillRect(x,y,dx,-1*dy)
                    ctx.strokeRect(x - gap, y - gap, dx - gap, -1 * (dy - gap))
                    // dy=dx_list[this.iter_num-1-j]
                    y -= (gap + dy)
                    // dy=dx_list[j]
                }
                x += (gap + dx)
                y = y0


            }


        }




        update() {

            let factor_t0 = 1.0
            let factor_t1 = 2.5

            this.start_dx += 0.001
            if (this.start_dx > factor_t1) {
                this.start_dx = factor_t0
            }


        }

    }


    class goldenGrid {


        width = canvas.width * 0.2

        draw_info = {
            x: canvas.width * 0.6,
            y: canvas.height * 0.3,
            width: this.width,
            height: this.width * 0.618,
        }

        color = get_random_Color()
        color2 = get_random_Color()
        color3 = get_random_Color()

        lineWidth = 8

        k = 0.618

        iter_num = 15

        re_calculate_arc_center_timer = 0
        re_calculate_arc_center_info = [
            { x: 0, y: (1 - this.k), direction: "x" },
            { x: (1 - this.k) * -1, y: 0, direction: "y" },
            { x: 0, y: (1 - this.k) * -1, direction: "x" },
            { x: (1 - this.k), y: 0, direction: "y" },
        ]

        constructor(draw_info) {

        }

        draw() {
            ctx.lineWidth = this.lineWidth

            ctx.strokeStyle = this.color
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )
            ctx.fillStyle = this.color2

            ctx.lineWidth = 2
            ctx.strokeText(`k=${this.k.toFixed(3)}`, this.draw_info.x, this.draw_info.y)


            ctx.lineWidth = this.lineWidth



            ctx.strokeStyle = this.color2
            let start_theta = 0 * Math.PI
            let d_theta = 0.5 * Math.PI
            let k = this.k

            let arc_center = { x: this.draw_info.x + (1 - k) * this.draw_info.width, y: this.draw_info.y }
            let r = this.draw_info.height

            ctx.beginPath()
            this.re_calculate_arc_center_timer = 0
            for (let i = 0; i < this.iter_num; i++) {
                ctx.arc(arc_center.x, arc_center.y, r, start_theta, start_theta + d_theta, false)

                arc_center = this.re_calculate_arc_center(arc_center, r)
                r = r * k
                start_theta += d_theta

            }
            ctx.stroke()
            ctx.closePath()

            // line
            ctx.strokeStyle = this.color3
            this.re_calculate_arc_center_timer = 0
            arc_center = { x: this.draw_info.x + (1 - k) * this.draw_info.width, y: this.draw_info.y }
            r = this.draw_info.height
            for (let i = 0; i < this.iter_num; i++) {
                let info = this.re_calculate_arc_center_info[this.re_calculate_arc_center_timer]
                ctx.beginPath()
                let x = arc_center.x
                let y = arc_center.y
                ctx.moveTo(x, y)
                ctx.lineTo(x + r * Math.sign(info.x), y + r * Math.sign(info.y))
                ctx.closePath()
                ctx.stroke()
                arc_center = this.re_calculate_arc_center(arc_center, r)
                r = r * k

            }


        }

        re_calculate_arc_center(acr_center, r) {

            let info = this.re_calculate_arc_center_info[this.re_calculate_arc_center_timer]
            // console.log(info)
            let x = acr_center.x + info.x * r
            let y = acr_center.y + info.y * r



            this.re_calculate_arc_center_timer += 1
            this.re_calculate_arc_center_timer = this.re_calculate_arc_center_timer % this.re_calculate_arc_center_info.length

            return { x: x, y: y }


        }

        update() {

            let factor_t0 = 0.618 - 0.3 - 0.1
            let factor_t1 = 0.618 + 0.3 + 0.3

            this.k += 0.001
            if (this.k > factor_t1) {
                this.k = factor_t0
            }

        }

    }

    class goldenGridV2 {

        constructor(draw_info) {

        }

        draw() {


        }


        update() { }

    }

    class stationaryWaveLab {


        draw_info = {
            x: canvas.width * 0.65,
            y: canvas.height * 0.55,
            width: canvas.width * 0.25,
            height: canvas.width * 0.1,
        }

        color = get_random_Color()
        color2 = get_random_Color()

        wave_num = getRandomInt(3,10)
        wave_list = []

        constructor(draw_info) {

            if (draw_info) {
                this.draw_info = draw_info
            }

            this.center = { x: this.draw_info.x + this.draw_info.width / 2, y: this.draw_info.y + this.draw_info.height / 2 }

            for (let i = 0; i < this.wave_num; i++) {

                let wave= new stationaryWave( 
                       {  
                        center:{x:this.center.x,y:this.center.y},
                        max_length:this.draw_info.width,
                        half_number:i+1,
                        phase:0,
                        A:this.draw_info.height*Math.random()/2.5,
                        }
                 )
                 this.wave_list.push(wave)

            }

            console.log(this.wave_list)

        }


        draw() {

            ctx.lineWidth = 8

            ctx.strokeStyle = this.color
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )


            this.wave_list.forEach(
                e => { e.draw() }
            )

        }


        update() {

            this.wave_list.forEach(
                e => { e.update() }
            )


        }

    }
    class stationaryWave {

        waveinfo=                       {  
            center:{x:canvas.width/2,y:canvas.height/2},
            max_length:canvas.width/6,
            half_number:3,
            phase:0,
            A:20,
            }
        
        max_point_number=100

        color=get_random_Color()
        color2=get_random_Color()

        constructor(waveinfo) {
            if(waveinfo){
                this.waveinfo=waveinfo
            }
        }

        draw() {

            let x_left=this.waveinfo.center.x-this.waveinfo.max_length/2
            let y0=this.waveinfo.center.y
            let A=this.waveinfo.A
            let max_length=this.waveinfo.max_length
            let max_phase= this.waveinfo.half_number *Math.PI
            
            ctx.strokeStyle = this.color
            ctx.lineWidth=4
            ctx.beginPath()
            ctx.moveTo(x_left,y0)
            for (let i = 0; i < this.max_point_number+1; i++) {
                
                let x=x_left+ i/this.max_point_number *max_length
                let y=y0+ A * Math.sin( i/this.max_point_number *max_phase   )
                ctx.lineTo( x,y)

            }

            // ctx.fill()
            ctx.stroke()
            ctx.closePath()

            ctx.fillStyle=this.color2
            let k=this.waveinfo.phase/max_phase
            let x=x_left+ k *max_length
            let y=y0+ A * Math.sin( k *max_phase   )
            ctx.beginPath()
            ctx.arc(x,y,10,0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()



        }


        update() {
            this.waveinfo.phase+=0.02*Math.PI
            this.waveinfo.phase=this.waveinfo.phase % (this.waveinfo.half_number *Math.PI)
         }

    }


    class flowerFib {


        draw_info = {
            x: canvas.width * 0.5,
            y: canvas.height * 0.6,
            width: canvas.width * 0.1,
            height: canvas.width * 0.1,
        }

        color = get_random_Color()
        color2 = get_random_Color()
        color3 = get_random_Color()

        seed_info={
            num:getRandomInt(150,500),
            seed_size:8,
            length_base:getRandomInt(10,25),
            k:0.618
        }

        constructor(draw_info) {
            if (draw_info) {
                this.draw_info = draw_info
            }
        
        this.center = { x: this.draw_info.x + this.draw_info.width / 2, y: this.draw_info.y + this.draw_info.height / 2 }


        }

        draw() {
            ctx.lineWidth = 8

            // ctx.strokeStyle = this.color
            // ctx.strokeRect(this.draw_info.x,
            //     this.draw_info.y,
            //     this.draw_info.width,
            //     this.draw_info.height
            // )

            ctx.fillStyle=this.color2

            let x0=this.center.x
            let y0=this.center.y
            let length_base=this.seed_info.length_base
            
            let theta=0*Math.PI*2
            let k= this.seed_info.k
            let r_max=length_base*Math.pow(this.seed_info.num,0.5)

            ctx.lineWidth = 2
            ctx.strokeText(`k=${this.seed_info.k.toFixed(3)}`,x0+r_max,y0-r_max)

            for (let i = 0; i < this.seed_info.num ; i++) {
                
                let r=length_base*Math.pow(i,0.5)
                let x= x0+ r*Math.cos( theta )
                let y= y0+ r*Math.sin( theta )
                
                theta+=k*Math.PI*2

                let a=  (r/r_max)  
                a=Math.pow(a,2) *250
                ctx.fillStyle=`hsl(${a},100%,50%)`
                ctx.beginPath()
                ctx.arc(x,y,this.seed_info.seed_size,0, 2 * Math.PI)
                ctx.fill()
                ctx.closePath()


            }




        }


        update() { 


            let factor_t0 = 0.618 - 0.3 - 0.1
            let factor_t1 = 0.618 + 0.3 + 0.3

            this.seed_info.k += 0.001*0.1*0.25
            if (this.seed_info.k  > factor_t1) {
                this.seed_info.k  = factor_t0
            }




        }

    }



    class noise {

        constructor() { }


        draw_xy() { }
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
                        x: e.offsetX * 2 - canvasInfo.offsetX,
                        y: e.offsetY * 2 - canvasInfo.offsetY
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







