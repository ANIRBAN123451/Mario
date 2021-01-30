var mario,marioR,marioC;
var obstacle,obstacleI,bricik,brickW;
var restart,restartI,go,goI,bg,g,gI;
var ground;
var edges;
var GPlants,GBricks;
//var PLAY= 1;
var score=0;
var gameState=0;
function preload(){
marioR=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
obstacleI=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
brickW=loadImage("brick.png")
marioC=loadImage("collided.png")
restartI=loadImage("restart.png")
bg=loadImage("bg.png")
goI=loadImage("gameOver.png")
jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3");
checkPointSound=loadSound("checkPoint.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);
/*
background= createSprite(width/2,height/2-100);
background.addImage(bg)
background.scale=4.5;
background.velocityX=-10;
*/
mario=createSprite(50,height-140, 20,20);
mario.addAnimation("Animation of mario", marioR);
mario.addAnimation("mario collided",marioC);
mario.scale=1.5;
ground=createSprite(width/2,height-140,width,10);
ground.velocityX= -10;
ground.visible=false;
GBricks=new Group();
GPlants=new Group();
restart=createSprite(width/2,height/2);
restart.addImage(restartI);
edges= createEdgeSprites();

}

function draw(){
background(bg);
if(gameState===0){  
    restart.visible=false;  
    if(ground.x<0){
        ground.x=ground.width/2
    }
    if(keyDown("space") && mario.y>780){
        mario.velocityY=-12;
        jumpSound.play();
        }
        mario.velocityY=mario.velocityY+0.5;
spawnBricks();
spawnPlants();
mario.collide(ground)
score=score+Math.round(getFrameRate()/60)
if(score%100===0){
    checkPointSound.play();
}
    /*
    if(background.x<200){
        background.x=background.width/2
    }
    */
    //console.log(mario.y)
    if(mario.isTouching(GPlants)||mario.isTouching(GBricks)){
        dieSound.play();
        gameState=1
    }
    }
else if(gameState===1){
    ground.velocityX=0;
    GBricks.setVelocityXEach(0);
    GPlants.setVelocityXEach(0);
    restart.visible=true;  
    mario.changeAnimation("mario collided",marioC);
    mario.velocityY=5
    if(mousePressedOver(restart)){
        reset();
    }
}



drawSprites();
fill("Red");
textSize(20)
text("Survival Time="+score,50,50)
}


function spawnBricks(){
    if(frameCount%60===0){
    var brick=createSprite(width,805,10,10);
    brick.addImage(brickW);
    brick.velocityX=-10;
    brick.y=Math.round(random(705,805));
    GBricks.add(brick);
    brick.lifetime=width/11;
}
}

function spawnPlants(){
    if(frameCount%100===0){
    var plant=createSprite(width+100,805,10,10);
    plant.addAnimation("Animation of plants",obstacleI);
    plant.velocityX=-10;
    GPlants.add(plant);
    plant.lifetime=width/11;
}
}

function reset(){
    gameState=0;
    score=0;
    GBricks.destroyEach();
    GPlants.destroyEach();
    mario.x=50;
    mario.y=height-140;
    mario.changeAnimation("Animation of mario", marioR);
    mario.collide(ground)
}