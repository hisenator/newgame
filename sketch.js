'use strict';

let state = 'title';
let cnv;
let points = 5;
let w = 600;
let h = 600
let player;
let coins = [];
let playerImg;
let coinsImg;
let enemies= [];
let enemiesImg;
let berries = [];
let berriesImg;
let queen = [];
let queenImg;



function preload (){
  playerImg= loadImage('Assets/dirtysock.png');
  coinsImg= loadImage ('Assets/dollar.png');
  enemiesImg= loadImage ('Assets/bubble.png');
  titleImg= loadImage ('Assets/bear.png');
  berriesImg= loadImage ('Assets/othersock.png');
  queenImg= loadImage ('Assets/soap.png');
  youLostImg= loadImage ('Assets/dead.png');
  youWinImg= loadImage ('Assets/sockvictory.png');


}

function setup() {
  cnv =  createCanvas(w,h);

imageMode(CENTER);
rectMode (CENTER);

textFont ('blockhead ot');


player = new Player();
coins.push (new Coin());
enemies.push (new Enemy());
berries.push (new Boost());
queen.push (new Bomb());

}




function draw() {

  switch (state){
    case 'title':
    title();
    cnv.mouseClicked (titleMouseClicked);
    break;
    case 'level 1':
     level1();
     cnv.mouseClicked (level1MouseClicked);
    break;
    case 'you win':
      youWin();
    cnv.mouseClicked (youWinMouseClicked)
    break;
    case 'you lost':
      youLost();
    cnv.mouseClicked (youWinMouseClicked)
    default:
    break;
  }

}

function keyPressed (){
  if ( keyCode == LEFT_ARROW){
    player.direction = 'left'
  }else if (keyCode == RIGHT_ARRROW) {
    player.direction = 'right'
  }else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  }else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  }else if (key = ' '){
    player.direction = 'still'
  }
}

function keyReleased (){
  let numberKeysPressed = 0;

  if (keyIsDown (LEFT_ARROW)){
    numberKeysPressed ++;
  }

  if (keyIsDown (RIGHT_ARROW)){
    numberKeysPressed ++;
  }

  if (keyIsDown (UP_ARROW)){
    numberKeysPressed ++;
  }

  if (keyIsDown (DOWN_ARROW)){
    numberKeysPressed ++;
  }
  console.log(numberKeysPressed);
  if (numberKeysPressed == 0){
    player.direction = 'still'
  }
}

function title(){
  background(248,213,8);
image (titleImg, w/ 2, h/1);

  textSize(135);
  fill (90,64,27)
noStroke();
  textAlign (CENTER);
  text('ORRPHEUS', w/2, h/3.5);
  textSize (30);
  text ('find your other half', w/2., h/2);
  text ('avoid the enemies, get money', w/2., h/1.7);
  textSize (45);
  text ('click to begin, use WASD', w/2, h/2.5);
}

function titleMouseClicked(){
  console.log ('canvas is clicked on title page');
  state = 'level 1'
}

function level1(){
  background (80, 150,170)

  if (random (1) <= 0.01){
      coins.push(new Coin());
  }
  if (random (1) <= 0.02){
      enemies.push(new Enemy());
  }
  if (random (1) <= 0.0001){
      berries.push(new Boost());
  }
  if (random (1) <= 0.003){
      queen.push(new Bomb());
  }

  player.display ();
  player.move ();

  for (let i= 0; i< coins.length; i++){
    coins[i].display();
    coins[i].move ();
  }

  for (let i= 0; i< enemies.length; i++){
    enemies[i].display();
    enemies[i].move ();
  }

  for (let i= 0; i< berries.length; i++){
    berries[i].display();
    berries[i].move ();
  }

  for (let i= 0; i< queen.length; i++){
    queen[i].display();
    queen[i].move ();
  }

for (let i= coins.length -1; i >= 0; i --){
  if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r)/2){
    points++;
    console.log(points);
    coins.splice(i,1);
} else if (coins [i].y > h){
  coins.splice(i,1);
  console.log ('coins is vamoose');
}
}

for (let i= enemies.length -1; i >= 0; i --){
  if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r)/2){
    points--;
    console.log(points);
    enemies.splice(i,1);
} else if (enemies [i].y > h){
  enemies.splice(i,1);
  console.log ('enemies is vamoose');
}
}

for (let i= berries.length -1; i >= 0; i --){
  if (dist(player.x, player.y, berries[i].x, berries[i].y) <= (player.r + berries[i].r)/2){
    points= points+ 5;
    console.log(points);
    berries.splice(i,1);
} else if (berries [i].y > h){
  berries.splice(i,1);
  console.log ('berries is vamoose');
}
}

for (let i= queen.length -1; i >= 0; i --){
  if (dist(player.x, player.y, queen[i].x, queen[i].y) <= (player.r + queen[i].r)/2){
    points= points-10;
    console.log(points);
    queen.splice(i,1);
} else if (queen [i].y > h){
  queen.splice(i,1);
  console.log ('queen is vamoose');
}
}

     text (`health: ${points}`, w/5, h/10);
     if (points >= 550){
       state = "you win"
     } else if (points <=0){
       state = "you lost"
     }
}


function level1MouseClicked (){
  // points ++;
  // console.log ('points = ' + points);
  //
  // if (points >= 10) {
  //   state = 'you win';
  // }
}

function youWin (){
  background ( 0,0,0);
  image (youWinImg, w/2, h/1.5);
  textSize(120);
  noStroke();
  text('You Won!',w/2, h/4);
  textSize (30);
  text ('click anywhere to restart',w/2, h/3);
}

function youWinMouseClicked (){
  state = 'title';
  points = 5;
}

function youLost (){
  background(240,67,35);
  image (youLostImg, w/ 2, h/2);
  textSize(100);
noStroke();
  text('GAME OVER',w/2, h/4);
  textSize (30);
  text ('click anywhere to try again',w/2, h/1.1);
}

function youLostMouseClicked (){
  state = 'title';
  points = 5;
}
