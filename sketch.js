var bimg, obimg, obstaclegroup, background1, score, jungleimg, monkeyimg, monkey,bananagroup, ground, StoneGroup, gameState, stonetouch; 

function preload(){
 jungleimg = loadImage("jungle.jpg");
  monkeyimg=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkey2IMG = loadImage("Monkey_08.png");
 bimg = loadImage("banana.png");
 obimg = loadImage("stone.png"); 
  
}
function setup() {
  createCanvas(displayWidth, displayHeight); 
  monkey = createSprite(displayWidth/4, displayHeight-160, displayWidth/20, displayHeight/8);
  monkey.addAnimation("mokey", monkeyimg);
  monkey.scale = 0.3;
 
  //background1.velocityX=-5;
  
  
  score=0;
  
  BananaGroup = createGroup();
  StoneGroup = createGroup();

  ground = createSprite(displayWidth/2,displayHeight-10, displayWidth, displayHeight/40);
  ground.visible = false;
  
  gameState = "play";
  stonetouch = 0;
}

function draw() {
  background(jungleimg);
  drawSprites();
 /* if (background1.x < 0){
      background1.x = background1.width/2;
      }*/
      stroke("white");
      textSize(48);
      //fill("white");
      text("Score: " +score, displayWidth/2,displayHeight/2-400);

      monkey.collide(ground);
  if(gameState==="play"){
     
     if (keyDown("space")&&monkey.y>=3493*displayHeight/4000){
      monkey.velocityY = -15;
      }
      monkey.velocityY = monkey.velocityY +0.8
  
    if (monkey.isTouching(BananaGroup)){
       score = score+2;
       BananaGroup.destroyEach();
      }
  
  bananafood();
  obstacles();
    
switch(score){ 
  case 10: monkey.scale = 0.32;
           break;
  case 20: monkey.scale = 0.34;
           break;
  case 30: monkey.scale = 0.36;
           break;        
  case 50: monkey.scale = 0.38;
           break;         
      default:break;
       }  
  if (monkey.isTouching(StoneGroup)){
      monkey.scale = 0.3; 
      stonetouch=stonetouch+1; 
    
  } 
    
  if (stonetouch===3){
    gameState="end";
  }
}
  
if (gameState==="end"){
textSize(48); 
stroke("red");
text("Game Over", displayWidth/2, displayHeight/2)
  BananaGroup.destroyEach();
  StoneGroup.destroyEach();
  monkey.destroy();
}
  
  
 
  monkey.depth = monkey.depth+1; 
      
  monkey.collide(ground);
  
  camera.position.x=monkey.x;
  camera.position.y=displayHeight/2;

  
  
  
  
}

function bananafood(){
 if (World.frameCount%100===0){
  var banana = createSprite(displayWidth, displayHeight/2, displayWidth/20, displayHeight/20);
    banana.addImage("Banana", bimg);
    banana.scale = 0.15;
    banana.y = random(3*displayWidth/10, 3*displayHeight/4);
    banana.velocityX = -8;
    banana.lifetime = 500;
    BananaGroup.add(banana);
}
}

function obstacles(){ 
  if (World.frameCount%130===0){
    var stone = createSprite(displayWidth, 7*displayHeight/8, displayWidth/40, 40); 
    stone.collide(ground)
    stone.velocityX = - 6
    stone.addImage("Stone", obimg);
    stone.scale = 0.2;
    stone.lifetime = 700;
    StoneGroup.add(stone);
  }
}
