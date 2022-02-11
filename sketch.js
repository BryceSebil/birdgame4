var life = 200;
var plane;
var upKeyActive = false;
var buildingGroup;
var heartGroup;
var gamestate = "play";
function preload() {
    birdImage = loadAnimation("bird1.png", "bird2.png", "bird3.png", "bird4.png");
    backgroundImage = loadImage("bg.png")
    smashImage = loadAnimation("smash1.png", "smash2.png", "smash3.png", "smash4.png")
    building1 = loadImage("building1.png")
    building2 = loadImage("building2.png")
    building3 = loadImage("building3.png")
    building4 = loadImage("building4.png")
    building5 = loadImage("building5.png")
    planeImage = loadImage("plane.png")
    heartImage = loadImage("heart.png")
    heartsound= loadSound ("heartsound.mp3");
    buildingsound = loadSound("building hit sound.wav")
    gameoversound = loadSound("gameover sound.wav");
}
var ground
function setup() {
    createCanvas(1000, 600);
    ground = createSprite(300, 340, 600, 10);
    ground.scale = 1.1
    ground.addImage("bg", backgroundImage);
    ground.velocityX = -4
    bird = createSprite(70, 70, 20, 20);
    bird.addAnimation("flying", birdImage);
    bird.scale = 0.5;
    buildingGroup = new Group();
    bird.debug = true;
    bird.setCollider("circle", 0, 0, 50);
    heartGroup = createGroup();

}
function draw() {
    background(50, 50, 50);

    if (gamestate == "play") {
        if (bird.y < 50) {
            bird.y = 50
        } if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        if (keyDown(UP_ARROW)) {
            upKeyActive = true
            bird.velocityY = -10
        }
        bird.velocityY += 0.5;
        spawnbuilding();
        spawnplane();
        spawnheart();
        drawSprites();
        if (frameCount > 130) {
            bird.isTouching(buildingGroup, buildingHit)
        }

        if (frameCount > 150) {
            bird.isTouching(heartGroup, heartHit);
        }
        if (bird.y > 600) {
            gamestate = "end";
        }
        if(life<=0){
            gamestate = "end";
        }
    } else if (gamestate == "end") {
        textSize(60);
        background("lightblue")
        stroke(0);
        strokeWeight(5)
        fill("white")
        text("G A M E  O V E R", width / 2-300, height / 2);
    
        fill("white")
        text("reload the page to play Again", width / 2-400, height / 2+70);

    }
        if(bird.isTouching(buildingGroup)){
            console.log("buildingsound")
            buildingsound.play();
        }
        

    push()
    fill("white");
    image(heartImage, width - 40, 30, 30, 30)
    rect(width - 250, 30, 200, 20);
    pop();
    push();
    fill("red");

    rect(width - 250, 30, life, 20)
    pop();

}

function heartHit(bird, heart) {
    heart.destroy();
    if (life < 200) {
        life += 45;
    }
}
function buildingHit(bird, building) {
    bird.y -= 50;
    building.destroy();
    //bird.x +=100;
    life = life - 50;
}

function spawnbuilding() {
    if (frameCount % 120 === 0) {
        var building = createSprite(800, 370, 10, 40);
        building.velocityX = -6;
        building.lifeTime = 100
        building.scale = 1.2

        var rand = Math.round(random(1, 4));
        switch (rand) {
            case 1: building.addImage(building1);
                break;
            case 2: building.addImage(building2);
                break;
            case 3: building.addImage(building3);
                break;
            case 4: building.addImage(building4);
                break;
            default: break;
        }
        buildingGroup.add(building);
    }
}

function spawnplane() {
    if (frameCount % 250 === 0) {
        var plane = createSprite(00, 100, 10, 40);
        plane.addImage(planeImage)
        plane.velocityX = 4;
        plane.lifeTime = 150
        plane.scale = 0.2;
    }
}

function spawnheart() {
    if (frameCount % 100 === 0 || frameCount == 50 || frameCount == 200) {
        var heart = createSprite(600, 100, 10, 10);
        heart.addImage(heartImage);
        heart.velocityX = -4;
        heart.y = Math.round(random(50, 740))
        heart.lifetime = 150;
        heart.scale = 0.08;
        heartGroup.add(heart);
    }
}