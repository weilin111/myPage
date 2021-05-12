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
                <TableRow row_data={this.props.data[index]}  key={index}/>
            )
        }
        return <table style={{ fontSize:20, borderRadius:10}}  className="123">
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
        return text.toLowerCase().indexOf(this.state.filter_text.toLowerCase())>=0
    }

    componentDidUpdate(){
        MathJax.Hub.Queue(["Typeset",MathJax.Hub])
        // console.log("mathjax update")
    }

    componentDidMount(){
        MathJax.Hub.Queue(["Typeset",MathJax.Hub])
        $.ajax( 
             {url:"https:sirius1334.love/1",
             dataType:"jsonp",
             success: (data)=>{console.log(data) },} )
    }

    render(){

        const data=[]
        for(let i=0;i<this.props.data.length;i++){
            let t=this.props.data[i][0]
            if(this.filter(t)){
                data.push(this.props.data[i])
            }
        }

        return <div key="constant-table" >
        <Search_bar handleFilterChange={this.handleFilterChange}/>
        <Table  data={data} filter_text={this.state.filter_text}/>

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
        return <form style={{  borderRadius:10,marginTop:20 ,size:100}} onSubmit={this.handleSubmit}>
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
["$M_{Chandrasekhar} $","$1.433 \\quad [M_{sum}] $"],
["$H_0 $","$ 67.8 \\quad [km/s/Mpc]$"],
["$N_{atomOfUniverse} $","$ 1e80$"],
["$ $","$ $"],
["$ $","$ $"],
["$\\nabla \\; in\\; xyz \\;Coor $","$(\\partial_x,\\partial_y,\\partial_z ) $"],
["$\\nabla \\; in\\; Cylinder \\;Coor $","$(\\partial_r,\\frac{1}{r}\\partial_\\theta, \\partial_z) $"],
["$\\nabla \\; in\\; Spherical \\;Coor $","$(\\partial_r,\\frac{1}{r}\\partial_\\theta, \\frac{1}{r \\sin\\theta}\\partial_\\phi) $"],

["$\\nabla^2 \\; in\\; xyz \\;Coor $","$ \\partial^2_x+\\partial^2_y+\\partial^2_z  $"],
["$\\nabla^2 \\; in\\; Cylinder \\;Coor $","$  \\frac{1}{r} \\partial_r(r \\partial_r )+\\frac{1}{r^2}\\partial_\\theta^2 +\\partial_z^2           $"],
["$\\nabla^2 \\; in\\; Spherical \\;Coor $","$( \\frac{1/r}\\partial_r^2(r  )+\\frac{1}{r^2 \\sin{\\theta}} \\partial_\\theta(\\sin(\\theta) \\partial_\\theta) +\\frac{1}{r^2 \\sin{\\theta}^2 \\partial_\\phi^2 }        ) $"],

["$\\nabla \\times \\; in\\; xyz \\;Coor $","$( ) $"],
["$\\nabla \\times \\; in\\; Cylinder \\;Coor $","$( ) $"],
["$\\nabla \\times \\; in\\; Spherical \\;Coor $","$( ) $"],

["$\\nabla \\cdot A\\; in\\; xyz \\;Coor $","$\\partial_xA_x+\\partial_yA_y+\\partial_zA_z $"],
["$\\nabla \\cdot A\\; in\\; Cylinder \\;Coor $","$\\frac{1}{r} \\partial_r(rA_r) +\\frac{1}{r}\\partial_{\\theta}A_\\theta +\\partial_zA_z$"],
["$\\nabla \\cdot A\\; in\\; Spherical \\;Coor $","$\\frac{1}{r}\\partial_r^2(rA_r) +\\frac{1}{r \\sin\\theta} \\partial_\\theta(\\sin\\theta A_\\theta )  +\\frac{1}{r \\sin\\theta} \\partial_\\phi A_\\phi$"],
["$ $","$ $"],
["$ $","$ $"],
// ----------------------
["$ $","$\\partial_r \\vec{r}= $"],
["$ $","$\\partial_r \\vec{\\theta}= $"],
["$ $","$\\partial_\\theta \\vec{r}= $"],
["$ $","$\\partial_\\theta \\vec{\\theta}= $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
// 矢量分析---------------
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$Fourier \\; Transform $","$\\mathcal{F}[f(t)]=\\phi(\\omega) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^{+\\infty}f(t) e^{- i \\omega t} {\\rm d} t $"],
["$Laplace \\; Transform $","$ \\mathcal{L}[f(t)]=F(s) =\\int_{0}^{\\infty}f(t)e^{-st} {\\rm d} t         $"],
["$ $","$ $"],
["$ $","$ $"],
["$Synchrotron \\; Formula$","$P=\\frac{2e^2c\\beta^4}{3\\rho^2}(\\frac{E}{mc^2})^2  $"],
["$Special \\; Relativity $","$E=mc^2=\\frac{m_0c^2}{\\sqrt{1+v^2/c^2}}=\\sqrt{p^2c^2+m_0^2c^4} $"],
["$Planck \\; Formula $","$E=h \\nu $"],
["$BlackBody \\;Rad $","$I_\\nu(\\nu,T)=\\frac{2h\\nu^3}{c^2}\\frac{1}{e^{h\\nu/k_BT}-1} $"],
["$Ideal \\; Gas\\; Equations$","$ PV=NTR$"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],

["$Newton \\;Equation $","$ \\vec{F}=m\\vec{a} $"],
["$Laplace \\;Equation $","$ \\nabla^2\\phi=0 $"],
["$Wave \\;Equation $","$ \\nabla^2\\phi=\\partial^2_t \\phi$"],
["$KdV \\; Equation  $","$\\partial_t\\phi+6\\phi\\partial_x\\phi+\\partial_x^3\\phi=0 $"],

["$Einstein  \\; Equation $","$G_{\\mu\\nu}=8\\pi G T_{\\mu \\nu}  $"],
["$Dirac \\; Equation $","$(i  \\not \\partial-m)\\psi=0  $"],
["$Schrödinger \\; Equation  $","$ i\\partial_t \\psi=\\hat{H}\\psi $"],
["$Maxwell \\;Equation $","$F_{\\mu\\nu}=\\partial_\\mu A_\\nu-\\partial_\\nu A_\\mu $"],
["$Pauli \\; Matrix $","$\\begin{bmatrix} 0 & 1 \\\\ 1 & 0\\end{bmatrix}   \\begin{bmatrix} 0 & -i \\\\ i & 0\\end{bmatrix}  \\begin{bmatrix} 1 & 0 \\\\ 0 & -1\\end{bmatrix}$"],
["$Uncertainty \\; Principle $","$\\Delta x \\Delta p >= \\hbar/2 $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$Fermi-Dirac \\; Distribution $","$f(E)= \\frac{1}{e^{ (E-E_F)/k_BT  }  \\quad +1 } $"],
["$Maxwell \\; Distribution $","$f(v)=\\sqrt{\\frac{2}{\\pi} (\\frac{m}{k_B T})^3 } \\; v^2  exp(\\frac{-m v^2}{2k_B T}) $"],
["$Bose-Einstein \\;Distribution $","$ f(E)= \\frac{1}{e^{ (E-\\mu)/k_BT  }  \\quad -1 }$"],
["$Guass \\; Distribution $","$ \\frac{1}{\\sqrt{2\\pi}\\sigma}exp(-\\frac{(x-\\mu)^2}{2\\sigma^2})$"],
["$ $","$ $"],
["$Bayes \\; Formula $","$P(A|B)=\\frac{P(B|A)P(A)}{P(B)} $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"],
["$ $","$ $"]
]
ReactDOM.render(<TableWithSearch className="cool_table"  data={Table_data}/>, document.querySelector('#forReact_0'))







