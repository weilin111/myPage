// https://p5js.org/reference/


// template
// const s = ( sketch ) => {
//     let canvas;
//     sketch.setup = () => {
//       canvas=sketch.createCanvas(200, 200);
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











