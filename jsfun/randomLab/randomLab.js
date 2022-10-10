var canvas = document.getElementById("canvas1")
var canvas_sideBar = document.getElementById("canvas2")

var canvas_dataManager = document.getElementById("canvas3")
var ctx_dataManager = canvas_dataManager.getContext("2d")
canvas_dataManager.width = 600
canvas_dataManager.height = 1800

canvas.width = 1800
canvas.height = 1800

canvas_sideBar.width = 600
canvas_sideBar.height = 1800


var ctx = canvas.getContext("2d")
var ctx_sideBar = canvas_sideBar.getContext("2d")



font0 = "14px AGENCY"
ctx_sideBar.font = font0
var font_icon_prefix = "px WEBDINGS"
var font_icon = "200px WEBDINGS"
var font_icon_passenger = "40px WEBDINGS"
var font_big = "180px AGENCY"
var font_mid = "40px AGENCY"

ctx.font = "14px AGENCY"
ctx.fillStyle = "#ffffff"
ctx.lineWidth = 3
var gameTime = 0
var gameSpeed = 1
var is_gameStop = false





class Game {

    rokect = null
    display = null
    solarSystem = null

    physics_para = {
        g: [0, 1],

    }
    draw_para = {
        up: [0, -1],
        pixel_per_km: 100,
    }

    constructor() {
        this.rokect = new Rokect(this)
        this.display = new Display(this, ctx_sideBar)
        this.solarSystem = new SolarSystem(this)
        this.controlSystem = new ControlSystem()
        this.roundPanel = new RoundPanel(this)
        this.besselCurve = new BesselCurve()

        this.earthSystem=new EarthSystem()
    }


    update_and_draw(deltaTime) {


        this.earthSystem.update(deltaTime)
        this.earthSystem.draw()

        this.besselCurve.update(deltaTime)
        this.besselCurve.draw()

        this.roundPanel.update()
        this.roundPanel.angle = this.controlSystem.y_output[0]
        this.roundPanel.draw()


        this.controlSystem.update(deltaTime)

        this.rokect.update(deltaTime)
        this.rokect.draw()

        this.solarSystem.update(deltaTime)
        this.solarSystem.draw()


        this.display.draw()
        this.display.update()

    }


}



class Display {


    game = null
    data = {
        altitude: 0,
        speed: 0,
        a: 0,
        totalMass: 0,
        fuelMass: 0,
        velocity: 0,
        position: 0,
        control_output: 0,
        control_input: 0,
        control_y: 0,
        control_x: 0,
        control_v: 0,
        control_a: 0,
    }
    sideBar_data_name = ["a",
        "altitude",
        "position",
        "totalMass",
        "fuelMass",
        "velocity",
        "control_y",
        "control_x",
    ]

    color = get_random_Color()

    sideBar_data = {

    }
    dataManager_data_name = [
        "totalMass",
        "altitude",
        "control_output",
        "control_input",
        "control_v",
        "control_a",
    ]

    max_timer = 30
    timer = this.max_timer - 1
    data_managers = []

    constructor(game, ctx) {
        this.game = game
        this.ctx = ctx
        this.dataManager_data_name.forEach(
            (e, i) => {
                this.data_managers.push(new DataManager(ctx_dataManager, 0, 20 + i * 225, 500, 200))
            }
        )
    }

    draw() {

        this.ctx.clearRect(0, 0, 600, 1800)
        this.draw_sideBar()

        if (this.timer == 0) { this.draw_dataManager() }

    }

    update() {
        this.data.position = this.fix_digital(this.game.rokect.position, 1)
        this.data.velocity = this.fix_digital(this.game.rokect.velocity, 1)
        this.data.a = this.fix_digital(this.game.rokect.a, 2)

        this.data.fuelMass = this.game.rokect.fuel_mass.toFixed(1)
        this.data.totalMass = this.game.rokect.total_mass.toFixed(1)
        this.data.altitude = (1700 - this.game.rokect.position[1]).toFixed(1)

        // console.log(this.game.controlSystem.x_input)
        this.data.control_input = this.game.controlSystem.x_input
        this.data.control_output = this.game.controlSystem.y_output[0]
        this.data.control_v = this.game.controlSystem.y_output[1]
        this.data.control_a = this.game.controlSystem.y_output[2]
        this.data.control_x = this.game.controlSystem.x_input
        this.data.control_y = this.fix_digital(this.game.controlSystem.y_output, 1)
        // console.log(this.game.controlSystem.y_output)

        this.data_managers[3].y_value_max = this.data_managers[2].y_value_max

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

        let marginY = 20
        let width = 500
        let height = 100
        let x = 600 - width
        let y = 50
        let font_mid = height / 5 + "px AGENCY"
        let font_big = height / 1.8 + "px AGENCY"
        this.sideBar_data_name.forEach(
            dataName => {

                this.ctx.strokeStyle = this.color
                this.ctx.fillStyle = this.color
                this.ctx.font = font_mid
                this.ctx.lineWidth = 3
                this.ctx.strokeRect(x, y, width, height)
                ctx_sideBar.fillText(dataName, x + width / 20, y + height * 0.95)
                ctx_sideBar.font = font_big
                ctx_sideBar.fillText(this.data[dataName], x + width / 4.5, y + height / 1.5)
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
        this.data_managers[0].ctx.clearRect(0, 0, canvas_dataManager.width, canvas_dataManager.height)
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

    constructor() {
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
        ctx.beginPath()
        ctx.arc(move_point[0], move_point[1], 8, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        this.control_points.forEach(
            e => {
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(e.x, e.y, 10, 0, Math.PI * 2)
                ctx.fill()
                ctx.closePath()
            }
        )

        this.curve_points.forEach(
            (e, i) => {
                // console.log(e)
                if (i != this.curve_points.length - 1) {
                    ctx.strokeStyle = this.curve_color
                    ctx.beginPath()
                    ctx.moveTo(e[0], e[1])
                    ctx.lineTo(this.curve_points[i + 1][0], this.curve_points[i + 1][1])
                    ctx.closePath()
                    ctx.stroke()
                }

            }
        )
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


class SpaceShip {


    position = [0, 0]
    a = [0, 0]
    v = [0, 0]

    constructor() {


    }

    draw() {

    }

}








class RoundPanel {

    position = [1300, 1600]
    radius = 100
    ticks_number = 30
    pointer_color = get_random_Color()
    lineWidth = 3
    title = "power"
    start_end_angle = [45 * Math.PI / 180, 315 * Math.PI / 180]
    color = get_random_Color()
    angle = 0
    game = null


    constructor(game) {
        this.game = game
    }

    update() {

    }

    draw() {


        this.draw_shell()
        this.draw_pointer(this.angle)
    }

    draw_pointer(angle) {

        ctx.save()
        ctx.lineWidth = 3
        ctx.strokeStyle = this.pointer_color
        ctx.translate(this.position[0], this.position[1])
        ctx.rotate(angle * -1)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.radius * 0.6, 0)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()


    }


    draw_shell() {

        ctx.font = font_mid
        ctx.fillText(this.title, this.position[0] - this.radius * 0.2, this.position[1] + this.radius * 0.3)

        ctx.strokeStyle = this.pointer_color
        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.radius * 0.05, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.radius * 0.1, 0, Math.PI * 2)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.radius * 0.5, Math.PI / 180 * -150, Math.PI / 180 * -30)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.radius * 0.3, Math.PI / 180 * -150, Math.PI / 180 * -30)
        ctx.stroke()

        let s_point = {
            x: 0,
            y: 0
        }
        let e_point = {
            x: 0,
            y: 0
        }
        let angles = []

        for (let index = 0; index <= this.ticks_number; index++) {
            let d_angle = this.start_end_angle[1] - this.start_end_angle[0]
            angles.push(this.start_end_angle[0] + d_angle / this.ticks_number * index)
        }



        angles.forEach(
            angle => {
                s_point.x = this.position[0] + this.radius * 0.9 * Math.cos(angle)
                s_point.y = this.position[1] + this.radius * 0.9 * Math.sin(angle)
                e_point.x = this.position[0] + this.radius * 1.1 * Math.cos(angle)
                e_point.y = this.position[1] + this.radius * 1.1 * Math.sin(angle)

                ctx.save()
                ctx.strokeStyle = this.color
                ctx.lineWidth = this.lineWidth
                ctx.beginPath()
                ctx.moveTo(s_point.x, s_point.y)
                ctx.lineTo(e_point.x, e_point.y)
                ctx.closePath()
                ctx.stroke()
                ctx.restore()
            }
        )
    }

    draw_indication() {

    }



}



class SolarSystem {

    position = [900, 1600]
    sun_para = {
        name: "sun",
        radius: 0,      //au
        mass: 100000,
        size: 10,
    }
    mass = this.sun_para.mass
    planet_para = [
        {
            name: "Mercury",
            radius: 0.38,      //au
            mass: 10,
            size: 5,
        },
        {
            name: "Vinus",
            radius: 0.72,      //au
            mass: 10,
            size: 5,
        },
        {
            name: "Earth",
            radius: 1,      //au
            mass: 10,
            size: 5,
        },
        {
            name: "Mar",
            radius: 1.52,      //au
            mass: 10,
            size: 5,
        },
        {
            name: "Mu",
            radius: 5.2,      //au
            mass: 10,
            size: 15,
        },
        {
            name: "Saturn",
            radius: 9.5,      //au
            mass: 10,
            size: 8,
        },
        // {
        //     name:"tianwang",
        //     radius:19.2,      //au
        //     mass:10,
        //     size:8,
        // },
        // {
        //     name:"haiwang",
        //     radius:30.1,      //au
        //     mass:10,
        //     size:4,
        // }
    ]

    au = 50  //px

    planets = []

    constructor(game) {
        this.game = game
        this.planet_para.forEach(
            e => {
                let p = new Planet(e)
                e.radius = e.radius * this.au
                p.position = [this.position[0] + e.radius, this.position[1]]
                p.velocity = [0, -1 * Math.sqrt(this.sun_para.mass / e.radius)]
                p.max_number_history_point = (e.radius).toFixed(0)
                console.log(p.max_number_history_point)
                this.planets.push(p)
            }
        )

    }


    update(deltaTime) {
        this.planets.forEach(
            e => {
                let f = this.get_gravity_force(this, e)
                e.update(f, deltaTime)
            }
        )

    }

    get_gravity_force(c1, c2) {
        let dx = c1.position[0] - c2.position[0]
        let dy = c1.position[1] - c2.position[1]
        let r = Math.sqrt(dx * dx + dy * dy)
        return [c1.mass * c2.mass / r / r * dx / r, c1.mass * c2.mass / r / r * dy / r]


    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.sun_para.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        this.planets.forEach(
            e => {
                e.draw()
            }
        )
    }





}

class EarthSystem {

    position = [900, 900]
    sun_para = {
        name: "earth",
        radius: 0,      //au
        mass: 3000,
        size: 10,
    }
    mass = this.sun_para.mass
    planet_para = [
        {
            name: "moon",
            radius: 1,      //au
            mass: this.mass/81,
            size: 5,
        },
        {
            name: "rocket",
            radius: 0.2,      //au
            mass: 1,
            size: 5,
        },
      
    ]

    au = 150  //px

    planets = []
    rokects=[]

    timer=0
    rokect_window=[0,75*5]
    force=[0,3]

    constructor(game) {
        this.game = game
        this.planet_para.forEach(
            e => {
                let p = new Planet(e)
                e.radius = e.radius * this.au
                p.position = [this.position[0] + e.radius, this.position[1]]
                if(e.name!=="rocket"){
                    p.velocity = [0, -1 * Math.sqrt(this.mass / e.radius)]
                    p.max_number_history_point = (e.radius).toFixed(0)
                    this.planets.push(p)
                }
                else{
                    p.velocity = [0, 0]
                    p.max_number_history_point = 100
                    this.rokects.push(p)
                }
            }
        )

    }


    update(deltaTime) {
        this.planets.forEach(
            e => {
                let f = this.get_gravity_force(this, e)
                e.update(f, deltaTime)
            }
        )
        this.rokects.forEach(
            e => {
                let f=[0,0]
                let f2=[0,0]
                this.planets.forEach(
                    p=>{
                        f2=this.get_gravity_force(p,e)
                        f[0]+=f2[0]
                        f[1]+=f2[1]
                    }
                )
                f2=this.get_gravity_force(this,e)
                // console.log(f2)
                f[0]+=f2[0]
                f[1]+=f2[1]

                if(this.timer>=this.rokect_window[0] && this.timer<this.rokect_window[1]){
                    f[0]+=this.force[0]
                    f[1]+=this.force[1]
                    this.timer+=1
                    console.log(f)
                }

                e.update(f, deltaTime)

            }
        )

    }

    get_gravity_force(c1, c2) {
        let dx = c1.position[0] - c2.position[0]
        let dy = c1.position[1] - c2.position[1]
        let r = Math.sqrt(dx * dx + dy * dy)
        return [c1.mass * c2.mass / r / r * dx / r, c1.mass * c2.mass / r / r * dy / r]


    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.sun_para.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        this.planets.forEach(
            e => {
                e.draw()
            }
        )
        this.rokects.forEach(
            e => {
                e.draw()
            }
        )
    }






}









class Rokect {

    size = 50
    color = get_random_Color()

    total_mass = 250


    position = [100, 1700]
    a = [0, 0]
    velocity = [0, 0]
    machine_mass = 200
    fuel_mass = 100
    burn_speed = 0.1       // frame
    gas_speed = 5000
    engine_direction = [0, -1]
    is_engine_open = false

    components = []

    constructor(game) {
        this.game = game

        for (let i = 0; i < 3; i++) {
            this.components.push(new RokectComponent(game))
        }
        this.components[0].is_engine_open = true
        this.total_mass = this.get_total_mass()
    }


    update(deltatime) {
        this.a = [0, 0]
        let a_e = [0, 0]
        this.total_mass = this.get_total_mass()
        if (this.is_engine_open == true && this.fuel_mass > 0) {
            this.fuel_mass -= this.burn_speed
            a_e[0] += this.burn_speed * this.gas_speed * this.engine_direction[0] / this.total_mass
            a_e[1] += this.burn_speed * this.gas_speed * this.engine_direction[1] / this.total_mass
        }

        this.components.forEach(
            (e, i) => {
                if (e.is_split == true) {
                    e.update(deltatime)
                    e.draw()
                }
                else if (e.is_engine_open == true && e.fuel_mass > 0) {
                    e.fuel_mass -= e.burn_speed
                    a_e[0] += e.burn_speed * e.gas_speed * e.engine_direction[0] / this.total_mass
                    a_e[1] += e.burn_speed * e.gas_speed * e.engine_direction[1] / this.total_mass
                }
                else if (e.is_engine_open && e.fuel_mass <= 0) {
                    e.is_engine_open = false
                    e.is_split = true
                    e.velocity = Array.from(this.velocity)
                    e.position = Array.from(this.position)

                    if (i + 1 < this.components.length) {
                        this.components[i + 1].is_engine_open = true
                    }
                }

            }

        )

        let is_main_engine_open = true
        this.components.forEach(
            e => {
                if (e.is_engine_open) {
                    is_main_engine_open = false
                }
            }
        )


        if (is_main_engine_open) {
            this.is_engine_open = true
            this.color = get_random_Color()
        }


        this.a[0] += a_e[0]
        this.a[1] += a_e[1]
        this.a[0] += this.game.physics_para.g[0]
        this.a[1] += this.game.physics_para.g[1]
        this.apply_a(deltatime)




    }

    apply_a(deltatime) {

        this.velocity[0] += this.a[0] * deltatime
        this.velocity[1] += this.a[1] * deltatime

        this.position[0] += this.velocity[0] * deltatime
        this.position[1] += this.velocity[1] * deltatime
    }

    draw() {

        ctx.fillStyle = this.color
        ctx.fillRect(this.position[0] - this.size / 2, this.position[1] - this.size / 2, this.size, this.size)
    }

    get_total_mass() {
        let res = 0
        res = res + this.machine_mass + this.fuel_mass
        this.components.forEach(
            e => {
                if (e.is_split == false) {
                    res = res + e.machine_mass + e.fuel_mass

                }

            }
        )

        return res
    }

}


class RokectComponent {

    position = [100, 1700]
    a = [0, 0]
    velocity = [0, 0]

    machine_mass = 150
    fuel_mass = 200

    burn_speed = 0.3       // frame
    gas_speed = 5000
    engine_direction = [0, -1]

    is_engine_open = false

    is_split = false

    size = 50
    color = get_random_Color()

    constructor(game) {
        this.game = game
    }

    update(deltatime) {

        this.a = [0, 0]
        let a_e = [0, 0]

        if (this.fuel_mass > 0) {
            this.fuel_mass -= this.burn_speed
            this.total_mass -= this.burn_speed
            a_e[0] += this.burn_speed * this.gas_speed * this.engine_direction[0] / this.total_mass
            a_e[1] += this.burn_speed * this.gas_speed * this.engine_direction[1] / this.total_mass
        }

        this.a[0] += a_e[0]
        this.a[1] += a_e[1]
        this.a[0] += this.game.physics_para.g[0]
        this.a[1] += this.game.physics_para.g[1]

        this.apply_a(deltatime)
    }

    apply_a(deltatime) {

        this.velocity[0] += this.a[0] * deltatime
        this.velocity[1] += this.a[1] * deltatime

        this.position[0] += this.velocity[0] * deltatime
        this.position[1] += this.velocity[1] * deltatime
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position[0] - this.size / 2, this.position[1] - this.size / 2, this.size, this.size)
    }

    total_mass() {
        return this.fuel_mass + this.machine_mass
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

        this.ctx.clearRect(this.x, this.y, this.width, this.height)
        this.ctx.fillStyle = this.color
        this.ctx.strokeStyle = this.color
        this.ctx.strokeRect(this.x, this.y, this.width, this.height)
        this.ctx.fillText(this.title, this.x + this.width * 0.05, this.y + this.height * 0.95)

        this.ctx.fillText("Max " + this.y_value_max.toFixed(1), this.x + this.width * 0.05, this.y + this.height * 0.3)

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




class Planet {

    position = [100, 1700]
    a = [0, 0]
    velocity = [0, 0]
    mass = 1
    name = ""
    size = 1
    radius = 1
    color = get_random_Color()

    history_positions = []
    max_number_history_point = 100

    max_tiemr = 20
    timer = this.max_tiemr - 1

    constructor(data) {
        this.size = data.size
        this.radius = data.radius
        this.mass = data.mass

    }

    update(f, deltaTime) {
        this.apply_f(f, deltaTime)


        if (this.timer == this.max_tiemr) {
            this.history_positions.push(Array.from(this.position))
            if (this.history_positions.length > this.max_number_history_point) {
                this.history_positions.shift()
            }
            this.timer = 0
        }
        else {
            this.timer += 1
        }

    }


    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.size, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        ctx.strokeStyle = this.color
        this.history_positions.forEach(
            (e, i) => {
                if (i + 1 < this.history_positions.length) {
                    ctx.beginPath()
                    ctx.moveTo(e[0], e[1])
                    ctx.lineTo(this.history_positions[i + 1][0], this.history_positions[i + 1][1])
                    ctx.closePath()
                    ctx.stroke()

                }
            }
        )




    }


    apply_f(f, deltaTime) {
        this.a = [0, 0]
        this.a[0] += f[0] / this.mass
        this.a[1] += f[1] / this.mass
        this.velocity[0] += this.a[0] * deltaTime
        this.velocity[1] += this.a[1] * deltaTime
        this.position[0] += this.velocity[0] * deltaTime
        this.position[1] += this.velocity[1] * deltaTime
    }


}





class ControlSystem {

    time = 0

    log_interval = 500 //  500/ms
    log_timer = 0

    k1 = 1
    k2 = 1
    k3 = 1

    y_list = [[0, 0, 0]]  //[ [y,y',y'' ],... ]
    x_list = [0, 0]  //[ x ,... ]

    y_output = [0, 0, 0]
    x_input = 5  // input

    constructor() {

    }

    update(deltaTime) {

        if (deltaTime !== deltaTime) {
            console.log("here")
            return
        }

        if (deltaTime == 0) {
            return
        }
        this.time += deltaTime
        // console.log(this.time)
        // console.log(this.x_input)

        // if (this.time > 0.5) {
        //     this.x_input = 10
        // }

        let y_new = [0, 0, 0]
        let y_now = this.y_list[this.y_list.length - 1]
        let x_now = this.x_list[this.x_list.length - 1]


        if (this.x_input !== this.x_input) {
            console.log("here")
            return
        }
        let dx = 0
        dx = (this.x_input - x_now) / deltaTime
        // console.log(dx,deltaTime,dx*deltaTime)
        console.log(dx * this.k3)

        y_new[0] = y_now[0] + deltaTime * y_now[1]
        y_new[1] = y_now[1] + deltaTime * y_now[2]
        y_new[2] = this.x_input - y_new[1] * this.k1 - y_new[0] * this.k2 + dx * this.k3
        // y_new[2] = this.x_input  - y_new[1] * this.k1 - y_new[0] * this.k2

        // console.log(this.x_input,y_new)

        y_new.forEach(
            (e, i) => {
                if (y_new[i] !== y_new[i]) {
                    console.log("here" + i)
                    y_new[i] = 0
                }
            }
        )

        // console.log(y_new)
        this.y_output = y_new
        this.y_list.push(y_new)
        this.x_list.push(this.x_input)


    }

    draw() { }

}








let last_time = 0

var game = new Game()




function handle_control_input_bnt() {
    let bar = document.getElementById("control_input").value
    // document.getElementById("control_input").val( "control_input" + bar)
    console.log(bar)
    game.controlSystem.x_input = bar
}

function handle_control_k1_bnt() {
    let bar = document.getElementById("control_k1").value
    // document.getElementById("control_input").val( "control_input" + bar)
    console.log(bar)
    game.controlSystem.k1 = bar
}
function handle_control_k2_bnt() {
    let bar = document.getElementById("control_k2").value
    // document.getElementById("control_input").val( "control_input" + bar)
    console.log(bar)
    game.controlSystem.k2 = bar
}
function handle_control_k3_bnt() {
    let bar = document.getElementById("control_k3").value
    // document.getElementById("control_input").val( "control_input" + bar)
    console.log(bar)
    game.controlSystem.k3 = bar
}






function animate(timeStamp) {

    let deltaTime = timeStamp - last_time
    last_time = timeStamp
    requestAnimationFrame(animate)
    // console.log(deltaTime)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update_and_draw(deltaTime / 1000)
}

animate(0)










