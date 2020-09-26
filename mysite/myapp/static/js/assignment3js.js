var canWidth = 1000;
var canHeight = 600;
var canvas = document.getElementById("canvas");
canvas.width = canWidth;
canvas.height = canHeight;
var pen = canvas.getContext("2d");


var lineWidths = 50;
var lineBuffer = 5
var numOfElements = Math.floor(canWidth/(lineWidths-2));
var maxValueNum = 450;
var minValueNum = 50;

var lineArray = [];

/*
These are the objects that will be used to sort
  objects have variable:
    int height
    int position
    string color which is in the format of 'rgb(x,y,z)' where x,y,v are numbers 0-255

    function draw() will draw the block on the canvas at its position
    function drawMove(displacement) will draw the block on the canvas at its position
      with a diplacement left or right. It was be displaced "displacement" points away
      from where it normally would be. Function is used for the animation


They will take in 'h' which is the height or value of the block
  must be positive
  to be able to see full block, 'h' must be under canvas height (canHeight)

They will also take in 'p' which is the position of the block in the array
  must be between 0 and lineArray.length -1
  should be the position where the block currenlty stands in the array

*/
function variableObj(h,p){
  this.height = h;
  this.position = p;

  let varRange = maxValueNum - minValueNum;
  let rgbConcat = '';
  let colorVal = 0;
  let colorTemp = h - minValueNum;
  //determines color of variable from green to red based on height
  if (colorTemp <= Math.floor(varRange/2) ) {
    colorVal = Math.floor(colorTemp/(varRange/2)*256);
    rgbConcat = 'rgb(' + colorVal +',255,0)';
  }
  else {
    colorVal= Math.floor((colorTemp-(varRange/2))/(varRange/2) * 256);
    rgbConcat = 'rgb(255,' + Math.abs(colorVal-255) +',0)';

  }
  this.color = rgbConcat;

  this.draw = function(){
    //draws block at current position with coresponding color and value
    pen.fillStyle = this.color;
    pen.fillRect(this.position*lineWidths,canHeight,lineWidths-lineBuffer,-this.height);
    pen.fillStyle = '#0000FF';
    pen.fillText(this.height,this.position * lineWidths + Math.floor(lineWidths/2),Math.floor(canHeight- this.height/2));
  }

  this.drawMove = function(displacement){
    pen.fillStyle = this.color;
    pen.fillRect(this.position*lineWidths + displacement,canHeight,lineWidths-lineBuffer,-this.height);
    pen.fillStyle = '#0000FF';
    pen.fillText(this.height,this.position * lineWidths + Math.floor(lineWidths/2) + displacement,Math.floor(canHeight- this.height/2));
  }
  this.setPosition = function(pos){
    this.position = pos;
  }
}

// function resetLines takes param elements and recreates an array of values/blocks of size elements
//each variable will be given a random value
function resetLines(elements){
  numOfElements = elements;
  lineWidths = Math.floor(canWidth/(numOfElements));
  //console.log(lineWidths);
  lineArray = [];
  for (var i = 0; i < numOfElements; i++) {
    lineArray[i] = new variableObj(Math.floor((Math.random() * (maxValueNum-minValueNum)) + minValueNum),i)
  }
}
resetLines(numOfElements);
console.log(lineArray);
//Draws all lines that are currently in the lineArray
function drawAllLines(){
  pen.clearRect(0,0,canWidth,canHeight);
  for (var i = 0; i < numOfElements; i++) {
    lineArray[i].draw();
  }
  console.log(lineArray);
}

//Draws all lines that are currently in the lineArray except var1 and var2
function drawOtherThan(var1,var2){
  pen.clearRect(0,0,canWidth,canHeight);
  for (var i = 0; i < lineArray.length; i++) {
    if (!(var1.position == i || var2.position == i)) {
      lineArray[i].draw();
    }
  }
}




var movementLen = 0; //displacement of swaping blocks
let framesPerSecond = 200; // speed of sort
var currentIndex = 0; // index of the bubble sort
var globalID; // global animation variable
var thereWasASwap = false; // checks if a swap has occured within one runthrough of the array
/*
runs the animation of bubble sort on 'lineArray'
uses global variables:
    movementLen
    framesPerSecond
    currentIndex
    globalID
    thereWasASwap
    lineArray
*/
function swapVariableAnimation(){
  setTimeout( function(){
      if (currentIndex == lineArray.length -1) {
          currentIndex = 0;
          movementLen = 0;
          if (!thereWasASwap) {
            cancelAnimationFrame(globalID);
            return;
          }
          thereWasASwap = false;
      }
      if (lineArray[currentIndex].height > lineArray[currentIndex+1].height) {
        pen.clearRect(0,0,canWidth,canHeight);
        drawOtherThan(lineArray[currentIndex],lineArray[currentIndex+1]);
        lineArray[currentIndex].drawMove(movementLen);
        lineArray[currentIndex+1].drawMove(-movementLen);
        movementLen+=3;
      }
      else {
        movementLen = 51;
      }

      if (movementLen > 50) {
        if (lineArray[currentIndex].height > lineArray[currentIndex+1].height) {
          thereWasASwap = true;
          swapInLineArray(lineArray[currentIndex],lineArray[currentIndex+1]);
        }
        currentIndex += 1;
        movementLen = 0;
      }
      globalID = requestAnimationFrame(swapVariableAnimation);
  }, 1000/framesPerSecond);
}
//drawAllLines();
function swapInLineArray(var1,var2){
  posTemp1 = var1.position;
  posTemp2 = var2.position;

  lineArray[posTemp1] = var2;
  lineArray[posTemp1].setPosition(posTemp1);
  lineArray[posTemp2] = var1;
  lineArray[posTemp2].setPosition(posTemp2);
  //console.log(lineArray);

}

//Runs through one cycle of bubble sort
function BubbleSort_OneCycle(){
  swapVariableAnimation();
}

function BubbleSort_FullCycle(){
  thereWasASwap = true;
  while (thereWasASwap) {
    thereWasASwap = false;
    swapVariableAnimation();
  }
}
drawAllLines();
