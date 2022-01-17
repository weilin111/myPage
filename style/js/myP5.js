// https://p5js.org/reference/


// template
// const s = ( sketch ) => {
//     let canvas;
//     sketch.setup = () => {
//       canvas=sketch.createCanvas(400, 400);
//       canvas.parent('p5js-lists');
//       sketch.pixelDensity(1)
//     };
  
//     sketch.draw = () => {
//       sketch.background(0);
//     };
//   };
  
//   let myp5 = new p5(s);




const s = ( sketch ) => {


    let canvas;
  
    sketch.setup = () => {
    canvas=sketch.createCanvas(400,400);
    canvas.parent('p5js-lists');
    sketch.frameRate(30)
    sketch.pixelDensity(1)
    };
  
    sketch.draw = () => {
        sketch.background(0);    
        // if (mouseIsPressed) {
        //     sketch.fill(0);
        // } else {
        //     sketch.fill(255);
        // }

        width=canvas.width
        // console.log(width)
        sketch.translate( width/2,9 )
        F=sketch.frameCount*0.5
        sketch.stroke(255,105,180)
        for(i=1;i<width*1.6;i++){
            y=Math.sqrt(i*150)
            r=Math.pow(i/width,3)*i/2+150
            N=sketch.noise(i*0.1-F)*99+F*0.02
            sketch.strokeWeight(i*0.01)
            sketch.line( Math.cos(N)*r,y+Math.sin(N)*r,Math.cos( N+0.2 )*r,y+Math.sin(N+0.2)*r )
        }
    // ellipse(50,50,80,50+frameCount);
    };
  };
  
  let myp5 = new p5(s);

const s2 = ( sketch ) => {
    let canvas;
    const COLS = createCols("https://coolors.co/b8b8d1-5b5f97-ffc145-00b884-ff6b6c-ff3c38-000f24");
    const CYCLE = 450;
    const NUM = 40;
    let width
    let height
    sketch.setup = () => {
      canvas=sketch.createCanvas(400, 400,sketch.WEBGL);
      canvas.parent('p5js-lists');
      width=canvas.width
      height=canvas.height    
      let dep = Math.max(width,height);
      sketch.ortho(-width / 2, width / 2, -height / 2, height / 2,-dep*3 , dep*3);
      sketch.pixelDensity(1)
    };
  
    sketch.draw = () => {
        const frameSpan = CYCLE / NUM;
        const unitMaxSize = width * 0.3;
        
        
        let radius = 0.5 * (width - unitMaxSize * 1.2);
        
        sketch.background(0);
        sketch.noStroke();
        sketch.push();
        sketch.rotateX(-Math.PI/4);
        sketch.rotateY(-Math.PI/4);
    
        for(let i = 0; i < NUM; i++){
            let angle = getRaioEased(sketch.frameCount + i * frameSpan) * sketch.TAU;
            let r = unitMaxSize * (0.6 + 0.4 * Math.sin(i / NUM * sketch.TAU));            
            let x = radius * Math.cos(angle);
            let y = 0;
            let z = radius * Math.sin(angle);
            
            sketch.ellipseMode(sketch.CENTER);
            sketch.fill(COLS[i % COLS.length]);
            sketch.push();
            sketch.translate(x, y, z);
            sketch.rotateY(- angle);
            sketch.ellipse(0, 0, r, r, 45);
            sketch.pop();
        }
        sketch.pop();
    };


    function getRatio(count)
{
	let frameRatio  = (count % CYCLE) / CYCLE;
	
	return frameRatio;
}

function getRaioEased(count)
{
	let ratio = getRatio(count);
	let easeRatio = easingEaseInOutQuint(ratio)  * 0.9 + ratio * 0.1 ;
	
	return easeRatio;
}


function easingEaseInOutCubic (x)
{
	if(x < 0.5)return 0.5 * Math.pow(2*x, 3);
	else return 0.5 * Math.pow(2*(x-1), 3) + 1;
}

function easingEaseInOutQuint(x)
{
  if (x < 0.5) {
    return 0.5 * Math.pow(2 * x, 5);
  } else {
    return 0.5* Math.pow(2 * (x - 1), 5) + 1;
  }
}

function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}



  };
//   https://openprocessing.org/sketch/1201894
  let myp5_2 = new p5(s2);



const s3 = ( sketch ) => {
    let canvas;
    let width
    let height
    sketch.setup = () => {
      canvas=sketch.createCanvas(400, 400);
      canvas.parent('p5js-lists');
      sketch.pixelDensity(1)
      width=canvas.width
      height=canvas.height
    };
  
    sketch.draw = () => {
      sketch.background(0);
      sketch.stroke(255,0,0)
      sketch.fill(0)
      for(i=0;i<width;i++){
        F=sketch.frameCount
        N=sketch.noise(i)
        x=Math.sqrt(i*200)+200*Math.sin(i)+F % width
        y=Math.sqrt(i*100)+200*Math.cos(i)+F % width
        size=N*20
        sketch.ellipse(x,y,size,size)
      }


    };
  };
  
  let myp5_3 = new p5(s3);







const s4 = ( sketch ) => {
    let canvas;
    let metaballShader;
    const N_balls = 20,
          metaballs = [];

    sketch.setup = () => {
      canvas=sketch.createCanvas(400, 400,sketch.WEBGL);
      canvas.parent('p5js-lists');
      sketch.pixelDensity(1)
      sketch.shader(metaballShader);
      for (let i = 0; i < N_balls; i ++) metaballs.push(new Metaball());    
    };
  
    sketch.draw = () => {
      sketch.background(0);
      var data = [];
      
      for (const ball of metaballs) {
        ball.update();
        data.push(ball.pos.x, ball.pos.y, ball.radius);
      }
      
      metaballShader.setUniform("metaballs", data);
      sketch.rect(0, 0, sketch.width, sketch.height);
    };

    
    sketch.preload=()=> {
      metaballShader = getShader(this._renderer);
    }
    // OpenProcessing has a bug where it always creates a scrollbar on Chromium.
    // sketch.mouseWheel=()=> { // This stops the canvas from scrolling by a few pixels.
    //   return false;
    // }

    class Metaball {
      constructor() {
        const size = Math.pow(Math.random(), 2);
        this.vel = p5.Vector.random2D().mult(8 * (1 - size) + 2);
        this.radius = 25 * size + 15;
        
        this.pos = new p5.Vector(sketch.width / 2, sketch.height / 2);
      }
      
      update() {
        this.pos.add(this.vel);
        
        if (this.pos.x < this.radius || this.pos.x > sketch.width  - this.radius) this.vel.x *= -1;
        if (this.pos.y < this.radius || this.pos.y > sketch.height - this.radius) this.vel.y *= -1;
      }
    }

    function getShader(_renderer) {
      const vert = `
        attribute vec3 aPosition;
        attribute vec2 aTexCoord;
    
        varying vec2 vTexCoord;
    
        void main() {
          vTexCoord = aTexCoord;
    
          vec4 positionVec4 = vec4(aPosition, 1.0);
          positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    
          gl_Position = positionVec4;
        }
      `;
    
      const frag = `
        precision highp float;
    
        varying vec2 vTexCoord;
    
        uniform vec3 metaballs[${N_balls}];
    
        const float WIDTH = ${400}.0;
        const float HEIGHT = ${400}.0;
    
        vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
    
        void main() {
          float x = vTexCoord.x * WIDTH;
          float y = vTexCoord.y * HEIGHT;
          float v = 0.0;
    
          for (int i = 0; i < ${N_balls}; i++) {
            vec3 ball = metaballs[i];
            float dx = ball.x - x;
            float dy = ball.y - y;
            float r = ball.z;
            v += r * r / (dx * dx + dy * dy);
          }
    
          if (0.9 < v && v < 1.1) {
            float a = (v - 0.9) * 4.;
            gl_FragColor = vec4(hsv2rgb(vec3(a, 1., 1.)), 1.0);
          } else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      `;
      
      return new p5.Shader(_renderer, vert, frag);
    }



  };
  
  let myp5_4 = new p5(s4);