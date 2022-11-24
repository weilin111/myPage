



var text = ""
var text_list = []




var get_element_table = (ma_path)=>{

    $.get(ma_path).success(

        (data) => {
            // console.log(data)
            text += data;
            text_list = text.split("\r\n")
            if (text_list.length<2){
                text_list = text.split("\n")
            }
        }
    
    
    )

}  

console.log(text)



add_game_canvas_to_container("canva_container")

function add_game_canvas_to_container(container_id) {

    let canvas_container = document.getElementById("canva_container")
    var canvas = document.createElement("canvas")
    canvas_container.appendChild(canvas)

    console.log(window.devicePixelRatio)



    let scale = canvas_container.offsetWidth / 1600



    canvas.style.width = (1600 * scale) + 'px'
    canvas.style.height = (800 * scale) + 'px'


    scale = scale * window.devicePixelRatio
    canvas.width = 1600 * scale
    canvas.height = 800 * scale



    var ctx = canvas.getContext("2d")

    let font0 = scale * 18 + "px AGENCY"
    let font_prefix = "px AGENCY"
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

            this.ideaSampler = new IdeaSampler(this, this.ctx)

            this.animate_list = [this.ideaSampler]
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


    class IdeaSampler {

        color = get_random_Color()
        data = []

        data_fine = []

        idea_table = []


        size = {
            width: canvas.width * 0.7,
            height: canvas.height * 0.7,
            dot_size: canvas.width / 400 * this.size,
        }

        draw_padding_left_top = 0.1
        draw_position = {
            x: this.draw_padding_left_top * canvas.width,
            y: (this.draw_padding_left_top) * canvas.height,
        }
        table_font_size = 15 * scale
        font_size = 50 * scale
        color_idea = get_random_Color()

        constructor(game, ctx) {
            this.game = game
            this.ctx = ctx

            canvas.addEventListener("click",
                (e) => { this.sample_idea() }
            )
        }

        update(deltaTime) {

            if (this.data.length == 0) {
                if (text_list.length != 0) {
                    this.data = text_list
                    this.precess_raw_data()
                    this.sample_idea()
                }
            }

            // this.sample_idea()

        }

        precess_raw_data() {

            let type_number = this.data[0].split("|").length - 3
            console.log(type_number)
            for (let index = 0; index < type_number; index++) {
                let x = []
                this.data_fine.push(x)
            }


            console.log(this.data_fine)
            let temp = []
            this.data.forEach(
                (e, i) => {
                    if (i == 0) {
                        return
                    }
                    if (i == 1) {
                        return
                    }
                    temp = e.split("|")
                    this.data_fine.forEach(
                        (l, i) => {
                            let word = temp[i + 2].trim()
                            if (word) {
                                l.push(word)
                            }
                        }
                    )
                }
            )
            // console.log(this.data_fine)

        }


        sample_one(l) {

            let res = l[Math.floor(Math.random() * l.length)]
            return res

        }

        sample_idea() {
            this.idea_table = []
            this.data_fine.forEach(
                e => {

                    this.idea_table.push(this.sample_one(e))
                }
            )
            // console.log(this.idea_table)
            this.color_idea = get_random_Color()
        }


        color_2 = get_random_Color()
        draw() {


            console.log(this.color)
            ctx.fillStyle = this.color
            ctx.strokeStyle = this.color_2
            ctx.font = font0
            ctx.strokeRect(this.draw_position.x, this.draw_position.y, this.size.width, this.size.height)

            ctx.font = 60 * scale + font_prefix
            ctx.fillText("CLICK TO SAMPLE", this.size.width / 2, this.draw_position.y)


            if (this.idea_table) {
                this.draw_idea()
            }
            this.draw_table()
        }

        draw_idea() {

            let draw_padding_left_top = 0.5
            let draw_position = {
                x: draw_padding_left_top * canvas.width,
                y: 0.2 * canvas.height,
            }
            let font_size = this.font_size
            this.ctx.font = font_size * scale + font_prefix
            this.ctx.fillStyle = this.color_idea
            this.idea_table.forEach(
                e => {
                    this.ctx.fillText(e, draw_position.x, draw_position.y)
                    draw_position.y += font_size * 1.2
                }

            )




        }


        color_4 = get_random_Color()
        draw_table() {

            let d_scale = 1.4
            let x = this.draw_position.x * 1.2
            let y = this.draw_position.y * d_scale
            // console.log(this.data)
            this.ctx.fillStyle = this.color_4
            this.table_font_size = scale * Math.ceil(this.size.height / this.data.length) * 0.7
            this.data.forEach(
                e => {
                    // console.log(x,y)
                    this.ctx.font = this.table_font_size + font_prefix
                    // console.log(ctx.font)
                    this.ctx.fillText(e, x, y)
                    y += this.table_font_size
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
            x: canvas.width * 0.17,
            y: canvas.height * 0.05
        }
        data = {
            GM: 1,
            Orbiter_Number: 1,
            angle_01: 0,
            omega_01: 0,
            r_01: 0,
            h_01: 0,
            v_01: 0,

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
            this.ctx.lineWidth = 4 * scale

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






















