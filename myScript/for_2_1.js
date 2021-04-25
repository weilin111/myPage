
class Board extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            nodes:[[20,20,"1"],
            [100,100,"2"],
            [200,200,"3"]]
        }
        this.handle_Piece_drag=this.handle_Piece_drag.bind(this)
    }

    handle_Piece_drag(key,x,y){
    
        this.setState(this.state.nodes[key]=[x,y,this.state.nodes[key][2]])
    }

    render(){
        let l=[]
        for (let i=0;i<this.state.nodes.length;i++){
       l.push(<Piece data={this.state.nodes[i]} key={i*1} key_prime={i}  handle_Piece_drag={this.handle_Piece_drag}  />)
        }
        return <div id="forReact_0" style={{width:500,height:500,backgroundColor:"#ff0000"}}>
            {l}
    </div>
    }



}





class Piece extends React.Component{

    constructor(props){
        super(props)
        this.state={
            selected: false
        }
        this.handle_drag=this.handle_drag.bind(this)
    }

    handle_drag(e){
        let x=this.props.data[0]+e.nativeEvent.offsetX
        let y=this.props.data[1]+e.nativeEvent.offsetY
        console.log([x,y])
        this.props.handle_Piece_drag(this.props.key_prime,x,y)
    }
    handle_dragExit(e){
        let x=this.props.data[0]+e.nativeEvent.offsetX
        let y=this.props.data[1]+e.nativeEvent.offsetY
        console.log([x,y])
        this.props.handle_Piece_drag(this.props.key_prime,x,y)
    }


    render(){

        let s={
            left:this.props.data[0],
            top: this.props.data[1],
            width:50,
            height:50,
            position:"relative",
            backgroundColor:"#fff000"
        }
        return  <div draggable="true" style={s} onDrag={this.handle_drag}  onDragEnd={this.handle_drag}>
        {this.props.data[2]}
    </div>
    }

}


ReactDOM.render(<Board  />, document.querySelector('#forReact_1'))


















