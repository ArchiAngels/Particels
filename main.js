const canv = document.querySelector('.canvas');
const ctx = canv.getContext('2d');
const pre_displ = document.querySelector('.loader');
canv.width = 1 * window.innerWidth;
canv.height = 1 * window.innerHeight;
let startups;
let start_sC;
let start_Live;
let countClik = 0;

    // startups = setInterval(blum,30);
    start_sC = setInterval(spawnCircl,30);
window.addEventListener('click',()=>{    
    countClik++;
    if(countClik == 1){
        clearInterval(start_Live);
    }
    else{
        countClik = 0;
        start_Live = setInterval(need,30);
        
    }
    // liveCircle(arrXx,arrYy);
});


let b = 0;
let nums = [];

function blum(){
    b++;
    let num = (Math.random()*255).toFixed(2);
    nums.push(num);
    console.log(`${num}     ${((num)/255).toFixed(3)}       B:${b}`);
    if( b == 3){
        clearInterval(startups);
        b = 0;
        nums = [];
    }
    
}
let sC = 0;
let arrXx = [];
let arrYy = [];
let circleSize = 5;
let maxCircle = 2*46.5;
let points = '';
function spawnCircl(){
    sC++;
    // points += '.';
    arrXx.push(Math.random()*canv.width);
    arrYy.push(Math.random()*canv.height);
    clearCanv();
    if(sC%9 == 0){
        points = '';
    }
    if(sC%3 == 0){
        points += '.';
    }
    if(sC == maxCircle){
        pre_displ.classList.add('hide');
        DrawCircles(arrXx,arrYy);
        clearInterval(start_sC);
        DrawLines(arrXx,arrYy);
        sC = 0;
        start_Live = setInterval(need,30);
        // arrXx = [];
        // arrYy = [];
    }
    else{
        pre_displ.innerHTML = `<div class='fade'><p>Please wait </p><p>${points}</p></div><p>${Math.round(sC*100/maxCircle)}%</p>`;
    }
}
function clearCanv(){
    ctx.beginPath();
    ctx.clearRect(0,0,canv.width,canv.height);
    ctx.stroke();
}
let Distance_draw_line = 228;
function DrawLines(x,y){
    if( x.length == y.length){
        for(let i = 0; i< x.length;i++){
            for( let j = 0; j < x.length; j++){
                if(i+1 <= x.length ){
                    if(DistanceBetwenCirc(x[i],y[i],x[j+1],y[j+1]) <=Distance_draw_line){
                        ctx.beginPath();
                        ctx.moveTo(x[i], y[i]);
                        ctx.lineTo(x[j + 1], y[j +1]);
                        ctx.lineWidth = 0.45;
                        ctx.strokeStyle = `rgba(175,25,144,${1-(DistanceBetwenCirc(x[i],y[i],x[j+1],y[j+1])/Distance_draw_line)})`;
                        // ctx.font = "15px Arial";
                        // ctx.fillText(DistanceBetwenCirc(x[i],y[i],x[j+1],y[j+1]),x[i]+mainX,y[i]-mainY);
                        ctx.stroke();
                    }
                    if(x[i] > canv.width){
                        x[i] = 0;
                    }
                    if(x[i] < 0){
                        x[i] = canv.width;
                    }
                    if(y[i] > canv.height){
                        y[i] = 0;
                    }
                    if( y[i] < 0){
                        y[i] = canv.height;
                    }
                    
                }
                else{
                    // console.log('Out of the Range DrawLines');
                    break;
                }
            }
        }
    }
    // else{
    //     console.log(`${x==y} arrLength`);
    //     break;
    // }
}
function DrawCircles(x,y){
    // console.log('DRAED');
    if( x.length == y.length){
        for(let i = 0; i < y.length; i++){
            ctx.beginPath();
            ctx.arc(x[i], y[i], 0, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0,0,255,0.4)';
            // ctx.font = "15px Arial";
            // ctx.fillText('Прости меня',x[i]-24,y[i]);
            ctx.stroke();
        }
    }
    // else{
    //     console.log(`${x==y} arrLength`);
    //     break;
    // }
}
let mainX,mainY;
let currentMatrix = [];
function DistanceBetwenCirc(x,y,xX,yY){
    currentMatrix = [];
    // console.log(x,y,xX,yY);
    // console.log((mainX+mainY)*0.5);
    if( xX != undefined && yY != undefined && x != xX && y != yY){
        mainX = Math.max(x,xX) -Math.min(x,xX) ;
        mainY =  Math.max(y,yY) -Math.min(y,yY);
        currentMatrix.push(Math.sqrt(Math.pow(mainX,2)+Math.pow(mainY,2)));
        // console.log(mainX,mainY,mainX >= 0.49 || mainY >= 0.49); 
    }
    // console.log('MAX:',currentMatrix);
    // console.log(mainX,mainY,Math.sqrt(Math.pow(mainX,2)+Math.pow(mainY,2)));
    return Math.sqrt(Math.pow(mainX,2)+Math.pow(mainY,2))
    
}
function need(){
    liveCircle(arrXx,arrYy);
}
let speedCircle = 1;
function liveCircle(x,y){
    // console.log("LIVE");
    // console.log(maxElems);
    clearCanv();
    if(maxCircle%5 == 0){
        console.log(maxCircle%5,5);
    }
    else{
        if(maxCircle%4 == 0){
            console.log(maxCircle%4,4);
        }
        else{
            if(maxCircle%3 == 0){
                // console.log(maxCircle%3,3);
                for(let j =0; j< maxCircle;j++){
                    if(j%3 == 0){
                        changeSpeed(j,j,speedCircle+j*0.05,speedCircle+j*0.05);
                    }
                    else{
                        if(j%2==0){
                            changeSpeed(j,j,speedCircle,-speedCircle-j*.05);
                        }
                        else{
                            changeSpeed(j,j,-speedCircle-j*0.05,speedCircle+j*0.05);
                        }
                    }
                }
            }
            else{
                if(maxCircle%2 == 0){
                    // console.log(maxCircle%2,2);
                    for(let j = 0; j<maxCircle;j++){
                        if(j%2 == 0){
                            changeSpeed(j,j,speedCircle,-speedCircle);
                        }
                        else{
                            changeSpeed(j,j,-speedCircle*2,speedCircle);
                        }
                    }
                }
                else{
                    // console.log(maxCircle,1);
                    changeSpeed(x,y,speedCircle,speedCircle);
                }
            }
        }
    }

    // DrawCircles(arrXx,arrYy);..............
    DrawLines(arrXx,arrYy);
            
}

function changeSpeed(x,y,spx,spy){
    arrXx[x]+=spx;
    arrYy[y]+=spy;
    // console.log(x,y,arrXx[x],arrYy[y]);
}