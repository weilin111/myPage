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

class TableRow extends React.Component{

    constructor(props){
        super(props)
    }

    render(){

        return <tr>
            <td>{this.props.row_data[0]}</td>
            <td>{this.props.row_data[1]}</td>

        </tr>


    }


}


class Table extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const rows=[]
        for(let index=0;index<this.props.data.length;index++){
            rows.push(
                <TableRow row_data={this.props.data[index]}/>
            )
        }
        return <table>
            <thead>
            <tr>
            <th>NAME  </th>
            <th>VALUE </th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>

        </table>

    }
}


class TableWithSearch extends React.Component{

    constructor(props){
        super(props)
        this.state={
            felter_text: '',
            is_filter: false
        }
    }

    render(){

    }



}






let Table_data=[
["$N_A$","$6.023e23$ "],
["$c$","$3e8  \\quad  [m/s]$"],
["$h$","$6.626e-34 \\quad [J/s]$"],
["$e$","$1.6e-19 \\quad [C]$"],
["$G_{Newton}$","$6.67e-11 \\quad [m^3 kg^{-1}s^{-2}]$"],
["$au$","$1.495e11 \\quad [m]$"],
["$M_{sun}$","$1.988e30 \\quad [kg]$"],
["$L_{sum}$","$3.828e26 \\quad [W]$"],
["$T_{CMB}$","$2.7255 \\quad [K]$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"],
["$$","$$"]
]
ReactDOM.render(<Table className="cool_table"  data={Table_data}/>, document.querySelector('#forReact_0'))





