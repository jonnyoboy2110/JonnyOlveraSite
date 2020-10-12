var LIVES = 3
var canvas = document.getElementById('canvas');
canvas.width = document.getElementById('CanvasCard').offsetWidth - 50;
canvas.height = document.getElementById('CanvasCard').offsetHeight - 20;


var mouse = {
  x: undefined,
  y:undefined
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

window.addEventListener('mousemove',
function(event){
    let rect = canvas.getBoundingClientRect();
    mouse.x = event.x - rect.left;
    mouse.y = event.y- rect.top;
})
var pen = canvas.getContext('2d');
pen.fillStyle = 'blue';

function ball(x,y,dx,dy,radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;

  this.draw = function(){
    pen.beginPath();
    pen.arc(this.x,this.y, this.radius,0, Math.PI*2, false);
    pen.strokeStyle = 'blue';
    pen.stroke();
  }
  this.update = function(){
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if  (this.y + this.radius > canvas.height){
      this.dy = -this.dy;
    } if(this.y  < 0) {
        this.dy = -this.dy;
        LIVES -=1;
        document.getElementById("lives").innerText = "Lives = " + LIVES;

    }

    this.x += this.dx;
    this.y += this.dy;
  }

}

function Peg(){
  this.x = 0;
  this.y = 0;
  this.width = 55;
  this.height = 20;
  this.draw = function(){
    // pen.fillRect(0,this.y, this.width, this.height); // left peg
    // pen.fillRect(canvas.width - this.width ,this.y, this.width, this.height); // right peg
    pen.fillRect(this.x,0, this.width, this.height); // top peg
    // pen.fillRect(this.x, canvas.height - this.width, this.height, this.width); // bottom peg

  }
  this.update = function(){
      if (this.y != mouse.y && mouse.y > 0 && mouse.y < canvas.height - this.height) {
        this.y = mouse.y;
      }
      if (this.x != mouse.x && mouse.x > 0 && mouse.x < canvas.width - this.height) {
        this.x = mouse.x;
      }

  }
  this.intersectCheck =function(ballx,bally){
    if (bally > 0
      && bally < this.width +10
      && ballx > this.x-10
      && ballx < this.x+this.height +10) {
      return true;
    }
    return false;
  }
}

function brick(x,y,h,w){
  this.x = x;
  this.y =  y;
  this.seen = true;
  this.height = h;
  this.width = w;
  this.color = getRandomColor();
  this.draw = function(){
    if (this.seen) {
      pen.fillStyle = this.color;
      pen.fillRect(this.x,this.y, this.width, this.height);
    }
  }

}


let ballRad = 10;
let ballSpeedx = 6;
let ballSpeedy = 3;
let brickStartPointx = canvas.width/2;
let brickStartPointy = canvas.height/2;
let brickH = 55;
let brickW = 20;
var brickArray = [];
var brickCount = 0;
for (var i = 1; i <= 3; i++) {
  for (var j = -i; j < i; j++) {
    brickCount+=1;
    brickArray.push(new brick(brickStartPointx + i*brickW  , brickStartPointy + j*brickH,brickH-5,brickW-5 ));
  }
}
var pelota = new ball(canvas.width/4,canvas.height/2,
   (Math.random() * (ballSpeedx*2))-(ballSpeedx/2),
   (Math.random() * (ballSpeedx*2))-(ballSpeedx/2), ballRad);
pelota.draw();
var Peg1 = new Peg();
function playPong(){
  var IDFrame = requestAnimationFrame(playPong);
  pen.clearRect(0,0,canvas.width,canvas.height);
  pelota.draw();
  Peg1.draw();

  if (Peg1.intersectCheck(pelota.x, pelota.y)) {
    pelota.dx = (Math.random() * (ballSpeedx*2))-(ballSpeedx/2);
    pelota.dy = -pelota.dy;
  }

  pelota.update();
  Peg1.update();
  for (var i = 0; i < brickArray.length; i++) {
    brickArray[i].draw();
    if (brickArray[i].seen &&
      brickArray[i].x < pelota.x &&  brickArray[i].x +brickH >  pelota.x
        && brickArray[i].y < pelota.y &&  brickArray[i].y +brickW >  pelota.y) {
      brickArray[i].seen = false;
      brickCount-=1;
      pelota.dx = -pelota.dx;
      pelota.dy = -pelota.dy;
    }
  }
  if (brickCount == 0) {
    alert("Good job Dude/dudette");
    cancelAnimationFrame(IDFrame);
  }
  if (LIVES ==0) {
    alert("tough luck Dude/dudette");
    cancelAnimationFrame(IDFrame);
  }
}
playPong();
