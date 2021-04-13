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
            <td style={
                {backgroundColor:"#000000",
                    color:"#ffffff"}
            }>{this.props.row_data[0]}</td>
            <td style={
                {backgroundColor:"#000000",color:"#7fffd4"}
            }>{this.props.row_data[1]}</td>

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
        return <table className="123">
            <thead>
            <tr>
            <th>NAME  </th>
            <th>VALUE </th>
            {/* <th>{this.props.filter_text} </th> */}

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
            filter_text: '',
            is_filter: false
        }
        this.handleFilterChange = this.handleFilterChange.bind(this);

    }

    handleFilterChange(t){
        console.log(this.state.filter_text)

        this.setState(this.state={filter_text:t})
    }

    filter(text){
        return text.indexOf(this.state.filter_text)>=0
    }

    componentDidUpdate(){
        MathJax.Hub.Queue(["Typeset",MathJax.Hub])
        // console.log("mathjax update")
    }

    render(){

        const data=[]
        for(let i=0;i<this.props.data.length;i++){
            let t=this.props.data[i][0]
            if(this.filter(t)){
                data.push(this.props.data[i])
            }
        }

        return <div >
        <Search_bar handleFilterChange={this.handleFilterChange}/>
        <Table data={data} filter_text={this.state.filter_text}/>

        </div>


    }



}

class Search_bar extends React.Component{

    constructor(props){
        super(props)
        this.state={
            value: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("change")
        this.setState({value: event.target.value});
        this.props.handleFilterChange(event.target.value)
      }

      handleSubmit(event){
        console.log("submit")
        event.preventDefault();
        return
      }
    
    filter=function(filter_text,text){
        return true
    }

    render(){
        return <form style={{size:100}} onSubmit={this.handleSubmit}>
            search: <input type="text" value={this.state.value} onChange={this.handleChange} style={{backgroundColor:'#ff0000',color:"#ffffff"}}/>
        </form>

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
["$L_{sun}$","$3.828e26 \\quad [W]$"],
["$T_{CMB}$","$2.7255 \\quad [K]$"],
["$pc$","$ 3.2 \\quad [light year]$"],
["$m_e$","$9.109e-31 \\quad [kg]$"],
["$m_{proton}$","$938.27 \\quad [MeV]$"],
["$\\epsilon_0$","$8.854e-12 \\quad [F/m]$"],
["$\\mu_0$","$1.256e-6 \\quad [H/m]$"],
["$k_B$","$1.38e-23 \\quad [J/K]$"],
["$Einstrin  \\; Equation $","$G_{\\mu\\nu}=8\\pi G T_{\\mu \\nu}  $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"]
]
ReactDOM.render(<TableWithSearch className="cool_table"  data={Table_data}/>, document.querySelector('#forReact_0'))





