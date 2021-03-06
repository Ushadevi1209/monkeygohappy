
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  TimeGroup=createGroup();
  
  monkey=createSprite(50,250,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(70,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false; 
  
  ground2=createSprite(70,50,800,10);
  ground2.velocityX=-4;
  ground2.x=ground.width/2;
  ground2.visible=false;
  
  score=0;
  survivalTime=0;
}


function draw() {
//background  
background("brown");
  
  stroke("black");
  stroke("10")
  fill("white");
  textSize(20);
  text("Survival Time : "+score,130,20);
  
  
  monkey.collide(ground);
    monkey.collide(ground2);

  
  if(gameState===PLAY){
    monkey.changeAnimation("running",monkey_running);
    
    survivalTime=Math.ceil(frameCount/frameRate());
    
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
   if(ground2.x<0){
    ground2.x=ground2.width/2;
  }
  
  //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
  
  if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     monkey.visible = false;
    // survialTime.visible = true;
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 120, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 90, 230);
   }
 
  
  
 

drawSprites();
  
}
//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 150=== 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}













