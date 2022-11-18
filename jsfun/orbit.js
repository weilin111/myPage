


// add_game_canvas_to_container("canva_container")

function add_game_canvas_to_container(container_id) {

    let canvas_container = document.getElementById("canva_container")
    var canvas = document.createElement("canvas")
    canvas_container.appendChild(canvas)
    console.log(canvas_container.offsetWidth)

    let scale = canvas_container.offsetWidth/1600


    canvas.style.width = (1600 * scale) +'px'
    canvas.style.height = (1000 * scale) +'px'

    
    scale=scale*window.devicePixelRatio
    
    canvas.width = 1600 * scale
    canvas.height = 1000 * scale



    var ctx = canvas.getContext("2d")

    let font0 = scale * 18 + "px AGENCY"
    let text_margin_y = scale * 19
    var font_icon_prefix = "px WEBDINGS"
    var font_icon = scale*100+"px WEBDINGS"
    var font_icon_passenger =scale*40+ "px WEBDINGS"
    var font_big = scale*180+"px AGENCY"
    // var font_mid = "40px AGENCY"
    var font_mid =scale*40+ "px AGENCY"
    ctx.font = "14px AGENCY"
    ctx.fillStyle = "#ffffff"


    class Game {

        display = 0
        orbitSystem = 0
        constructor(ctx, canvas) {
            this.ctx = ctx
            this.canvas = canvas
            this.display = new Display(this, this.ctx)
            this.orbitSystem = new OrbitSystem(this)
            this.animate_list = [this.orbitSystem, this.display]
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


    class OrbitSystem {

        position = {
            x: canvas.width * (1 / 6 + 1 / 2),
            y: canvas.height * (1 / 2.2)
        }
        color = get_random_Color()
        orbit_info = {
            angle: 1,
            L_divide_m_square: 0.005,
            GM: 1,
        }
        physics_info = {
            G: 6.674e-11,
            M_earth: 5.972e24,
            GM: 3.99e12,
            r_earth: 6.371e6,
            L_divide_m_square: 2.539e+21  //when a=r_earth  e=0
        }

        orbit_point_number = 100
        orbiter_list = []
        orbiter_datas = [
            {
                angle: 0,
                L_divide_m_square: 1,
                e: 0.0,
                orbit_name: "逃逸轨道",
                angle_bia: 0 * Math.PI / 180,
            },

        ]
        draw_scale = 160


        constructor(game) {
            this.ctx = game.ctx
            this.orbiter_datas.forEach(
                e => {
                    this.orbiter_list.push(new Orbiter(this, e))
                }
            )

            for (let index = 0; index < 18; index++) {
                this.orbiter_list.push(new Orbiter(this,
                    {
                        angle: 0,
                        L_divide_m_square: 0.04 * (10 + index),
                        e: 0.08 * (1 + index),
                        angle_bia: 40 * Math.PI / 180,
                    }
                ))

            }

        }

        update(deltaTime) {
            this.orbiter_list.forEach(
                e => {
                    e.update(deltaTime)
                }
            )
        }

        draw() {

            // console.log(this.orbiter_list[0].orbit_info)
            this.ctx.fillStyle = this.color
            this.draw_dot({ x: 0, y: 0 })
            // this.draw_orbit(this)
            this.orbiter_list.forEach(
                (e, i) => {
                    e.draw()
                    this.draw_orbit(e)
                    let info_text = [
                        `GM=${(this.physics_info.GM * this.orbit_info.GM).toExponential(2)}`,
                        `(L/m)^2=${(this.physics_info.L_divide_m_square * e.orbit_info.L_divide_m_square).toExponential(2)}`,
                        `b=${(this.physics_info.r_earth * this.get_b(e) / 1000).toExponential(3)} km`,
                        `a=${(this.physics_info.r_earth * this.get_a(e) / 1000).toExponential(3)} km`,
                    ]
                    if (e.orbit_info.orbit_name != undefined) {
                        info_text.push(e.orbit_info.orbit_name)
                    }

                    let draw_position = this.angle_2_xy(Math.PI - 0.5 * e.orbit_info.angle_bia, e)
                    draw_position.x += this.position.x
                    draw_position.y += this.position.y
                    let rotate_angle = 30 / 180 * Math.PI
                    ctx.save()
                    ctx.translate(draw_position.x, draw_position.y)
                    ctx.rotate(rotate_angle)
                    ctx.translate(-1 * draw_position.x, -1 * draw_position.y)
                    this.draw_text(info_text, draw_position)   //!!!!
                    ctx.restore()







                }
            )

            // this.draw_orbiters()
        }

        angle_2_xy(angle, orbiter, angle_bia = 0 / 180 * Math.PI) {
            let L_divide_m_square = orbiter.orbit_info.L_divide_m_square
            let GM = this.orbit_info.GM
            let c0 = orbiter.orbit_info.e * GM / L_divide_m_square
            angle_bia = orbiter.orbit_info.angle_bia
            let r = this.draw_scale * (L_divide_m_square / GM) / (1 + c0 * L_divide_m_square / GM * Math.cos(angle + angle_bia))

            // console.log(c0)

            return { x: r * Math.cos(angle), y: r * Math.sin(angle) }

        }

        angle_2_r(angle, orbiter, angle_bia = 0 / 180 * Math.PI) {
            let L_divide_m_square = orbiter.orbit_info.L_divide_m_square
            let GM = this.orbit_info.GM
            let c0 = orbiter.orbit_info.e / GM * L_divide_m_square
            angle_bia = orbiter.orbit_info.angle_bia

            let r = (L_divide_m_square / GM) / (1 + c0 * L_divide_m_square / GM * Math.cos(angle + angle_bia))


            return r

        }



        draw_dot(position) {
            let width = 10
            let height = 10
            this.ctx.fillRect(this.position.x + position.x - width / 2, this.position.y + position.y - height / 2, width, height)
        }



        get_angle_vilocity(orbiter) {
            let GM = this.orbit_info.GM
            let L_divide_m_square = orbiter.orbit_info.L_divide_m_square
            let c0 = orbiter.orbit_info.e / GM * L_divide_m_square
            let angle = orbiter.orbit_info.angle
            let angle_bia = orbiter.orbit_info.angle_bia
            let r = (L_divide_m_square / GM) / (1 + c0 * L_divide_m_square / GM * Math.cos(angle + angle_bia))

            return Math.sqrt(L_divide_m_square / r / r / r / r)
        }

        get_b(orbiter) {
            let GM = this.orbit_info.GM
            let L_divide_m_square = orbiter.orbit_info.L_divide_m_square
            let e = orbiter.orbit_info.e


            let b = 1 / GM * L_divide_m_square / (1 + e)

            return b
        }

        get_a(orbiter) {
            let GM = this.orbit_info.GM
            let L_divide_m_square = orbiter.orbit_info.L_divide_m_square
            let e = orbiter.orbit_info.e


            let a = 1 / GM * L_divide_m_square / (1 - e)

            return a
        }


        draw_orbit(orbiter) {
            let last_point = this.angle_2_xy(0, orbiter)
            for (let index = 1; index < this.orbit_point_number; index++) {
                let angle = index / this.orbit_point_number * 2.05 * Math.PI

                let point = this.angle_2_xy(angle, orbiter)

                this.ctx.strokeStyle = orbiter.color
                this.ctx.beginPath()
                this.ctx.moveTo(last_point.x + this.position.x, last_point.y + this.position.y)
                this.ctx.lineTo(point.x + this.position.x, point.y + this.position.y)
                this.ctx.closePath()
                this.ctx.stroke()
                last_point = point
                // console.log(point)
            }
        }


        draw_text(text_list, draw_position) {
            let marginY = text_margin_y
            text_list.forEach(
                (e, i) => {
                    this.ctx.fillText(e, draw_position.x, draw_position.y + marginY * i)
                }
            )
        }



        draw_orbiters() {
            this.orbiter_list.forEach(
                e => {
                    let position = this.angle_2_xy(e.orbit_info.angle, e)
                    this.ctx.fillStyle = e.color
                    this.draw_dot(position)

                }
            )
        }



    }


    class Orbiter {

        color = get_random_Color()
        orbit_info = {
            angle: 0,
            L_divide_m_square: 0.005,
            e: 0,
        }
        speed_scale = 0.00051


        constructor(orbitSystem, orbit_info) {
            this.orbitSystem = orbitSystem
            this.ctx = this.orbitSystem.ctx
            this.orbit_info = orbit_info
        }

        update(deltaTime) {
            this.orbit_info.angle -= this.orbitSystem.get_angle_vilocity(this) * deltaTime * this.speed_scale
            // console.log(this.orbit_info.angle)
        }

        get_angle_vilocity() {
            return this.orbitSystem.get_angle_vilocity(this) * this.speed_scale
        }

        draw() {
            this.ctx.fillStyle = this.color
            this.ctx.font = font0

            let width = 10
            let height = 10
            let position = this.orbitSystem.angle_2_xy(this.orbit_info.angle, this)
            let draw_position = {
                x: this.orbitSystem.position.x + position.x - width / 2,
                y: this.orbitSystem.position.y + position.y - height / 2,
            }
            this.ctx.fillRect(draw_position.x, draw_position.y, width, height)

            let text_list = [
                `r=${(this.get_phy_r() / 1000).toExponential(2)}km`,
                `omega'=${(this.get_phy_angle_velocity()).toExponential(2)} 度/天`,
                `(L/m)^2'=${(this.orbit_info.L_divide_m_square * this.orbitSystem.physics_info.L_divide_m_square).toExponential(2)}`
            ]

            let marginY = canvas.height / 40
            text_list.forEach(
                (e, i) => {
                    this.ctx.fillText(e, draw_position.x, draw_position.y - i * marginY)
                }
            )


        }


        get_phy_r() {

            let r = this.orbitSystem.angle_2_r(this.orbit_info.angle, this) * this.orbitSystem.physics_info.r_earth
            return r
        }

        get_phy_angle_velocity() {
            let L_divide_m_square_phy = this.orbit_info.L_divide_m_square * this.orbitSystem.physics_info.L_divide_m_square
            let r_phy = this.orbitSystem.angle_2_r(this.orbit_info.angle, this) * this.orbitSystem.physics_info.r_earth
            let omega = Math.sqrt(L_divide_m_square_phy / r_phy / r_phy / r_phy / r_phy) * 180 / Math.PI * 3600 * 24
            return omega

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

        }
        sideBar_data_name = [
            "GM",
            "Orbiter_Number",
            "r_01",
            "angle_01",
            "omega_01",
        ]



        dataManager_data_name = [
            "angle_01",
            "omega_01",
            "r_01",


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

            let orbiter_01 = this.game.orbitSystem.orbiter_list[8]
            this.data.angle_01 = (-1 * orbiter_01.orbit_info.angle / Math.PI * 180).toFixed(3)
            this.data.omega_01 = orbiter_01.get_phy_angle_velocity().toExponential(3)
            this.data.r_01 = (orbiter_01.get_phy_r() / 1000).toFixed(3)


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
            this.ctx.lineWidth = 1
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
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        game.update_and_draw(deltatime)

    }

    animate(0)


    return canvas

}

