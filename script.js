function reizina(a, b) {
    let aRows = a.length;
    let bRows = b.length;
    let aCols = a[0].length;
    let bCols = b[0].length;
    if (bRows !== aCols) {
        return null;
    }
    let c = [];
    for(let i = 0;i<aRows;i++){
        c.push([]);
        for(let j = 0;j<bCols;j++){
            c[i].push(0);
            for(let n = 0;n<aCols;n++){
                c[i][j] += a[i][n]*b[n][j];
            }
        }
    }
    return c;
}

function saskaita(a, b) {
    let aRows = a.length;
    let bRows = b.length;
    let aCols = a[0].length;
    let bCols = b[0].length;
    if (aRows !== bRows || bCols !== aCols) {
        return null;
    }
    let c = [];
    for(let i = 0;i<aRows;i++){
        c.push([]);
        for(let j = 0;j<aCols;j++){
            c[i].push(a[i][j]+b[i][j]);
        }
    }

    return c;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function f(x){
    return (-5)*x+500;
}

function protons(ievads, w){
    let result = reizina(ievads,w);
    if(result[0][0]>=0)return 1;
    return 0;
}

function trene(epochs, sdValue) {
    let w = [[0], [0], [0]]; 
    let learnRate = 0.000002;
    let points = [];
    for(let i = 0;i<10000;i++){
        let x = getRandomInt(canvas.width);
        let y = getRandomInt(canvas.height);
        points.push([x, y, 1]);
    }
    for (let epoch = 0; epoch < epochs; epoch++) {
        let errSum = 0;
        for (let i = 0; i < points.length; i++) {
            x = points[i][0];
            y = points[i][1];
            let answer = y > f(x) ? 1 : 0;

            let output = protons([points[i]], w);
            let error = answer - output;
            errSum += error*error;
            if(error != 0){
                for (let k = 0; k < points[i].length; k++) { 
                    w[k][0] += learnRate * error * points[i][k];
                }
            }
            
        }
        
        
        let sd = Math.sqrt(errSum/points.length);
        if(epoch%100==0)console.log("Epoch:", epoch+"/"+epochs, "Standart deviation:", sd);
        
        if(sd<=sdValue) return w;
            
        
    }
    return w;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawPoints(w, pointCount){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let points = [];
    for(let i = 0;i<pointCount;i++){
        points.push([getRandomInt(canvas.width), getRandomInt(canvas.height), 1]);
    }

    let rez=reizina(points, w);



    for(let i = 0;i<points.length;i++){
        ctx.fillStyle = rez[i]>0? "red" : "blue";
        ctx.fillRect(points[i][0],canvas.height-points[i][1],1,1);
    }
}

let w=trene(10000, 0.05);
console.log(w);
drawPoints(w, 100000);

//line
ctx.moveTo(0, canvas.height-f(0));
ctx.lineTo(canvas.width, canvas.height-f(canvas.width));
ctx.lineWidth = 1;
ctx.stroke();