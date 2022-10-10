

var canvas = document.getElementById("canvas1")
var canvas_sideBar = document.getElementById("canvas2")
var canvas_dataManager = document.getElementById("canvas3")

canvas.width = 1800
canvas.height = 1800

canvas_sideBar.width = 600
canvas_sideBar.height = 1800

canvas_dataManager.width = 600
canvas_dataManager.height = 1800

var ctx = canvas.getContext("2d")
var ctx_sideBar = canvas_sideBar.getContext("2d")
var ctx_dataManager = canvas_dataManager.getContext("2d")



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




console.log(get_random_Color())




class Game {

    display = null
    metro = null
    effect_list = []

    constructor() {
        this.metro = new Metro(this)
        this.display = new Display(this)
    }


    update_and_draw(deltaTime) {
        this.metro.update_and_draw(deltaTime)
        this.display.update(deltaTime)
        this.display.draw()



        this.effect_list.forEach(
            e => {
                e.update()
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


var canvasInfo = {
    scale: 1,
    scale_step: 0.1,
    max_scale: 3,
    min_scale: 0.1,
    offsetX: 0,
    offsetY: 0,
}

function handle_restore_scale_bnt() {
    canvasInfo = {
        scale: 1,
        scale_step: 0.1,
        max_scale: 3,
        min_scale: 0.05,
        offsetX: 0,
        offsetY: 0,
    }
}


class Input {
    keys = []
    player = null
    constructor(player) {
        this.player = player


        canvas.addEventListener("click", function (event) {
            ctx.fillText("1", event.offsetX, event.offsetY)
            console.log(" " + event.offsetX + ":" + event.offsetY)
            player.destination = [event.offsetX, event.offsetY]
        })

        canvas.addEventListener("wheel",
            e => {
                let realPosition = {
                    x: e.offsetX - canvasInfo.offsetX,
                    y: e.offsetY - canvasInfo.offsetY
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
                    canvasInfo.scale -= scale_step
                }

            }
        )


    }
}


class Collider {


    detectList = []
    constructor() {

    }

    check(c1, c2) {
        let dx = c1.position[0] - c2.position[0]
        let dy = c1.position[1] - c2.position[1]
        if (Math.sqrt(dx * dx + dy * dy) > c1.collider_size + c2.collider_size) {
            return false
        }
        // console.log(Math.sqrt(dx * dx + dy * dy) )

        return true
    }

}



class Player {
    position = [50, 50]
    width = 15
    height = 10
    collider_size = this.width
    destination = [500, 500]
    speed = 5
    direction = [0, 0]
    constructor() {
        this.input = new Input(this)
        this.color = get_random_Color()
    }

    update() {
        // console.log(this.destination[0])
        let dx = this.destination[0] - this.position[0]
        let dy = this.destination[1] - this.position[1]

        length = Math.sqrt(dx * dx + dy * dy)
        if (length < 5) {
            this.position[0] = this.destination[0]
            this.position[1] = this.destination[1]
            return
        }
        this.direction = [dx / length, dy / length]


        this.position[0] += this.direction[0] * this.speed
        this.position[1] += this.direction[1] * this.speed



    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position[0] - this.width / 2, this.position[1] - this.height / 2, this.width, this.height)
    }


    handleOutStation() {

    }

    handleInStation() {

    }
}



class Passenger {

    type = "passenger"
    destination = ""

    state = "walk"  //walk station 
    want_to_take = true

    size = 30

    collider_size = 5
    collider_state = "empty"     // in out empty

    direction = [0, 0]
    speed = 1.5
    collider = null
    position = [0, 0]
    color = get_random_Color()

    metroTrain = null
    metroStation = null

    startStation = null
    endStation = null

    resStationNumber = 5 + Math.round(Math.random() * 10)


    game = null

    constructor(x, y, game) {
        this.position = [x, y]
        this.direction = random_direction()
        this.game = game
    }

    update(deltaTime) {
        if (this.state == "walk") {
            this.walk()
        }
        else if (this.state == "wait") {
        }
        else if (this.state == "railway") {
            this.game.display.metro_time += deltaTime
            this.position = Array.from(this.metroTrain.position)
        }
    }



    draw() {
        if (this.state == "railway") {

        }

        if (this.state == "walk" || this.state == "wait") {
            // ctx.strokeStyle = this.color
            // ctx.beginPath()
            // ctx.arc(this.position[0], this.position[1], this.size, 0 * Math.PI, 2 * Math.PI)
            // ctx.closePath()
            // ctx.stroke()
            ctx.fillStyle = this.color
            ctx.font = this.size + font_icon_prefix
            ctx.fillText("", this.position[0] - this.size / 2, this.position[1] - this.size / 2)
        }

    }

    walk() {
        this.position[0] += this.direction[0] * this.speed
        this.position[1] += this.direction[1] * this.speed
        if (this.position[0] < 0 || this.position[0] > canvas.width) {
            this.direction[0] *= -1
        }

        if (this.position[1] < 0 || this.position[1] > canvas.height) {
            this.direction[1] *= -1
        }
    }


    handleInStation(station) {
        if (this.want_to_take && this.state == "walk") {
            this.state = "wait"
            this.metroStation = station
            station.passengers.push(this)

            station.game.display.serve_people += 1  //UI 显示

        }
    }

    handleInTrainArriveStation(station) {
        if (this.state == "railway") {

            this.game.display.passed_station_number += 1
            this.resStationNumber -= 1
            // this.position = Array.from(station.position)
            this.metroStation = station
            if (this.resStationNumber == 0) {
                // station.passengers.push(this)
                // this.state="wait"
                this.metroTrain.passengers = this.metroTrain.passengers.filter(
                    e => {
                        return e.resStationNumber != 0
                    }
                )
                this.station = null
                this.state = "walk"
                this.want_to_take = false
                this.game.effect_list.push(new Effect(ctx, this.position))  //effect

            }
        }
    }

    handleInTrain(train) {
        if (this.state == "wait") {
            this.state = "railway"
            this.color = get_random_Color()
            this.metroTrain = train
            train.passengers.push(this)
            this.metroStation.passengers = this.metroStation.passengers.filter(
                e => {
                    return e.state == "wait"
                }
            )

        }
    }


    handleOutStation() {

    }

}



class PassengerManager {

    passengers = []
    collider = null
    game = null
    constructor(game, collider) {
        this.collider = collider
        this.game = game
        for (let i = 0; i < 50; i++) {
            this.random_add_passenger()
        }

    }

    random_add_passenger() {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        let p = new Passenger(x, y, this.game)
        this.passengers.push(p)
        this.collider.detectList.push(p)
    }

    update(deltaTime) {
        this.passengers.forEach(e => {
            e.update(deltaTime)
        })
    }

    draw() {
        this.passengers.forEach(e => {
            e.draw()
        })
    }

    check_boundary() {

    }


}


class Display {
    color = get_random_Color()

    serve_people = 0
    passed_station_number = 0
    metro_time = 0

    data = [
        ["Moscow Metro", " " + new Date(), ""],
        ["Station Number", MoscowMetroStations.length, ""],
        ["Passenger Number", 0, ""],
        ["Total Metro Time", 0, "s"],
        ["Game Time", 0, " s"],
        ["Total Passenger Time", 0, " s"],
        ["FPS", 0, ""],
        ["CPU", 0, ""],
        ["STORAGE", 0, "Mb"],
        ["Scale", 1, ""],
        ["Total Distance", 0, " km"],
        ["Passed Station Number", 0, " "],

    ]

    legend_data = [
        ["Line", 1, ""],
        ["Line", 2, ""],
        ["Line", 3, ""],
        ["Line", 4, ""],
        ["Line", 5, ""],
        ["Line", 6, ""],
        ["Line", 7, ""],
        ["Line", 8, ""],
        ["Line", 9, ""],
        ["Line", 10, ""],
        ["Line", 11, ""],
        ["Line", 12, ""],
    ]

    position = [20, 50]
    offset_y = 35
    font = "25px AGENCY"
    data_managers = []

    timer = 29
    max_timer = 30

    index_for_dataManager = [8, 9, 2, 3, 6, 4,11]
    constructor(game) {
        this.game = game
        this.index_for_dataManager.forEach(
            (e, i) => {
                this.data_managers.push(new DataManager(ctx_dataManager, 0, 20 + i * 225, 500, 200))
            }
        )

    }


    update(deltaTime) {
        this.data[4][1] = (gameTime / 1000).toFixed(0)
        this.data[3][1] = (this.metro_time / 1000).toFixed(1)
        this.data[6][1] = Math.round(1000 / deltaTime)
        this.data[2][1] = this.serve_people
        this.data[9][1] = canvasInfo.scale.toFixed(1)
        // this.data[8][1] =( window.performance.memory.totalJSHeapSize / window.performance.memory.jsHeapSizeLimit*100).toFixed(2)
        this.data[8][1] = (window.performance.memory.usedJSHeapSize / 1000000).toFixed(1)
        this.data[11][1] = this.passed_station_number

        if (this.timer < this.max_timer) {
            this.timer += 1
        }
        else {
            this.timer = 0
        }
    }

    draw() {

        ctx.font = this.font
        let offset_y_count = 0
        this.data.forEach(
            e => {
                ctx.fillStyle = this.color
                ctx.fillText(e[0] + " : " + e[1] + e[2], this.position[0], this.position[1] + this.offset_y * offset_y_count)
                offset_y_count += 1
            }
        )
        ctx.fillRect(this.position[0], this.position[1] + offset_y_count * this.offset_y, 300, 3)

        offset_y_count = 0
        this.legend_data.forEach(
            e => {
                ctx.fillStyle = this.game.metro.metro_lines[e[1] - 1].color
                ctx.fillText(e[0] + "  " + e[1] + e[2], this.position[0], canvas.height - this.offset_y * (offset_y_count + 1))
                ctx.fillRect(this.position[0] + 80, canvas.height - this.offset_y * (offset_y_count + 1) - 10, 80, 5)
                offset_y_count += 1
            }
        )
        ctx.font = font0

        ctx_sideBar.clearRect(0, 0, canvas_sideBar.width, canvas_sideBar.height)
        this.draw_sideBar()

        this.draw_map_scale()


        if (this.timer == 0) { this.draw_dataManager() }
    }


    draw_sideBar() {

        let sideBar_data_index = [2, 4, 3, 6, 8, 9,11]
        let marginY = 20
        let width = 500
        let height = 200
        let x = 600 - width
        let y = 50
        let font_mid = height / 5 + "px AGENCY"
        let font_big = height / 1.8 + "px AGENCY"
        sideBar_data_index.forEach(
            index => {

                ctx_sideBar.strokeStyle = this.color
                ctx_sideBar.fillStyle = this.color
                ctx_sideBar.font = font_mid
                ctx_sideBar.lineWidth = 3
                ctx_sideBar.strokeRect(x, y, width, height)
                ctx_sideBar.fillText(this.data[index][0], x + width / 20, y + height * 0.95)
                ctx_sideBar.font = font_big
                ctx_sideBar.fillText(this.data[index][1], x + width / 3.5, y + height / 1.5)
                y += marginY + height
            }

        )

        ctx_sideBar.font = font_icon
        // ctx_sideBar.fillText("FZ", x, y + marginY + height)
        // ctx_sideBar.fillText("SIRIUS", x, y  + height*0.7)
        ctx_sideBar.fillText("f", x, y  + height*0.7)

    }


    draw_map_scale() {

        ctx.fillStyle = this.color
        let x = 0.12 * canvas.width
        ctx.fillRect(x, 0.95 * canvas.height, 1 / this.game.metro.map_scale, 5)
        ctx.font = font_mid
        ctx.fillText("1 KM", x + 1 / this.game.metro.map_scale / 2.5, 0.95 * canvas.height)
        ctx.font = font0



    }

    draw_legend() {

    }

    draw_dataManager() {

        if (this.data_managers.length == 0) {
            return
        }
        // this.data_managers[0].y_list.push(this.data[8][1])
        // this.data_managers[0].title="STORAGE"
        this.data_managers[0].ctx.clearRect(0, 0, canvas_dataManager.width, canvas_dataManager.height)
        this.data_managers.forEach(
            (e, i) => {
                e.y_list.push(this.data[this.index_for_dataManager[i]][1])
                e.title = this.data[this.index_for_dataManager[i]][0]
                e.update()
                e.draw()
            }
        )
    }

}






class MetroStation {

    basic_data = {}
    name = ""
    position = ""
    color = "#0fcdd2"
    size = 15
    collider_size = 10
    collider = null
    scale_factor = 1.4
    passengers = []
    game = null
    constructor(basic_data) {
        this.basic_data = basic_data
        this.name = basic_data.name
        this.position = this.scale(basic_data.position)

    }

    scale(position) {
        return [position[0] * this.scale_factor, position[1] * this.scale_factor]

    }

    update() {
        this.collider.detectList.forEach(
            e => {
                if (this.collider.check(this, e)) {
                    // this.color = get_random_Color()
                    e.handleInStation(this)
                }
            }
        )


    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position[0] - this.size / 2, this.position[1] - this.size / 2, this.size, this.size)
        // ctx.fillRect(this.position[0] , this.position[1] , this.size, this.size)
        ctx.fillText(this.name, this.position[0], this.position[1] - 10)

        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.collider_size, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.stroke()


        this.strokeStyle = this.color

    }



}




class MetroLine {
    name = ""
    lineNumber = 0
    stations = []
    trains = []
    scale = 200
    offset = [350, 150]
    is_circle = false
    color = "#ffffff"
    constructor(stations, lineNumber) {

        this.stations = stations
        this.lineNumber = lineNumber
        this.color = get_random_Color()
        this.trains.push(new MetroTrain(this))
    }

    update(deltaTime) {
        this.stations.forEach((e, index) => {
            e.update()
        });
        this.trains.forEach(
            e => {
                e.update(deltaTime)
            }
        )
    }

    draw() {

        this.stations.forEach((e, index) => {
            e.draw()
        });
        this.trains.forEach(
            e => {
                e.draw()
            }
        )

        this.draw_line()


    }

    draw_line() {
        ctx.beginPath()  // important
        this.stations.forEach((e, index) => {

            if (index < this.stations.length - 1) {

                ctx.strokeStyle = this.color
                ctx.moveTo(e.position[0], e.position[1])
                ctx.lineTo(this.stations[index + 1].position[0], this.stations[index + 1].position[1])
            }
        })
        if (this.is_circle) {
            ctx.moveTo(this.stations[0].position[0], this.stations[0].position[1])
            ctx.lineTo(this.stations[this.stations.length - 1].position[0], this.stations[this.stations.length - 1].position[1])
        }
        // console.log(ctx.strokeStyle)
        ctx.closePath()
        ctx.stroke()
    }


    coor_decode(position) {
        let res = [0, 0]
        res[0] = (position[0] + 1) * this.scale + this.offset[0]
        res[1] = (position[1] - 1) * -1 * this.scale + this.offset[1]
        return res
    }

}


class MetroTrain {

    type = "train"
    metroLine = null
    speed = 600
    train_direction = 1
    station_number = 0


    now_station_index = 0
    next_station_index = 0

    position = [0, 0]
    direction = [0, 0]
    // color=get_random_Color()
    color = "#ffffff"
    running_state = "waiting"    //  waiting running
    waiting_frames = 30
    timer = 0

    size = [10, 50]
    collider_size = 0.2
    collider_state = "empty"     // in out empty
    now_station = null


    passengers = []


    constructor(metroLine) {
        this.metroLine = metroLine
        this.station_number = this.metroLine.stations.length
        this.position = Array.from(this.metroLine.stations[this.now_station_index].position)
        this.direction = get_direction(this.metroLine.stations[this.now_station_index].position, this.metroLine.stations[this.now_station_index + 1].position)
    }


    update(deltaTime) {



        if (this.running_state == "waiting") {
            if (this.timer == 0) {
                this.inStation()

            }
            this.timer += 1
            if (this.timer == this.waiting_frames) {
                this.timer = 0
                this.running_state = "running"
            }
            this.OnWaiting()
            // console.log(this.passengers)

        }
        if (this.running_state == "running") {
            this.OnRunning(deltaTime)
        }




    }

    OnWaiting() {
        this.metroLine.stations[this.now_station_index].passengers.forEach(
            e => {
                if (this.passengers.includes(e) == false) {
                    e.handleInTrain(this)
                    // console.log(e.state)
                }
            }
        )
    }

    OnRunning(deltaTime) {

        this.direction = get_direction(this.metroLine.stations[this.now_station_index].position, this.metroLine.stations[this.next_station_index].position)

        this.position[0] += this.direction[0] * this.speed * deltaTime / 1000
        this.position[1] += this.direction[1] * this.speed * deltaTime / 1000
        let is_in = this.check(this, this.metroLine.stations[this.next_station_index])
        if (is_in) {
            this.color = get_random_Color()
            this.now_station = this.next_station_index
            this.running_state = "waiting"
            return
        }

    }


    draw() {


        ctx.fillStyle = this.color

        ctx.color = "#ffffff"
        let temp = ctx.lineWidth
        ctx.lineWidth = this.size[1]
        ctx.beginPath()
        // ctx.fillRect(this.position[0] - this.size[0] / 2, this.position[1] - this.size[1] / 2, this.size[0], this.size[1])
        ctx.moveTo(this.position[0], this.position[1])
        ctx.lineTo(this.position[0] - this.direction[0] * this.size[0], this.position[1] - this.direction[1] * this.size[0])
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.position[0], this.position[1], this.collider_size, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.lineWidth = temp

        // ctx.font=this.size+font_icon_prefix
        // this.size=50
        // ctx.fillText("t",this.position[0]-this.size/4,this.position[1]-this.size/4)

        ctx.font = "60px AGENCY"
        ctx.fillText(this.passengers.length, this.position[0], this.position[1])
        ctx.font = font0


    }

    inStation() {

        if (this.metroLine.is_circle) {
            this.now_station_index = this.next_station_index
            this.next_station_index = (this.now_station_index + this.train_direction) % (this.metroLine.stations.length)
        }
        else {

            this.now_station_index = this.next_station_index
            this.next_station_index += this.train_direction
            if (this.now_station_index == 0) {
            }
            if (this.next_station_index == this.metroLine.stations.length - 1) {
                this.train_direction = - 1
            }
            if (this.next_station_index == 0) {
                this.train_direction = 1
            }
        }
        this.now_station = this.metroLine.stations[this.now_station_index]
        this.position = Array.from(this.now_station.position)

        this.passengers.forEach(
            e => {
                e.handleInTrainArriveStation(this)
                e.handleInTrain(this)
            }
        )

        // console.log(this.position)
    }



    handlePassenger() {

    }




    handleInStation() {

    }

    handleOutStation() {
        // if (this.metroLine.is_circle) {
        //     this.now_station_index += 1 % (this.metroLine.stations.length - 1)
        //     return
        // }
        // if (this.now_station_index == 0) {
        //     this.train_direction = 1
        // }
        // else if (this.now_station_index == this.metroLine.stations.length - 1) {
        //     this.train_direction *=- 1
        // }
        // this.now_station_index += this.train_direction

        // console.log(this.now_station_index)
        // this.direction=get_direction(this.metroLine.stations[this.now_station_index].position,this.metroLine.stations[this.now_station_index+this.train_direction].position)


    }

    check(c1, c2) {
        let dx = c1.position[0] - c2.position[0]
        let dy = c1.position[1] - c2.position[1]
        if (Math.sqrt(dx * dx + dy * dy) > c1.collider_size + c2.collider_size) {
            return false
        }
        // console.log(Math.sqrt(dx * dx + dy * dy) )

        return true
    }


}





class Building {


    constructor() { }


    update() { }
    draw() { }

}






class Metro {


    lineNumberTobeInit = [1, 2, 3, 4, 5, 6, 7, 8, "8A", 9, 10, 11, 12]
    // lineNumberTobeInit = [5]
    metro_lines = []
    game = null
    metro_station_catalog = {}
    map_scale = 1



    constructor(game) {
        this.game = game
        this.collider = new Collider()
        this.player = new Player()
        this.passengerManager = new PassengerManager(game, this.collider)
        this.metro_init()
    }

    metro_init() {
        this.lineNumberTobeInit.forEach(
            (e) => {
                this.metro_lines.push(this.prepare_line(e))
            }
        )
        this.metro_lines[4].is_circle = true

        this.collider.detectList.push(this.player)

        this.metro_lines.forEach(
            line => {
                line.stations.forEach(
                    e => {
                        this.metro_station_catalog[e.basic_data.name] = e.basic_data

                    }
                )
            }
        )

        this.init_map_scale()



    }


    init_map_scale() {
        let p1 = this.metro_station_catalog["革命广场"].position
        let p2 = this.metro_station_catalog["卢比扬卡"].position

        // console.log( distance(p1,p2))

        this.map_scale = 0.5 / distance(p1, p2)   // 0.5km/100px
    }


    update() {

    }

    update_and_draw(deltaTime) {
        this.metro_lines.forEach(
            (e) => {
                // console.log(deltaTime)
                e.update(deltaTime)
                e.draw()
            }
        )


        this.player.update()
        this.player.draw()

        this.passengerManager.update(deltaTime)
        this.passengerManager.draw()

    }


    prepare_line(lineNumber) {
        let temp = []
        let color = get_random_Color()
        let m = null
        MoscowMetroStations.forEach(
            (e, i) => {
                if (e.lineNumber[0] == lineNumber) {
                    m = new MetroStation(e)
                    m.game = this.game
                    m.color = color
                    m.collider = this.collider
                    temp.push(m)
                }
            }
        )
        let line = new MetroLine(temp, 1)
        line.color = color
        line.game = this.game
        return line
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

function handle_add_passenger() {
    game.metro.passengerManager.random_add_passenger()
}


// `````````````````````````````````  //

var game = new Game()
var last_time = 0
var is_resume = false

function animate(timeStamp) {

    requestAnimateId = requestAnimationFrame(animate)
    let deltaTime = timeStamp - last_time
    last_time = timeStamp
    if (deltaTime > 300) {
        return
    }
    gameTime += deltaTime
    // console.log(deltaTime)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    game.update_and_draw(deltaTime)
    ctx.setTransform(canvasInfo.scale, 0, 0, canvasInfo.scale, canvasInfo.offsetX, canvasInfo.offsetY)
    ctx.stroke()
}


window.onload = () => {
    animate(0)
}



