var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var bricksGroup, brickImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


function preload(){
  bg=loadImage("bg.png")
  mario_running =   loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  mario_collided = loadAnimation("collided.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacleimage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  brickImage = loadImage("brick.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 350);
  
  mario = createSprite(50,295,20,50)
  
  mario.addAnimation("running",mario_running);
  mario.addAnimation("collided", mario_collided);
  mario.scale = 2;
 
  obstaclesGroup = new Group();
  ground = createSprite(200,330,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(2);
  
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  bricksGroup = new Group();
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
 
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(bg);
 
  
  if (gameState===PLAY){
    
    ground.velocityX = -(12);
  
    if(keyDown("space") && mario.y >= 250) {
      mario.velocityY = -12;
    }
  
    mario.velocityY = mario.velocityY + 0.5
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    for (var i = 0; i < bricksGroup.length; i++) {
    
      if(bricksGroup.get(i).isTouching(mario)){
      bricksGroup.get(i).remove()
      
    }
    }
    mario.collide(invisibleGround);
    spawnbricks();
    spawnObstacles();
    if(obstaclesGroup.isTouching(mario)){
      gameState = END;
    
  }
   
    mario.collide(bricksGroup);
  }
  
  
  else if (gameState === END) {
    mario.changeAnimation("collided");
    gameOver.visible = true;
    restart.visible = true;
  }
  drawSprites();
}

function spawnbricks() {
  //write code here to spawn the brick
  if (frameCount % 60 === 0) {
    var brick = createSprite(600,120,40,10);
    brick.debug=true
    brick.y = Math.round(random(150,180));
   brick.addImage(brickImage);
    brick.scale = 1;
    brick.velocityX = -3;
    
     //assign lifetime to the variable
    brick.lifetime = 200;
    bricksGroup.add(brick);
       
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,270,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6);
    
    //generate random obstacles
    obstacle.addAnimation("obstacles",obstacleimage)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
