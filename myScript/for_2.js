class World1 extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
    return  <div  >
        <p> 🍻</p>
        <canvas id={this.props.canvas_id} width="1200" height="800" tabIndex="0">
        </canvas>

    </div>

    }
}

