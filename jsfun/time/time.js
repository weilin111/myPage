

var canvas = document.getElementById("canvas1")
var canvas_sideBar = document.getElementById("canvas2")

var canvas_dataManager = document.getElementById("canvas3")
var ctx_dataManager = canvas_dataManager.getContext("2d")


scale=window.devicePixelRatio
console.log(scale)
unit=500*scale*0.8
height=unit*1

canvas_dataManager.width = unit*0.25
canvas_dataManager.height = height

canvas.width = unit*1.25
canvas.height = height

canvas_sideBar.width = unit*0.25
canvas_sideBar.height = height




var ctx = canvas.getContext("2d")
var ctx_sideBar = canvas_sideBar.getContext("2d")



let font0 = "14px AGENCY"
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


    constructor() {

        this.timeWorld = new TimeWorld(this)
        this.display = new Display(this, ctx_sideBar)

    }

    update_and_draw(deltaTime) {
        // console.log(deltaTime)

        this.timeWorld.update(deltaTime)
        this.timeWorld.draw()

        this.display.update()
        this.display.draw()
    }


}



class Display {


    game = null
    color = get_random_Color()
    data = {
        bullets_number: 0,
        storage: 0,
        player_rotation: 0,
        fps: 0,

    }
    sideBar_data_name = [
        "bullets_number",
        "storage",
        "player_rotation",
        "fps",
    ]



    dataManager_data_name = [
        "storage",
        "player_rotation",

    ]

    max_timer = 30
    timer = this.max_timer - 1
    data_managers = []

    constructor(game, ctx) {
        this.game = game
        this.ctx = ctx
        this.dataManager_data_name.forEach(
            (e, i) => {
                let width = canvas_sideBar.width*1.0
                let height = canvas_sideBar.height*0.15
                let x = width*0.05
                let y = height*0.05
                this.data_managers.push(new DataManager(ctx_dataManager, 0, 20 + i * height*1.1, width, height))
            }
        )
    }

    draw() {

        this.ctx.clearRect(0, 0, 600, 1800)
        // this.ctx.fillStyle = "#ffffffbb"
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.draw_sideBar()

        if (this.timer == 0) { this.draw_dataManager() }

    }

    update() {

        this.data.bullets_number = this.game.timeWorld.bullets.length
        this.data.fps = this.game.timeWorld.fps
        this.data.player_rotation = this.game.timeWorld.player.angle / Math.PI * 180
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

        let marginY = 20
        let width = canvas_sideBar.width*1.1
        let height = canvas_sideBar.height*0.1
        let x = width*0.05
        let y = height*0.05
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










class TimeWorld {


    platform_datas = [
        {
            mass: 0,
            position: new CANNON.Vec3(canvas.width / 2, canvas.height, 0),
            velocity: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Box(new CANNON.Vec3(canvas.width / 2, 40, 1000))
        },
        {
            mass: 0,
            position: new CANNON.Vec3(900, 1700, 0),
            velocity: new CANNON.Vec3(0, 0, 0),
            shape: new CANNON.Box(new CANNON.Vec3(50, 10, 1000))
        },

        {
            mass: 1,
            position: new CANNON.Vec3(unit*0.1, height*0.8, 0),
            velocity: new CANNON.Vec3(0, -10, 0),
            shape: new CANNON.Box(new CANNON.Vec3(100, 20, 1000))
        },

    ]
    platforms = []
    bullets = []
    fps=0

    constructor(game) {
        this.game = game
        this.player = new Player(this)


        this.cannon_world = new CANNON.World()
        this.cannon_world.addBody(this.player.body)
        this.cannon_world.gravity = new CANNON.Vec3(0, 100, 0)

        this.platform_datas.forEach(
            p_data => {
                let p = new Platform(this, p_data)
                this.platforms.push(p)
                this.cannon_world.addBody(p.body)
            }
        )

    }



    update(deltaTime) {
        this.cannon_world.step(1 / 75, deltaTime / 1000, 3)
        this.fps=(1000/deltaTime).toFixed(0)
    }



    draw() {

        this.player.draw()

        this.platforms.forEach(
            e => {
                e.draw()
            }
        )


        this.bullets.forEach(
            e => {
                e.draw()
            }
        )

    }

    set_scroll(offset) {
        this.platforms.forEach(
            e => {
                e.body.position.x += offset
            }
        )
        this.bullets.forEach(
            e => {
                e.body.position.x += offset
            }
        )
    }



}





class Backgournd {

    constructor(game) { }
    update() { }
    draw() { }

}

class Player {
    color = get_random_Color()
    text_color = get_random_Color()
    size = 50
    body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(canvas.width/2, canvas.height/2, 0),
        velocity: new CANNON.Vec3(0, -10, 0),
        shape: new CANNON.Box(new CANNON.Vec3(this.size / 2, this.size / 2, 1000))
    })

    bullet_speed = 800
    angle = 0
    constructor(timeWorld) {
        this.timeWorld = timeWorld
        this.input = new Input(this, canvas)



    }
    update(deltaTime) { }

    draw() {
        ctx.save()
        ctx.translate(this.body.position.x, this.body.position.y)
        if (this.body.quaternion.z > 0) {
            this.angle = Math.acos(this.body.quaternion.w) * 2
        }
        else {
            this.angle = 2 * Math.PI - Math.acos(this.body.quaternion.w) * 2

        }
        ctx.rotate(this.angle)
        // console.log(this.body.quaternion)
        ctx.translate(-1 * this.body.position.x, -1 * this.body.position.y)
        ctx.fillStyle = this.color
        ctx.font = font_mid
        ctx.fillRect(
            this.body.position.x - this.size / 2, this.body.position.y - this.size / 2, this.size, this.size
        )
        ctx.fillStyle = this.text_color
        ctx.fillText(this.body.position.x.toFixed(1) + " " + this.body.position.y.toFixed(1), this.body.position.x, this.body.position.y)
        ctx.restore()

    }

    emit_bullet(direction) {
        let b = new Bullet(this.timeWorld,
            new CANNON.Vec3(this.body.position.x + this.size / 2 * direction.x, this.body.position.y + this.size / 2 * direction.y, 0),
            // new CANNON.Vec3(100, 0, 0)
            new CANNON.Vec3(direction.x * this.bullet_speed, direction.y * this.bullet_speed, 0)
        )
        this.timeWorld.cannon_world.addBody(b.body)
        this.timeWorld.bullets.push(b)

    }

    add_bullet_for_fun() {

        for (let i = 0; i < 15; i++) {
            for (let j = 0;j < 20; j++) {
                let b = new Bullet(this.timeWorld,
                    new CANNON.Vec3(200 + i * 50, 200 + j * 50, 0),
                    new CANNON.Vec3(0, 0, 0),
                )
                this.timeWorld.cannon_world.addBody(b.body)
                this.timeWorld.bullets.push(b)
            }
        }


    }



}


class Bullet {
    color = get_random_Color()
    color2 = get_random_Color()
    angle = 0
    // size = 50
    bodyData = {
        mass: 0.1,
        position: new CANNON.Vec3(0, 0, 0),
        velocity: new CANNON.Vec3(0, 0, 0),
        shape: new CANNON.Box(new CANNON.Vec3(10, 10, 1000))
    }


    text="null"

    text_char_list=["a","A","B"]

    constructor(timeWorld, position, velocity) {
        this.timeWorld = timeWorld
        this.bodyData.position = position
        this.bodyData.velocity = velocity
        this.body = new CANNON.Body(this.bodyData)
        this.halfExtents = this.bodyData.shape.halfExtents

        if (Math.random()>0.3){
            this.text="A"
        }
        this.text="A"

    }



    update(deltaTime) { }

    draw() {


        ctx.fillStyle = this.color
        ctx.font = font_mid

        ctx.save()
        ctx.translate(this.body.position.x, this.body.position.y)

        if (this.body.quaternion.z > 0) {
            this.angle = Math.acos(this.body.quaternion.w) * 2
        }
        else {
            this.angle = 2 * Math.PI - Math.acos(this.body.quaternion.w) * 2

        }
        ctx.rotate(this.angle)


        ctx.translate(-1 * this.body.position.x, -1 * this.body.position.y)

        if(this.text=="null"){

            ctx.fillRect(
                this.body.position.x - this.halfExtents.x, this.body.position.y - this.halfExtents.y, 2 * this.halfExtents.x, 2 * this.halfExtents.y
            )
    
            ctx.fillStyle = this.color2
    
            ctx.fillText(this.body.position.x.toFixed(1) + " " + this.body.position.y.toFixed(1), this.body.position.x, this.body.position.y)
        }
        else{

            // ctx.fillRect(
            //     this.body.position.x - this.halfExtents.x, this.body.position.y - this.halfExtents.y, 2 * this.halfExtents.x, 2 * this.halfExtents.y
            // )
            // ctx.fillStyle = this.color2
            
            ctx.fillText(this.text,this.body.position.x,this.body.position.y)

    
        }

        ctx.restore()

    }

}



class Platform {
    color = get_random_Color()
    color2 = get_random_Color()
    // size = 50


    constructor(timeWorld, bodyData) {
        this.timeWorld = timeWorld
        this.body = new CANNON.Body(bodyData)
        this.halfExtents = bodyData.shape.halfExtents
        console.log(bodyData)

    }
    update(deltaTime) { }

    draw() {
        ctx.fillStyle = this.color
        ctx.font = font_mid
        ctx.fillRect(
            this.body.position.x - this.halfExtents.x, this.body.position.y - this.halfExtents.y, 2 * this.halfExtents.x, 2 * this.halfExtents.y
        )
        ctx.fillStyle = this.color2
        ctx.fillText(this.body.position.x.toFixed(1) + " " + this.body.position.y.toFixed(1), this.body.position.x, this.body.position.y)

    }

}









class Server { }

class Input {

    player = null

    constructor(player, canvas) {
        this.player = player
        this.canvas = canvas
        this.add_listener(this.player)
    }





    add_listener(player) {
        window.addEventListener("keypress",
            e => {
                // console.log(e, e.keyCode)
                this.player.body.velocity.x = 0
                this.player.body.velocity.y = 0
                switch (e.keyCode) {
                    case 100:
                    case 68:
                        if (this.player.body.position.x > canvas.width * 0.85) {
                            // this.player.timeWorld.scroll_offset -= 10
                            this.player.timeWorld.set_scroll(-10)
                        }
                        else {
                            this.player.body.position.x += 10
                        }
                        break;
                    case 97:
                    case 65:
                        if (this.player.body.position.x < canvas.width * 0.15) {
                            // this.player.timeWorld.scroll_offset += 10
                            this.player.timeWorld.set_scroll(10)
                        }
                        else {
                            this.player.body.position.x -= 10
                        }
                        break;
                    case 115:
                    case 83:
                        this.player.body.position.y += 10
                        break;
                    case 119:
                    case 87:
                        this.player.body.position.y -= 20
                        break;

                    default:
                        break;
                }



            })

        window.addEventListener("keydown",
            e => {
                // console.log(e, e.keyCode)
                this.player.body.velocity.x = 0
                this.player.body.velocity.y += 0
                console.log(e.keyCode)
                switch (e.keyCode) {

                    case 70:
                        this.player.body.position.x += 50
                        break;

                    default:
                        break;
                }



            })

        this.canvas.addEventListener("click", function (event) {
            let x = event.offsetX
            let y = event.offsetY
            let dx = x - this.player.body.position.x
            let dy = y - this.player.body.position.y
            let l = Math.sqrt(dx * dx + dy * dy)
            let speed = 1
            ctx.fillText("1", event.offsetX, event.offsetY)
            console.log(" " + event.offsetX + ":" + event.offsetY)
            console.log(" " + player.body.position.x + ":" + player.body.position.y)
            let v = new CANNON.Vec3(dx / l, dy / l, 0)
            // console.log(dx,dy,v)
            // console.log(v)
            this.player.emit_bullet(v)



        })
    }

}







// basic  class
class State { }


class PlayerState { }



let last_time = 0
var game = new Game()

function animate(timeStamp) {

    let deltatime = timeStamp - last_time
    last_time = timeStamp
    // console.log(timeStamp)

    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#ff0000aa"
    ctx.fillRect(0, 0, canvas.width, canvas.height)



    game.update_and_draw(deltatime)

}

animate()



