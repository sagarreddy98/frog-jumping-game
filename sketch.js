var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(400,450);
  
  ocean = createSprite(200,200);
  ocean.addImage("ocean",oceanImg);
  ocean.velocityY = 1
  
  frog = createSprite(200,350,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  

  var dist = Math.round(random(100, 300))   
    climber = createSprite(dist,100, 2, 2);
    climber.scale = 0.25;
    
    coin = createSprite(dist,65, 1, 1);
    coin.scale = 0.1;
  
  //create coin group and climber group
  coinGroup = new Group()
  climbersGroup = new Group()
  
}

function draw(){
  background(0);
  drawSprites();
  if(keyDown("space")){
    gameState="play"
  }
  if (gameState === "play") {
    text("Score : "+ score,300,20);
      if(ocean.y > 300 ){
        ocean.y = 250;
      }
      if(keyDown("space")){
        frog.y = frog.y - 10
      } else {
        frog.y = frog.y + 3
      }

      if(keyDown("LEFT_ARROW")){
        if(frog.x>=3){
          frog.x = frog.x-3;
        }
      }
    
      if(keyDown("RIGHT_ARROW")){
        if(frog.x<=397){
          frog.x = frog.x+3;
        }
      }
      spawnCoin()
      if(coin.isTouching(frog)){
        coin.destroy()
         score+=1
      }

      if(climber.isTouching(frog)){
         frog.y=climber.y - 20
         if(keyDown("space")){
            frog.bounce(climber);
            climber.velocityY = 1;
        }
      }

      if(frog.y>=450){
        gameState="end"
      }

      if(frog.y<=0){
        frog.y=0
      }

      
    
  }
  
  else{
      text("Game Over",140,200);
      frog.scale=0
      ocean.scale=0
      coin.destroy()
      climber.destroy()
  }

}

// create the coin and climber in the same function
function spawnCoin() {

  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same

    var dist = Math.round(random(100, 300))   
    climber = createSprite(dist,100, 2, 2);
    climber.addImage("ocean",climberImg);
    climber.scale = 0.25;
    
    coin = createSprite(dist,65, 1, 1);
    coin.addImage("coin", coinImg);
    coin.scale = 0.1;

    coin.velocityY = 1;

    climber.velocityY = 1;
  }
}