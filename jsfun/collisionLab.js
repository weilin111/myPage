

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
        is_stop = false


        constructor(ctx, canvas) {
            this.ctx = ctx

            this.simulator = new collisionLab(this)

            this.canvas = canvas
            this.display = new Display(this, this.ctx)
            // this.orbitSystem = new OrbitSystem(this)
            this.animate_list = [this.simulator, this.display]
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
        }




    }







    class collisionLab {

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
                mass: 0,
                position: new CANNON.Vec3(canvas.width-150, canvas.height / 2, 0),
                velocity: new CANNON.Vec3(0, 0, 0),
                shape: new CANNON.Box(new CANNON.Vec3(30, 1000, 1000))
            },

            {
                mass: 0,
                position: new CANNON.Vec3(canvas.width/5*1.5+150, canvas.height / 2+300, 0),
                velocity: new CANNON.Vec3(0, 0, 0),
                shape: new CANNON.Box(new CANNON.Vec3(300, 15, 1000))
            },

            {
                mass: 0,
                position: new CANNON.Vec3(canvas.width/4*3, canvas.height / 2-300, 0),
                velocity: new CANNON.Vec3(0, 0, 0),
                shape: new CANNON.Box(new CANNON.Vec3(200, 10, 1000)),
                quaternion: new CANNON.Quaternion(0,0,Math.cos(3.1415/2/2/2),Math.sin(3.1415/2/2/2)  )
            },

            {
                mass: 1,
                position: new CANNON.Vec3(unit * 0.1, height * 0.8, 0),
                velocity: new CANNON.Vec3(0, -10, 0),
                shape: new CANNON.Box(new CANNON.Vec3(100, 20, 1000))
            },


        ]
        platforms = []
        bullets = []
        fps = 0


        bullet_gun_list=[]

        max_bullet_number=150

        constructor(game) {
            this.ctx = game.ctx
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

            let bullet_gun=new BulletGun(this,this.ctx)
            bullet_gun.font_base0=bullet_gun.font_base2
            this.bullet_gun_list.push(bullet_gun)

            bullet_gun=new BulletGun(this,this.ctx)
            bullet_gun.gun_info.x=canvas.width/4*1.5
            bullet_gun.gun_info.y=canvas.height/10*1
            bullet_gun.font_base0=bullet_gun.font_base2
            bullet_gun.chinese="把酒祝东风且共从容垂杨紫陌洛城东总是当时携手处游遍芳丛聚散苦匆匆此恨无穷今年花胜去年红可惜明年花更好知与谁同"
            this.bullet_gun_list.push(bullet_gun)


            bullet_gun=new BulletGun(this,this.ctx)
            bullet_gun.gun_info.x=canvas.width/4*1.0
            bullet_gun.gun_info.y=canvas.height/10*1
            bullet_gun.font_base0="OCPOLY"
            bullet_gun.chinese="ABCDEFGHIJKLMNOPQRSTUVWXYZzxcvbnmasdfghjklqwertyuiop"
            this.bullet_gun_list.push(bullet_gun)




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

            this.bullet_gun_list.forEach(
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
            this.cannon_world.step(1 / 75, deltaTime , 3)
            this.fps = (1000 / deltaTime/1000).toFixed(0)
            // console.log(deltaTime)

            this.bullet_gun_list.forEach(
                e => {
                    e.update()
                }
            )

            if (this.bullets.length > this.max_bullet_number) {
                this.cannon_world.removeBody(this.bullets.shift().body)
                
            }

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


    class Player {
        color = get_random_Color()
        text_color = get_random_Color()
        size = 50
        body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(canvas.width / 2, canvas.height / 2, 0),
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


            // ctx.fillRect(
            //     this.body.position.x - this.size / 2, this.body.position.y - this.size / 2, this.size, this.size
            // )
            ctx.beginPath()
            ctx.arc(this.body.position.x, this.body.position.y, this.size / 2, 0, 2 * Math.PI)
            ctx.fill()
            ctx.closePath()



            // ctx.fillStyle = this.text_color
            // ctx.fillText(this.body.position.x.toFixed(1) + " " + this.body.position.y.toFixed(1), this.body.position.x, this.body.position.y)


            ctx.restore()




        }

        emit_bullet(direction) {

            // let bullet_size=100*Math.random()

            let b = new Bullet(this.timeWorld,
                new CANNON.Vec3(this.body.position.x + this.size / 2 * direction.x * 1.3,
                    this.body.position.y + this.size / 2 * direction.y * 1.3, 0),
                // new CANNON.Vec3(100, 0, 0)
                new CANNON.Vec3(direction.x * this.bullet_speed, direction.y * this.bullet_speed, 0)
            )
            this.timeWorld.cannon_world.addBody(b.body)
            this.timeWorld.bullets.push(b)
            this.timeWorld.game.effect_list.push(new Effect( this.ctx,[this.body.position.x,this.body.position.y]))


        }

        add_bullet_for_fun() {

            for (let i = 0; i < 15; i++) {
                for (let j = 0; j < 20; j++) {
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

    class Input {

        player = null

        press_emit_timer = 0
        press_emit_timer_max = getRandomInt(2,6)

        constructor(player, canvas) {
            this.player = player
            this.canvas = canvas
            this.add_listener(this.player, this)
        }

        offsetX = 0
        offsetY = 0



        add_listener(player, input) {
            let game = player.timeWorld.game

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
                        case 69:

                            input.press_emit_timer += 1
                            if(input.press_emit_timer>input.press_emit_timer_max){
                                input.add_bullet_then_emit(player,input)
                                input.press_emit_timer=0
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
                        case 69:
                            input.press_emit_timer += 1
                            if(input.press_emit_timer>input.press_emit_timer_max){
                                input.add_bullet_then_emit(player,input)
                                input.press_emit_timer=0
                            }
                            break;
                        case 80:
                                // p
                                game.is_stop = !game.is_stop
                                break;
                        case 82:
                            // input.press_emit_timer += 1
                            // if(input.press_emit_timer>input.press_emit_timer_max){
                            //     input.add_bullet_then_emit(player,input)
                            //     input.press_emit_timer=0
                            // }
                            player.add_bullet_for_fun()
                            break;


                        default:
                            break;
                    }



                })

            



            this.canvas.addEventListener("click", function (event) {
                // let x = event.offsetX * 2
                // let y = event.offsetY * 2
                // let dx = x - player.body.position.x
                // let dy = y - player.body.position.y
                // let l = Math.sqrt(dx * dx + dy * dy)
                // let speed = 1
                // ctx.fillText("1", event.offsetX, event.offsetY)
                // console.log(" " + event.offsetX + ":" + event.offsetY)
                // let v = new CANNON.Vec3(dx / l, dy / l, 0)
                // // console.log(dx,dy,v)
                // // console.log(v)
                // player.emit_bullet(v)

                input.offsetX = event.offsetX
                input.offsetY = event.offsetY
                input.add_bullet_then_emit(player, event)
            })
            this.canvas.addEventListener("mousemove", function (event) {

                input.offsetX = event.offsetX
                input.offsetY = event.offsetY
            })


            this.canvas.addEventListener("wheel",
            e => {
                e.preventDefault()
                
                let realPosition = {
                    x: e.offsetX*2*scale_factor - canvasInfo.offsetX,
                    y: e.offsetY*2*scale_factor - canvasInfo.offsetY
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


        add_bullet_then_emit(player, event) {
            let x = event.offsetX * 2 *scale_factor
            let y = event.offsetY * 2 *scale_factor
            let dx = x - player.body.position.x
            let dy = y - player.body.position.y
            let l = Math.sqrt(dx * dx + dy * dy)
            let speed = 1
            ctx.fillText("1", event.offsetX, event.offsetY)
            console.log(" " + event.offsetX + ":" + event.offsetY)
            let v = new CANNON.Vec3(dx / l, dy / l, 0)
            // console.log(dx,dy,v)
            // console.log(v)
            player.emit_bullet(v)
        }



    }



    class BulletGun{


        update_timer=0
        max_update_timer=getRandomInt(30,60)

        color=get_random_Color()
        color2=get_random_Color()

        gun_info={
            x:canvas.width/2,
            y:canvas.height/10,
            dx:1,
            dy:1,
            size:getRandomInt(30,60),
            bullet_text:"",
            bullet_font:"",
        }
        bullet_speed=800

        font_base0="AGENCY"
        font_base1="AGENCY"
        font_base2="SY-LIGHT"

        chinese="嘉元年夏大雨水奉诏祈晴于醴泉宫闻鸣蝉有感而赋云肃祠庭以祗事兮瞻玉宇之峥嵘收视听以清虑兮斋予心以荐诚因以静而求动兮见乎万物之情于时朝雨骤止微风不兴四无云以青天雷曳曳其余声乃席芳药临华轩古木数株空庭草间爰有一物鸣于树颠引清风以长啸抱纤柯而永叹嘒嘒非管泠泠若弦裂方号而复咽凄欲断而还连吐孤韵以难律含五音之自然吾不知其何物其名曰蝉岂非因物造形能变化者邪？出自粪壤慕清虚者邪？凌风高飞知所止者邪？嘉木茂树喜清阴者邪？呼吸风露能尸解者邪？绰约双鬓修婵娟者邪？其为声也不乐不哀非宫非徵胡然而鸣亦胡然而止吾尝悲夫万物莫不好鸣若乃四时代谢百鸟嘤兮；一气候至百虫惊兮；娇儿姹女语鹂庚兮；鸣机络纬响蟋蟀兮转喉弄舌诚可爱兮引腹动股岂勉强而为之兮？至于污池浊水得雨而聒兮；饮泉食土长夜而歌兮彼蟆固若有欲而蚯蚓又何求兮？其余大小万状不可悉名各有气类随其物形不知自止有若争能忽时变以物改咸漠然而无声呜呼！达士所齐万物一类人于其间所以为贵盖已巧其语言又能传于文字是以穷彼思虑耗其血气或吟哦其穷愁或发扬其志意虽共尽于万物乃长鸣于百世予亦安知其然哉？聊为乐以自喜方将考得失较同异俄而阴云复兴雷电俱击大雨既作蝉声遂息"
        chinese_index=0

        


        constructor(simulator,ctx){
            this.ctx=ctx
            this.simulator=simulator
    
        }

        update(){

            this.update_timer+=1
            if(this.update_timer>this.max_update_timer){


                let x = this.gun_info.x
                let y = this.gun_info.y
                let dx = this.gun_info.dx - Math.random()*1.5
                let dy =this.gun_info.dy -Math.random()
                let l = Math.sqrt(dx * dx + dy * dy)
                let speed = 1
                let direction = new CANNON.Vec3(dx / l, dy / l, 0)

                let b = new Bullet(this.simulator,
                    new CANNON.Vec3(
                        x,y, 0),
                    // new CANNON.Vec3(100, 0, 0)
                    new CANNON.Vec3(direction.x * this.bullet_speed, direction.y * this.bullet_speed, 0)
                )

                b.text=this.chinese[ this.chinese_index]
                this.chinese_index+=1
                this.chinese_index=this.chinese_index% this.chinese.length
                b.font_base0=this.font_base0
                

                this.simulator.cannon_world.addBody(b.body)
                this.simulator.bullets.push(b)



                this.update_timer=0

                this.simulator.game.effect_list.push(new Effect( this.ctx,[x,y]))

            }

        }

        draw(){

            ctx.strokeStyle = this.color
            ctx.beginPath()
            ctx.arc(this.gun_info.x, this.gun_info.y, this.gun_info.size, 0 * Math.PI, 2 * Math.PI)
            ctx.closePath()
            ctx.stroke()
            ctx.fillStyle=this.color2
            ctx.fillText(`${this.gun_info.x} ${this.gun_info.y}`,this.gun_info.x,  this.gun_info.y)
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



        text = "null"

        font_base0="AGENCY"
        font_base1="AGENCY"
        font_base2="SY-LIGHT"

        chinese="嘉元年夏大雨水奉诏祈晴于醴泉宫闻鸣蝉有感而赋云肃祠庭以祗事兮瞻玉宇之峥嵘收视听以清虑兮斋予心以荐诚因以静而求动兮见乎万物之情于时朝雨骤止微风不兴四无云以青天雷曳曳其余声乃席芳药临华轩古木数株空庭草间爰有一物鸣于树颠引清风以长啸抱纤柯而永叹嘒嘒非管泠泠若弦裂方号而复咽凄欲断而还连吐孤韵以难律含五音之自然吾不知其何物其名曰蝉岂非因物造形能变化者邪？出自粪壤慕清虚者邪？凌风高飞知所止者邪？嘉木茂树喜清阴者邪？呼吸风露能尸解者邪？绰约双鬓修婵娟者邪？其为声也不乐不哀非宫非徵胡然而鸣亦胡然而止吾尝悲夫万物莫不好鸣若乃四时代谢百鸟嘤兮；一气候至百虫惊兮；娇儿姹女语鹂庚兮；鸣机络纬响蟋蟀兮转喉弄舌诚可爱兮引腹动股岂勉强而为之兮？至于污池浊水得雨而聒兮；饮泉食土长夜而歌兮彼蟆固若有欲而蚯蚓又何求兮？其余大小万状不可悉名各有气类随其物形不知自止有若争能忽时变以物改咸漠然而无声呜呼！达士所齐万物一类人于其间所以为贵盖已巧其语言又能传于文字是以穷彼思虑耗其血气或吟哦其穷愁或发扬其志意虽共尽于万物乃长鸣于百世予亦安知其然哉？聊为乐以自喜方将考得失较同异俄而阴云复兴雷电俱击大雨既作蝉声遂息"


        constructor(timeWorld, position, velocity) {
            this.timeWorld = timeWorld
            this.bodyData.position = position
            this.bodyData.velocity = velocity
            let bullet_size = 40 * Math.random() + 5
            this.bodyData.shape = new CANNON.Box(new CANNON.Vec3(bullet_size, bullet_size, 1000))

            this.body = new CANNON.Body(this.bodyData)

            this.halfExtents = this.bodyData.shape.halfExtents



            if (Math.random() > 0.1) {
                // let index = Math.floor(this.text_char_list.length * Math.random())

                if (Math.random() > 0.5) {
                    this.text = String.fromCharCode( getRandomInt(33,126) )
                    this.font_base0=this.font_base1
                }
                else{
                    // this.text = String.fromCharCode( getRandomInt(19968,40869) )
                    this.text = this.chinese[  getRandomInt(0,this.chinese.length-1) ]
                    this.font_base0=this.font_base2
                
                }
            }


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


            if (this.text == "null") {

                ctx.fillRect(
                    this.body.position.x - this.halfExtents.x, this.body.position.y - this.halfExtents.y, 2 * this.halfExtents.x, 2 * this.halfExtents.y
                )

                ctx.fillStyle = this.color2


                let font = Math.trunc(this.halfExtents.x * 10 / 10) + "px AGENCY"
                ctx.font = font

                ctx.fillText(this.body.position.x.toFixed(1) + " " + this.body.position.y.toFixed(1), this.body.position.x, this.body.position.y)
            }
            else {

                // ctx.fillRect(
                //     this.body.position.x - this.halfExtents.x, this.body.position.y - this.halfExtents.y, 2 * this.halfExtents.x, 2 * this.halfExtents.y
                // )

                ctx.fillStyle = this.color2

                let font = Math.trunc(this.halfExtents.x * 10 / 3) + "px "+ this.font_base0
                ctx.font = font
                // console.log(font, this.halfExtents.x)
                ctx.fillText(this.text, this.body.position.x - this.halfExtents.x / 2, this.body.position.y + this.halfExtents.y)


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


            ctx.fillStyle = this.color
    
            ctx.font = font_mid
            ctx.fillRect(
                this.body.position.x - this.halfExtents.x, this.body.position.y - this.halfExtents.y, 2 * this.halfExtents.x, 2 * this.halfExtents.y
            )
            ctx.fillStyle = this.color2
            ctx.fillText(this.body.position.x.toFixed(1) + " " + this.body.position.y.toFixed(1), this.body.position.x, this.body.position.y)

            ctx.restore()
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
            bullets_number: 0,
            storage: 0,
            player_rotation: 0,
            fps: 0,
            mouse_X: 0,
            mouse_Y: 0,
        }
        sideBar_data_name = [
            "bullets_number",
            "storage",
            "player_rotation",
            "fps",
            "mouse_X",
            "mouse_Y",
        ]


        dataManager_data_name = [
            "storage",
            "player_rotation",
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


            this.data.bullets_number = data_source.bullets.length
            this.data.fps = data_source.fps
            this.data.mouse_X = data_source.player.input.offsetX
            this.data.mouse_Y = data_source.player.input.offsetY
            this.data.player_rotation = (data_source.player.angle / Math.PI * 180).toFixed(1)
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







