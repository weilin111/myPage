

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

            this.simulator = new funfontLab(this)

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





    class funfontLab {

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

            this.graph_list.push(new fontLooper())
            this.graph_list.push(new fontLooperArrayManager())

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


    class fontLooper{
        width = canvas.width * 0.10
        draw_info = {
            x: canvas.width * 0.85,
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


        font_info={
            font:"SY-LIGHT",
            char_list:"嘉元年夏大雨水奉诏祈晴于醴泉宫闻鸣蝉有感而赋云肃祠庭以祗事兮瞻玉宇之峥嵘收视听以清虑兮斋予心以荐诚因以静而求动兮见乎万物之情于时朝雨骤止微风不兴四无云以青天雷曳曳其余声乃席芳药临华轩古木数株空庭草间爰有一物鸣于树颠引清风以长啸抱纤柯而永叹嘒嘒非管泠泠若弦裂方号而复咽凄欲断而还连吐孤韵以难律含五音之自然吾不知其何物其名曰蝉岂非因物造形能变化者邪？出自粪壤慕清虚者邪？凌风高飞知所止者邪？嘉木茂树喜清阴者邪？呼吸风露能尸解者邪？绰约双鬓修婵娟者邪？其为声也不乐不哀非宫非徵胡然而鸣亦胡然而止吾尝悲夫万物莫不好鸣若乃四时代谢百鸟嘤兮一气候至百虫惊兮娇儿姹女语鹂庚兮鸣机络纬响蟋蟀兮转喉弄舌诚可爱兮引腹动股岂勉强而为之兮？至于污池浊水得雨而聒兮饮泉食土长夜而歌兮彼蟆固若有欲而蚯蚓又何求兮？其余大小万状不可悉名各有气类随其物形不知自止有若争能忽时变以物改咸漠然而无声呜呼！达士所齐万物一类人于其间所以为贵盖已巧其语言又能传于文字是以穷彼思虑耗其血气或吟哦其穷愁或发扬其志意虽共尽于万物乃长鸣于百世予亦安知其然哉？聊为乐以自喜方将考得失较同异俄而阴云复兴雷电俱击大雨既作蝉声遂息",
        }

        is_stroke=false

        update_info={
            update_timer_max:getRandomInt(10,35),
            update_timer:0
        }

        char_index=0

        linewidth=getRandomInt(3,13)

        constructor(draw_info,font_info,update_info){

            if (draw_info){ this.draw_info=draw_info}
            if (font_info){ this.font_info=font_info}
            if (update_info){ this.update_info=update_info}

            if (Math.random()>0.5){
                this.is_stroke=true
            }
        }

        update(){

            this.update_info.update_timer+=1
            this.update_info.update_timer%=this.update_info.update_timer_max
            if (this.update_info.update_timer==0){
                this.char_index=(this.char_index+1)%this.font_info.char_list.length
                this.update_timer_max=getRandomInt(5,15)
                let temp=[false,true]
                this.is_stroke= temp[getRandomInt(0,temp.length-1)]
            }
            // this.color=get_random_Color()
            // this.color1=get_random_Color()
        }


        draw(){
            ctx.lineWidth = this.linewidth

            ctx.strokeStyle = this.color
            // ctx.strokeRect(this.draw_info.x,
            //     this.draw_info.y,
            //     this.draw_info.width,
            //     this.draw_info.height
            // )

            ctx.strokeStyle=this.color
            ctx.fillStyle=this.color2

            ctx.font= Math.trunc(this.draw_info.width) + `px ${this.font_info.font}`
            let char=this.font_info.char_list[this.char_index]
            
            if (this.is_stroke){

                ctx.strokeText(char,this.draw_info.x,this.draw_info.y+this.draw_info.height)
            }
            else{
                ctx.fillText(char,this.draw_info.x,this.draw_info.y+this.draw_info.height)
            }


        }
        
    }

    class arrayManager{
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
                    // let temp_grid=new attractorPointSet(draw_info)
                    // temp_grid.draw_square_width=2.5
                    // this.grid_list.push(temp_grid)

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
            ctx.strokeRect(this.draw_info.x,
                this.draw_info.y,
                this.draw_info.width,
                this.draw_info.height
            )
            this.grid_list.forEach(
                e=>{
                    e.draw()
                }
            )



        }
        
    }



    class fontLooperArrayManager{
        width = canvas.width * 0.4
        draw_info = {
            x: canvas.width * 0.1,
            y: canvas.height * 0.15,
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


        font_info_list=[
            {
                font:"SY-LIGHT",
                char_list:"嘉元年夏大雨水奉诏祈晴于醴泉宫闻鸣蝉有感而赋云肃祠庭以祗事兮瞻玉宇之峥嵘收视听以清虑兮斋予心以荐诚因以静而求动兮见乎万物之情于时朝雨骤止微风不兴四无云以青天雷曳曳其余声乃席芳药临华轩古木数株空庭草间爰有一物鸣于树颠引清风以长啸抱纤柯而永叹嘒嘒非管泠泠若弦裂方号而复咽凄欲断而还连吐孤韵以难律含五音之自然吾不知其何物其名曰蝉岂非因物造形能变化者邪？出自粪壤慕清虚者邪？凌风高飞知所止者邪？嘉木茂树喜清阴者邪？呼吸风露能尸解者邪？绰约双鬓修婵娟者邪？其为声也不乐不哀非宫非徵胡然而鸣亦胡然而止吾尝悲夫万物莫不好鸣若乃四时代谢百鸟嘤兮一气候至百虫惊兮娇儿姹女语鹂庚兮鸣机络纬响蟋蟀兮转喉弄舌诚可爱兮引腹动股岂勉强而为之兮？至于污池浊水得雨而聒兮饮泉食土长夜而歌兮彼蟆固若有欲而蚯蚓又何求兮？其余大小万状不可悉名各有气类随其物形不知自止有若争能忽时变以物改咸漠然而无声呜呼！达士所齐万物一类人于其间所以为贵盖已巧其语言又能传于文字是以穷彼思虑耗其血气或吟哦其穷愁或发扬其志意虽共尽于万物乃长鸣于百世予亦安知其然哉？聊为乐以自喜方将考得失较同异俄而阴云复兴雷电俱击大雨既作蝉声遂息",
            },
            {
                font:"SY-LIGHT",
                char_list:"二月三日丕白岁月易得别来行复四年三年不见《东山》犹叹其远况乃过之思何可支！虽书疏往返未足解其劳结昔年疾疫亲故多离其灾徐陈应刘一时俱逝痛可言邪？昔日游处行则连舆止则接席何曾须臾相失！每至觞酌流行丝竹并奏酒酣耳热仰而赋诗当此之时忽然不自知乐也谓百年己分可长共相保何图数年之间零落略尽言之伤心顷撰其遗文都为一集观其姓名已为鬼录追思昔游犹在心目而此诸子化为粪壤可复道哉？观古今文人类不护细行鲜能以名节自立而伟长独怀文抱质恬淡寡欲有箕山之志可谓彬彬君子者矣著《中论》二十余篇成一家之言词义典雅足传于后此子为不朽矣德琏常斐然有述作之意其才学足以著书美志不遂良可痛惜间者历览诸子之文对之抆泪既痛逝者行自念也孔璋章表殊健微为繁富公干有逸气但未遒耳其五言诗之善者妙绝时人元瑜书记翩翩致足乐也仲宣独自善于辞赋惜其体弱不足起其文至于所善古人无以远过昔伯牙绝弦于钟期仲尼覆醢于子路痛知音之难遇伤门人之莫逮诸子但为未及古人自一时之儁也今之存者已不逮矣后生可畏来者难诬然恐吾与足下不及见也年行已长大所怀万端时有所虑至通夜不瞑志意何时复类昔日?已成老翁但未白头耳光武言年三十余在兵中十岁所更非一吾德不及之而年与之齐矣以犬羊之质服虎豹之文无众星之明假日月之光动见瞻观何时易乎？恐永不复得为昔日游也少壮真当努力年一过往何可攀援古人思秉烛夜游良有以也顷何以自娱？颇复有所述造不？东望於邑裁书叙心丕白",
            },
            {
                font:"SY-LIGHT",
                char_list:"天地果无初乎？吾不得而知之也生人果有初乎？吾不得而知之也然则孰为近？曰有初为近孰明之？由封建而明之也彼封建者更古圣王尧舜禹汤文武而莫能去之盖非不欲去之也势不可也势之来其生人之初乎？不初无以有封建封建非圣人意也彼其初与万物皆生草木榛榛鹿豕狉狉人不能搏噬而且无毛羽莫克自奉自卫荀卿有言必将假物以为用者也夫假物者必争争而不已必就其能断曲直者而听命焉其智而明者所伏必众告之以直而不改必痛之而后畏由是君长刑政生焉故近者聚而为群群之分其争必大大而后有兵有德又有大者众群之长又就而听命焉以安其属于是有诸侯之列则其争又有大者焉德又大者诸侯之列又就而听命焉以安其封于是有方伯连帅之类则其争又有大者焉德又大者方伯连帅之类又就而听命焉以安其人然后天下会于一是故有里胥而后有县大夫有县大夫而后有诸侯有诸侯而后有方伯连帅有方伯连帅而后有天子自天子至于里胥其德在人者死必求其嗣而奉之故封建非圣人意也势也夫尧舜禹汤之事远矣及有周而甚详周有天下裂土田而瓜分之设五等邦群后布履星罗四周于天下轮运而辐集合为朝觐会同离为守臣扞城然而降于夷王害礼伤尊下堂而迎觐者历于宣王挟中兴复古之德雄南征北伐之威卒不能定鲁侯之嗣陵夷迄于幽厉王室东徙而自列为诸侯厥后问鼎之轻重者有之射王中肩者有之伐凡伯诛苌弘者有之天下乖戾无君君之心余以为周之丧久矣徒建空名于公侯之上耳得非诸侯之盛强末大不掉之咎欤？遂判为十二合为七国威分于陪臣之邦国殄于后封之秦则周之败端其在乎此矣秦有天下裂都会而为之郡邑废侯卫而为之守宰据天下之雄图都六合之上游摄制四海运于掌握之内此其所以为得也不数载而天下大坏其有由矣亟役万人暴其威刑竭其货贿负锄梃谪戍之徒圜视而合从大呼而成群时则有叛人而无叛吏人怨于下而吏畏于上天下相合杀守劫令而并起咎在人怨非郡邑之制失也汉有天下矫秦之枉徇周之制剖海内而立宗子封功臣数年之间奔命扶伤之不暇困平城病流矢陵迟不救者三代后乃谋臣献画而离削自守矣然而封建之始郡国居半时则有叛国而无叛郡秦制之得亦以明矣继汉而帝者虽百代可知也唐兴制州邑立守宰此其所以为宜也然犹桀猾时起虐害方域者失不在于州而在于兵时则有叛将而无叛州州县之设固不可革也或者曰封建者必私其土子其人适其俗修其理施化易也守宰者苟其心思迁其秩而已何能理乎？余又非之周之事迹断可见矣列侯骄盈黩货事戎大凡乱国多理国寡侯伯不得变其政天子不得变其君私土子人者百不有一失在于制不在于政周事然也秦之事迹亦断可见矣有理人之制而不委郡邑是矣有理人之臣而不使守宰是矣郡邑不得正其制守宰不得行其理酷刑苦役而万人侧目失在于政不在于制秦事然也汉兴天子之政行于郡不行于国制其守宰不制其侯王侯王虽乱不可变也国人虽病不可除也及夫大逆不道然后掩捕而迁之勒兵而夷之耳大逆未彰奸利浚财怙势作威大刻于民者无如之何及夫郡邑可谓理且安矣何以言之？且汉知孟舒于田叔得魏尚于冯唐闻黄霸之明审睹汲黯之简靖拜之可也复其位可也卧而委之以辑一方可也有罪得以黜有能得以赏朝拜而不道夕斥之矣夕受而不法朝斥之矣设使汉室尽城邑而侯王之纵令其乱人戚之而已孟舒魏尚之术莫得而施黄霸汲黯之化莫得而行明谴而导之拜受而退已违矣下令而削之缔交合从之谋周于同列则相顾裂眦勃然而起幸而不起则削其半削其半民犹瘁矣曷若举而移之以全其人乎？汉事然也今国家尽制郡邑连置守宰其不可变也固矣善制兵谨择守则理平矣或者又曰夏商周汉封建而延秦郡邑而促尤非所谓知理者也魏之承汉也封爵犹建晋之承魏也因循不革而二姓陵替不闻延祚今矫而变之垂二百祀大业弥固何系于诸侯哉？或者又以为殷周圣王也而不革其制固不当复议也是大不然夫殷周之不革者是不得已也盖以诸侯归殷者三千焉资以黜夏汤不得而废归周者八百焉资以胜殷武王不得而易徇之以为安仍之以为俗汤武之所不得已也夫不得已非公之大者也私其力于己也私其卫于子孙也秦之所以革之者其为制公之大者也其情私也私其一己之威也私其尽臣畜于我也然而公天下之端自秦始夫天下之道理安斯得人者也使贤者居上不肖者居下而后可以理安今夫封建者继世而理继世而理者上果贤乎下果不肖乎？则生人之理乱未可知也将欲利其社稷以一其人之视听则又有世大夫世食禄邑以尽其封略圣贤生于其时亦无以立于天下封建者为之也岂圣人之制使至于是乎？吾固曰非圣人之意也势也",
            },
            {
                font:"SY-LIGHT",
                char_list:"相国中山公赋秋声以属天官太常伯唱和俱绝然皆得时行道之余兴犹动光阴之叹况伊郁老病者乎？吟之斐然以寄孤愤碧天如水兮窅窅悠悠百虫迎暮兮万叶吟秋欲辞林而萧飒潜命侣以啁啾送将归兮临水非吾土兮登楼晚枝多露蝉之思夕草起寒螿之愁至若松竹含韵梧楸圣脱惊绮疏之晓吹坠碧砌之凉月念塞外之征行顾闺中之骚屑夜蛩鸣兮机杼促朔雁叫兮音书绝远杵续兮何冷冷虚窗静兮空切切如吟如啸非竹非丝合自然之宫徵动终岁之别离废井苔冷荒园露滋草苍苍兮人寂寂树槭槭兮虫咿咿则有安石风流巨源多可平六符而佐主施九流而自我犹复感阴虫之鸣轩叹凉叶之初堕异宋玉之悲伤觉潘郎之幺么嗟乎！骥伏枥而已老鹰在韝而有情聆朔风而心动眄天籁而神惊力将痑兮足受绁犹奋迅于秋声",
            },
            {
                font:"AGENCY",
                char_list:"QWERTYUIOP[]ASDFGHJKL;'ZXCVBNM,./1234567890-=!@#$%^&*()_+qwertyuiop{}asdfghjkl:zxcvbnm<>?",
            },
            {
                font:"OCPOLY",
                char_list:"QWERTYUIOP[]ASDFGHJKL;'ZXCVBNM,./1234567890-=!@#$%^&*()_+qwertyuiop{}asdfghjkl:zxcvbnm<>?",
            },
        ]

        grid_list=[]

        constructor(draw_info){

            if (draw_info){ this.draw_info=draw_info}
            let n_row=getRandomInt(4,25)
            let n_col=getRandomInt(4,25)

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
                    let update_info={
                        update_timer_max:getRandomInt(10,15),
                        update_timer:0
                    }

                    let font_info_index=getRandomInt(0,this.font_info_list.length-1)
                    let font_info=this.font_info_list[font_info_index]
                    let temp_grid=new fontLooper(draw_info  ,font_info , update_info )
                    
                    temp_grid.draw_square_width=2.5
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





    
    class lineMovement{
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







