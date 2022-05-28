var towerImg, tower;
var doorImg, door, doorsGroup;                      
var climberImg, climber, climbersGroup;
var ghostImg, ghost;                  
var invisibleBlock, invisibleBlockgroup;
var gameState = "play";

function preload() {
  towerImg = loadImage ("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav")
}

function setup () {
  createCanvas (600,600);
  spookySound.loop();
  tower = createSprite(300,300,10,10);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(0);
  if (gameState === "play") {
  if (tower.y > 400) {
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -5;
  }
  
  //add gravity to ghost
  ghost.velocityY = ghost.velocityY + 0.8;
  }
  
  spawnDoors();
  spawnClimbers();
  spawnInvisibleBlock();
  
  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }
  
  drawSprites();
  
  if (gameState === "end") {
    background(0);
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 200,200);
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200,10);
    door.addImage(doorImg);
    
    door.x = Math.round(random(80,400));    
    door.velocityY = 1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    //add each door to the group
    doorsGroup.add(door);
  }
}

function spawnClimbers() {
  if (frameCount % 240 === 0) {
    climber = createSprite(200,60);
    climber.addImage(climberImg);
    
    climber.x = door.x;    
    climber.velocityY = 1;
   
    //assign lifetime to the variable
    climber.lifetime = 800;

    //add each door to the group
    climbersGroup.add(climber);
  }
}

function spawnInvisibleBlock() {
   if (frameCount % 240 === 0) {         
    invisibleBlock = createSprite(200,65); 
    invisibleBlock.width = climber.width;                       
    invisibleBlock.height = 2;                     
      
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;          
   
    //assign lifetime to the variable
    invisibleBlock.lifetime = 800;

    //add each door to the group
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}
