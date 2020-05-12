const canv = document.querySelector('.canvas');
const ctx = canv.getContext('2d');
const pre_displ = document.querySelector('.loader');
resize_all();
let start_Part_count ;
let start_Live;
let countClik = true;


window.addEventListener('click',()=>{    
    if(countClik){
        countClik = false;
        clearInterval(start_Live);
    }
    else{
        countClik = true;
        start_Live = setInterval(liveCircle,30);
        
    }
});
window.addEventListener('resize',function(){
    resize_all();
})


let infoAboutPartcilces = {
    id:0,
    coorX:[],
    coorY:[],
    speedX:[],
    speedY:[],
    circlesize:5,
    maxCircle:Math.round(window.innerWidth/300)*15,
    defSpeed:3,
    positiv:[]
}
start_Part_count = setInterval(spawnCircl,30);
function spawnCircl(){
    let points = '';

    infoAboutPartcilces.coorX.push(Math.random()*canv.width);
    infoAboutPartcilces.coorY.push(Math.random()*canv.height);

    changeDxDy(infoAboutPartcilces.id);
    clearCanv();

    if(infoAboutPartcilces.id%9 == 0){
        points = '';
    }
    if(infoAboutPartcilces.id%3 == 0){
        points += '.';
    }
    if(infoAboutPartcilces.id == infoAboutPartcilces.maxCircle){
        pre_displ.classList.add('hide');

        DrawCircles(infoAboutPartcilces.coorX,infoAboutPartcilces.coorY);
        clearInterval(start_Part_count);
        DrawLines(infoAboutPartcilces.coorX,infoAboutPartcilces.coorY);

        infoAboutPartcilces.id = 0;
        start_Live = setInterval(liveCircle,30);
    }
    else{
        pre_displ.innerHTML = `<div class='fade'><p>Please wait </p><p>${points}</p></div><p>${Math.round(infoAboutPartcilces.id*100/infoAboutPartcilces.maxCircle)}%</p>`;
    }
    infoAboutPartcilces.id++;
}
function clearCanv(){
    ctx.beginPath();
    ctx.clearRect(0,0,canv.width,canv.height);
    ctx.stroke();
}
let Distance_draw_line = 228;
function DrawLines(x,y){
    
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
                        // x[i] = 0;
                        changeDxDy(i,-1,'change','notchange');
                    }
                    if(x[i] < 0){
                        // x[i] = canv.width;
                        changeDxDy(i,1,'change','notchange');
                    }
                    if(y[i] > canv.height){
                        // y[i] = 0;
                        changeDxDy(i,-1,'notchange','change');
                    }
                    if( y[i] < 0){
                        // y[i] = canv.height;
                        changeDxDy(i,1,'notchange','change');
                    }
                    
                }
                
            }
        }
}
function DrawCircles(x,y){
    // console.log('DRAED');
    if( x.length == y.length){
        for(let i = 0; i < y.length; i++){
            ctx.beginPath();
            ctx.arc(x[i], y[i], 10, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(0,0,255,0.4)';
            // ctx.font = "15px Arial";
            // ctx.fillText('Прости меня',x[i]-24,y[i]);
            ctx.stroke();
        }
    }
}
function DistanceBetwenCirc(x,y,xX,yY){
    let mainX,mainY;
    let currentMatrix = [];

    if( xX != undefined && yY != undefined && x != xX && y != yY){
        mainX = Math.max(x,xX) -Math.min(x,xX) ;
        mainY =  Math.max(y,yY) -Math.min(y,yY);
        currentMatrix.push(Math.sqrt(Math.pow(mainX,2)+Math.pow(mainY,2)));
        // console.log(mainX,mainY,mainX >= 0.49 || mainY >= 0.49); 
    }
    return Math.sqrt(Math.pow(mainX,2)+Math.pow(mainY,2))
    
}

function liveCircle(){

    clearCanv();
    for(let j = 0; j < infoAboutPartcilces.maxCircle; j++){
        changeSpeed(j,j, // Coors X,y
            infoAboutPartcilces.speedX[j] ,// Speed X
            infoAboutPartcilces.speedY[j] )// Speed Y
    }
    

    // DrawCircles(infoAboutPartcilces.coorX,infoAboutPartcilces.coorY);
    DrawLines(infoAboutPartcilces.coorX,infoAboutPartcilces.coorY);
            
}
function changeDxDy(index,positiv = 1,dx = 'change',dy = 'change'){
    infoAboutPartcilces.positiv[index] = positiv;
    infoAboutPartcilces.speedX[index] = (dx == 'change'? infoAboutPartcilces.positiv[index]*(Math.random()*infoAboutPartcilces.defSpeed): infoAboutPartcilces.speedX[index]);
    infoAboutPartcilces.speedY[index] = (dy == 'change'? infoAboutPartcilces.positiv[index]*(Math.random()*infoAboutPartcilces.defSpeed): infoAboutPartcilces.speedY[index]);  
}
function updateAllspeed(){
    for(let i = 0; i < infoAboutPartcilces.maxCircle;i++){
        changeDxDy(i,infoAboutPartcilces.positiv[i]);
    }
}

function changeSpeed(x,y,spx,spy){
    infoAboutPartcilces.coorX[x]+=spx;
    infoAboutPartcilces.coorY[y]+=spy;
}
function resize_all(){
    canv.width = 1 * window.innerWidth;
    canv.height = 1 * window.innerHeight;
}
window.addEventListener('keyup',function(event){
    switch(event.key){
        case 'ArrowUp':{
            infoAboutPartcilces.defSpeed++;
            updateAllspeed();
            console.log('Up speed',infoAboutPartcilces.defSpeed);
            break;
        }
        case 'ArrowDown':{
            infoAboutPartcilces.defSpeed--;
            updateAllspeed();
            console.log('Down speed',infoAboutPartcilces.defSpeed);
            break;
        }
        default:{
            console.log('ooops we dont know this key');
        }
    }
})