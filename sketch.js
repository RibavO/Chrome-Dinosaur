var trex, ground, iGround, tRun, tDead, groundImage, cactusGroup, cloudsGroup, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6, cloudI, gameState, PLAY, END, score, gO, GOI, restart, restartI;

function preload()
{
  //creates the animation for the trex, dead or alive
  tRun = loadAnimation("trex3.png", "trex4.png");
  tDead = loadAnimation("trex_collided.png");
  //groung image
  groundImage = loadImage("ground2.png");
  cloudI = loadImage("cloud.png")
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  GOI = loadImage("gameOver.png");
  restartI = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 185, 25, 25);
  trex.addAnimation("run", tRun);
  trex.scale = 0.5;
  trex.addAnimation("dead", tDead);
  ground = createSprite(300, 175, 600, 50);
  ground.addImage("ground", groundImage);
  
  iGround = createSprite(300, 185, 600, 10);
  iGround.visible = false;
  
  cloudsGroup = new Group();
  cactusGroup = new Group();
  
  gO = createSprite(300, 50, 50, 50);
  restart = createSprite(300, 100, 50, 50);
  gO.addImage(GOI);
  restart.addImage(restartI);

  gO.visible = false;
  restart.visible = false;
  
  gameState = 1;
  
  score = 0;
}

function draw() {
  background("white");
  text("score " + score, 490, 10)
  if (gameState === 1)
  {
    ground.velocityX = -5;
    if (ground.x < 0)
    {
      ground.x = ground.width/2
    }
    if (keyDown("space")&&trex.isTouching(ground))
    {
      trex.velocityY = -10
    }
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    sO();
    
    if(trex.isTouching(cactusGroup))
    {
      gameState = 0;
      
    }
    
    score = score + Math.round(getFrameRate()/60);
  }
  else if(gameState === 0)
  {
    ground.velocityX = 0;
    trex.changeAnimation("dead", tDead);
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    cactusGroup.setLifetimeEach(-1);
    gO.visible = true;
    restart.visible = true;
    gO.depth = cloudsGroup.maxDepth() +1;
    restart.depth = cloudsGroup.maxDepth() +1;
    if(mousePressedOver(restart))
    {
      gameState = 1;
      cloudsGroup.destroyEach();
      cactusGroup.destroyEach();
      restart.visible = false;
      gO.visible = false;   
      trex.changeAnimation("run", tRun);
      score = 0;
    }
    
  }
  trex.collide(iGround);
  
  
  
  
  drawSprites();
}

function spawnClouds()
  {
     var rand = random(50, 100);
    if(frameCount % 60 == 0)
    {
      var cloud = createSprite(600, rand, 50, 20 );
      cloud.velocityX = -7;
      cloud.addImage(cloudI);
      trex.depth = cloud.depth + 1;
      cloud.lifetime = 100;
      cloud.scale = 0.7;
      cloudsGroup.add(cloud);
    }
  }
    
  function sO()
    {
      if(frameCount % 50 == 0)
      {
        var cactus = createSprite(600, 170, 30, 50);
        cactus.scale = 0.4;
        cactus.velocityX = -5;
        cactus.lifetime = 150;
        var rand2 = Math.round(random(1, 6));
        switch(rand2)
        {
          case 1: cactus.addImage(cactus1);
          break;
          case 2: cactus.addImage(cactus2);
          break;
          case 3: cactus.addImage(cactus3);
          break;
          case 4: cactus.addImage(cactus4);
          break;
          case 5: cactus.addImage(cactus5);
          break;
          case 6: cactus.addImage(cactus6);
        }
        cactusGroup.add(cactus);

      }
    }