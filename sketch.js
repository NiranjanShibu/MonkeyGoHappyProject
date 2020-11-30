
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground, invisGround;
var backgroundImage, backgroundPic
var lives = 2;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
 backgroundImage = loadImage("jungle.jpg")

}



function setup() {
  createCanvas(600, 355);

  backgroundPic = createSprite(300, 275, 20, 20);
  backgroundPic.addImage("trees", backgroundImage);
  backgroundPic.velocityX = -4;

  ground = createSprite(400, 350, 1200, 10);
  invisGround = createSprite(400, 355, 1200, 10);

  monkey = createSprite(80, 310, 20, 20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
} 


function draw() {
  
  background(300);

  if (backgroundPic.x < 100){
    backgroundPic.x = backgroundPic.width/2;
  }

  if(keyDown("space") && monkey.isTouching(ground)){
     monkey.velocityY = -11;
     }
  
  monkey.velocityY = monkey.velocityY + 0.4;
  
  monkey.collide(invisGround);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }

   if (gameState === PLAY){
    score = score + Math.round(frameRate()/60);
  }

  rock();
  food();
  drawSprites();

  fill("white");
  text("Score: "+ score, 500,50);
}

function food(){
  
  if (frameCount % 80 === 0 && gameState === PLAY) {
    banana = createSprite(600,50,20,20);
    banana.y = Math.round(random(175, 235));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -3;
    banana.lifetime = 210;
    
    bananaGroup.add(banana);
  }
  
  if(monkey.isTouching(bananaGroup)){
     score = score+50;
    bananaGroup.destroyEach();
    monkey.scale = monkey.scale+0.01;
     }
  
}

function rock(){
  
  if (frameCount % 300 === 0 && gameState === PLAY) {
     obstacle = createSprite(600,334.5,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.velocityX = -3;
    obstacle.lifetime = 210;
    
    obstacleGroup.add(obstacle);
  }
  
  if(monkey.isTouching(obstacleGroup)){
     score = score-100;
    obstacleGroup.destroyEach();
    monkey.scale = monkey.scale-0.023;
    lives = lives-1;
     }

  if (lives === 0){
     gameState = END;
     backgroundPic.velocityX = 0;
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
   }
  
}





