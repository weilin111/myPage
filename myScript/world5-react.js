



class World1 extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
    return  <div  >
        {/* <p> 🍻</p> */}
        <canvas id={this.props.canvas_id} width="1200" height="800" tabIndex="0">
        </canvas>

    </div>

    }
}

for(var i=0;i<11;i++){
    let s="canvas_"+i
    ReactDOM.render(<World1 canvas_id={s} />, document.querySelector('#testReact'+i))

    get_UI()(s)

}
 
