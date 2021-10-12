var water, waterImg, waterG;
var fish, fishImg;
var coin, coinImg, coinG;
var bomb, bombImg, bombG;
var diamond, diamondImg, diamondG;
var food, foodImg, foodG;
var over, overImg;

var PLAY=1;
var END=0;
var gameState=1;

var score = 0;

var win, winImg;

function preload(){

    waterImg = loadImage("Bg.png");
    fishImg = loadImage("Fish.png");
    coinImg = loadImage("Coin1.png");
    bombImg = loadImage("bomb.png");
    diamondImg = loadImage("Diamond.png");
    foodImg = loadImage("fishfood.png");
    overImg = loadImage("gameOver.png");
    winImg = loadImage("win.png");
}

function setup() {
    createCanvas(600,600);

    water = createSprite(500,300,300,200);
    water.addImage("bg",waterImg);
    water.scale = 2.5;
    water.velocityX = 2;

    fish = createSprite(500,300,20,40);
    fish.addImage("fish",fishImg);
    fish.scale = 0.35;
    
    over = createSprite(300,300);
    over.addImage("End",overImg);

    win = createSprite(300,300);
    win.addImage("Win",winImg);

    diamondG = new Group();
    bombG = new Group();
    foodG = new Group();
    coinG = new Group();
}

function draw() {
    background(0);


    if (gameState == PLAY){

        if (water.x > 300){
            water.x = 100;
        }
    
        fish.y = World.mouseY;
    
        edges= createEdgeSprites();
        fish.collide(edges);

        over.visible = false;
        win.visible = false;

        make_coins();
        make_bomb();
        make_diamond();
        make_fishfood();

        if (coinG.isTouching(fish)){
            coinG.destroyEach();
            score = score + 150;
        }

        if (diamondG.isTouching(fish)){
            diamondG.destroyEach();
            score = score + 100;
        }

        if (foodG.isTouching(fish)){
            foodG.destroyEach();
            score = score + 50;
        }

        if (score>500){
            water.velocityX = 2.5;
            coinG.setVelocityXEach(2.5);
            diamondG.setVelocityXEach(2.5);
            foodG.setVelocityXEach(2.5);
            bombG.setVelocityXEach(2.5);
        }
        
        if (score>1000){
            water.velocityX = 3;
            coinG.setVelocityXEach(3);
            diamondG.setVelocityXEach(3);
            foodG.setVelocityXEach(3);
            bombG.setVelocityXEach(3);
        }

        if (score>2000){
            water.velocityX = 4;
            coinG.setVelocityXEach(4);
            diamondG.setVelocityXEach(4);
            foodG.setVelocityXEach(4);
            bombG.setVelocityXEach(4);
        }

        if (score>3000){
            water.velocityX = 5;
            coinG.setVelocityXEach(5);
            diamondG.setVelocityXEach(5);
            foodG.setVelocityXEach(5);
            bombG.setVelocityXEach(5);
        }

        if (score>=4000){
            water.velocityX = 0;

            win.visible = true;
            fish.visible = false;
            coinG.destroyEach();
            diamondG.destroyEach();
            foodG.destroyEach();
            bombG.destroyEach(); 
        }


        if (bombG.isTouching(fish)){
            gameState = END;
        }

    }

    else if (gameState == END){
        water.velocityX = 0;

        over.visible = true;  
        fish.visible = false;
        coinG.destroyEach();
        diamondG.destroyEach();
        foodG.destroyEach();
        bombG.destroyEach(); 
    }
    
    drawSprites();

    textSize(20);
    fill("brown");
    text("Score = " + score, 30,40);
}

function make_coins(){
    if (frameCount % 300 == 0) {
        coin = createSprite(50,50,40,20);
        coin.addImage("coins",coinImg);
        coin.y = Math.round(random(10,590));
        coin.scale = 0.1;
        coin.velocityX = 2;

        coin.depth = fish.depth;
        fish.depth = fish.depth + 1;

        coinG.add(coin);
    }
}

function make_bomb(){
    if (frameCount % 400 == 0) {
        bomb = createSprite(30,50,40,20);
        bomb.addImage("bombs",bombImg);
        bomb.y = Math.round(random(30,570));
        bomb.scale = 0.05;
        bomb.velocityX = 2;

        bomb.depth = fish.depth;
        fish.depth = fish.depth + 1;

        bombG.add(bomb);
    }
}


function make_diamond(){
    if (frameCount % 500 == 0) {
        diamond = createSprite(30,50,40,20);
        diamond.addImage("diamonds",diamondImg);
        diamond.y = Math.round(random(50,550));
        diamond.scale = 0.1;
        diamond.velocityX = 2;

        diamond.depth = fish.depth;
        fish.depth = fish.depth + 1;

        diamondG.add(diamond);
    }
}

function make_fishfood(){
    if (frameCount % 200 == 0) {
        food = createSprite(30,50,40,20);
        food.addImage("fishfoods",foodImg);
        food.y = Math.round(random(70,530));
        food.scale = 0.2;
        food.velocityX = 2;

        food.depth = fish.depth;
        fish.depth = fish.depth + 1;

        foodG.add(food);
    }
}