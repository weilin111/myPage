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


    display = null


    constructor() {
        this.display = new Display(this, ctx_sideBar)
        this.randomLab=new randomLab(this)
    }


    update_and_draw(deltaTime) {

        this.randomLab.update_and_draw()

        this.display.draw()
        this.display.update()

    }


}



class randomLab{

    constructor(game){
        this.game=game
        this.randomWalk1d=new randomWalk1d()
        this.randomWalk2d=new randomWalk2d()
    }

    update_and_draw(){
        // this.randomWalk1d.update()
        // this.randomWalk1d.draw()

        [...[this.randomWalk1d],this.randomWalk2d].forEach(
            e=>{
                e.update()
                e.draw()
            }
        )
        
    }


}
class randomWalk1d{

    update_freq=30 
    timer=0

    episode_number=0
    


    reset_position=[canvas.width/2,canvas.height/2-800]
    position=[this.reset_position[0],this.reset_position[1]]

    position_history=[]
    position_index=0
    
    // end=false
    
    step_length=100
    boundary=this.step_length*2
    walk_range=[canvas.width/2-this.boundary,canvas.width/2+this.boundary]
    
    now_step_number=0
    
    right_prob=0.5
    color=get_random_Color()
    boundary_color=get_random_Color()

    constructor(randomLab){
        this.randomLab=randomLab
        this.position_history.push([this.position[0],this.position[1]])

    }

    update(){
        this.timer=(this.timer+1)%this.update_freq
        if(this.timer!=0){
            return
        } 
        
        if (Math.random()<this.right_prob){
            this.position[0]+=this.step_length
            this.position_index+=1
        }
        else{
            this.position[0]-=this.step_length
            this.position_index-=1
        }
        this.now_step_number+=1
        this.position_history.push([this.position[0],this.position[1]])

        if(this.position[0]>this.walk_range[0] &&  this.position[0]<this.walk_range[1]){
            
        }
        else{
            this.reset()
        }




    }
    draw(){
        ctx.fillStyle=this.color
        let size=20
        ctx.font=font_mid
        ctx.fillRect(this.position[0]-size/2,this.position[1]-size/2,size,size)
        ctx.fillText(""+this.position_index,this.position[0],this.position[1])
        this.draw_boundary()

        ctx.strokeStyle=this.color
        ctx.lineWidth=5
        // ctx.beginPath()
        this.position_history.forEach(
            (e,i)=>{
                if(i+1<this.position_history.length){
                    ctx.moveTo(e[0],e[1])
                    // console.log(e[0])
                    ctx.lineTo(this.position_history[i+1][0],this.position_history[i+1][1])
                }
            }
            )
            ctx.stroke()



        }

    draw_boundary(){
        let size=30
        ctx.fillStyle=this.boundary_color
        ctx.fillRect(this.walk_range[0]-size/2,this.position[1]-size/2,size,size)
        ctx.fillRect(this.walk_range[1]-size/2,this.position[1]-size/2,size,size)

    }


    reset(){
        this.position=[this.reset_position[0],this.reset_position[1]]
        this.position_history=[]
        this.now_step_number=0
        this.position_index=0
        this.position_history.push([this.position[0],this.position[1]])

    }

}
class randomWalk2d{

    update_freq=3
    timer=0
    episode_number=0

    
    step_length=80


    reset_position=[canvas.width/2,canvas.height/2]


    start_position_index=[0,0]
    start_position=[
        canvas.width/2+this.start_position_index[0]*this.step_length,
        canvas.height/2+this.start_position_index[1]*this.step_length
    ]

    position=[this.start_position[0],this.start_position[1]]
    position_history=[]
    position_index=[0,0]
    
    // end=false
    
    boundary={
        x:9,
        y:4,
    }
    walk_range=[
        [this.reset_position[0]-this.step_length*this.boundary.x,this.reset_position[0]+this.step_length*this.boundary.x],
        [this.reset_position[1]-this.step_length*this.boundary.y,this.reset_position[1]+this.step_length*this.boundary.y],
    ]
    
    now_step_number=0
    


    color=get_random_Color()
    boundary_color=get_random_Color()
    // arrive_log_color=get_random_Color()
    arrive_log_color="hsl(0,100%,50%)"
    total_step=0


    position_arrive_history={
        // "":{position:[0,0],count:0}
    }
    position_arrive_max_count=0
    avg_life=0
    max_life=0

    constructor(randomLab){
        this.randomLab=randomLab

        this.position_history.push([this.position[0],this.position[1]])

    }

    update(){
        this.timer=(this.timer+1)%this.update_freq
        if(this.timer!=0){
            return
        } 
        
        let action=this.get_action()

        this.position_index[0]+=action[0]
        this.position_index[1]+=action[1]

        this.arrive_log()

        this.position[0]+=this.step_length*action[0]
        this.position[1]+=this.step_length*action[1]

        this.now_step_number+=1
        this.total_step+=1
        this.position_history.push([this.position[0],this.position[1]])

        if (this.check_is_out()==true){
            this.reset()
        }



    }



    arrive_log(){
        if(!this.position_arrive_history[""+this.position]){
            this.position_arrive_history[""+this.position]={
                position:[this.position[0],this.position[1]],
                count:0
            }
        }

        this.position_arrive_history[""+this.position].count+=1
        this.position_arrive_max_count=Math.max(this.position_arrive_max_count,this.position_arrive_history[""+this.position].count)

    }


    draw_arrive_log(){

        let a=0
        let a_max=250
        
        ctx.fillStyle=this.arrive_log_color
        Object.values(this.position_arrive_history).forEach(
            e=>{
                a=(this.position_arrive_max_count-e.count)/this.position_arrive_max_count *a_max
                let color=`hsl(${a},100%,50%)`
                ctx.fillStyle=color
                ctx.fillText(""+e.count,e.position[0],e.position[1])
            }
        )

    }


    draw_text(){
        // ctx.fillStyle=this.color
        let y_padding=50
        let texts=[
            `episode:${this.episode_number}`,
            `total step:${this.total_step}`,
            `average life:${this.avg_life}`,
            `size:[${this.boundary.x*2},${this.boundary.y*2}]`,
            `start position:[ ${this.start_position_index[0]}, ${this.start_position_index[1]} ]`,
        ]

        texts.forEach(
            (e,i)=>{
                ctx.fillText(e,this.walk_range[0][0],this.walk_range[1][1]+y_padding*(i+1) )
            }
        )

    }


    draw(){
        ctx.fillStyle=this.color
        let size=20
        ctx.font=font_mid
        ctx.fillRect(this.position[0]-size/2,this.position[1]-size/2,size,size)
        ctx.fillText(""+this.position_index,this.position[0],this.position[1])
        
        ctx.strokeStyle=this.color
        ctx.lineWidth=5
        // ctx.beginPath()
        this.position_history.forEach(
            (e,i)=>{
                if(i+1<this.position_history.length){
                    ctx.moveTo(e[0],e[1])
                    // console.log(e[0])
                    ctx.lineTo(this.position_history[i+1][0],this.position_history[i+1][1])
                }
            }
            )
            ctx.stroke()
            
            
        this.draw_boundary()
        this.draw_arrive_log()
        this.draw_text()
            
        }

    draw_boundary(){
        // ctx.strokeStyle=
        let width= this.walk_range[0][1]-this.walk_range[0][0]
        let height=this.walk_range[1][1]-this.walk_range[1][0]
        ctx.beginPath()
        ctx.strokeRect(this.walk_range[0][0],this.walk_range[1][0],width,height)
        ctx.closePath()
        ctx.stroke()
    }


    reset(){
        this.position=[this.start_position[0],this.start_position[1]]
        this.position_history=[]
        this.position_index=[0,0]
        this.position_history.push([this.position[0],this.position[1]])
        this.episode_number+=1
        this.max_life=Math.max(this.max_life,this.now_step_number)
        this.avg_life=(this.avg_life*(this.episode_number-1) +this.now_step_number)/this.episode_number
        this.now_step_number=0
    }

    get_action(){
        let actions=[
            [0,1],
            [1,0],
            [0,-1],
            [-1,0],
        ]

        let index=Math.floor(Math.random()*actions.length)
        return actions[index]
    }

    check_is_out(){
        if( this.position[0]<this.walk_range[0][0] ||this.position[0]>this.walk_range[0][1]  ){
            return true
        }
        if( this.position[1]<this.walk_range[1][0] ||this.position[1]>this.walk_range[1][1]  ){
            return true
        }

        return false
    }

}

class ExpMaker{}



class Hist{}


class Display {


    game = null
    data = {
        now_step_number: 0,
        speed: 0,
        avg_life:0,
        episode:0,
        max_life:0,
    }
    sideBar_data_name = [
        "now_step_number",
    ]

    color = get_random_Color()

    dataManager_data_name = [
        "now_step_number",
        "avg_life",
        "max_life",
        "episode",

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

        this.timer-=1
        if (this.timer == 0) { this.draw_dataManager() 
            this.timer=this.max_timer }

    }

    update() {
        this.data.now_step_number=this.game.randomLab.randomWalk1d.now_step_number
        this.data.avg_life=this.game.randomLab.randomWalk2d.avg_life
        this.data.max_life=this.game.randomLab.randomWalk2d.max_life
        this.data.episode=this.game.randomLab.randomWalk2d.episode_number
        
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

        this.ctx.fillText("Max " + (this.y_value_max/1.4).toFixed(1), this.x + this.width * 0.05, this.y + this.height * 0.3)

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

var game = new Game()




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



function animate(timeStamp) {

    requestAnimateId = requestAnimationFrame(animate)
    let deltaTime = timeStamp - last_time
    last_time = timeStamp
    if (deltaTime > 300) {
        return
    }
    gameTime += deltaTime
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update_and_draw(deltaTime/1000)
}




animate(0)










