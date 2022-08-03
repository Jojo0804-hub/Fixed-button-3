const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var rope2;
var fruit_con2;
var button2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var eat
var blink
var sad

var sad_sound
var bg_sound
var eat_sound
var cut_sound
var air_sound
var foil_sound

var blower,blwrImg

var muteButton

var button3,rope3,fruit_con3

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
 eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")
blwrImg=loadImage("blower.png")
blink.playing=true
eat.playing=true
eat.looping=false
sad.playing=true
sad.looping=false
sad_sound=loadSound("sad.wav")
 bg_sound=loadSound("sound1.mp3")
 eat_sound=loadSound("eating_sound.mp3")
 cut_sound=loadSound("rope_cut.mp3")
 air_sound=loadSound("air.wav")
 foil_sound=loadSound("Cutting_Through_Foliage.mp3")
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  bg_sound.play()
bg_sound.setVolume(0.2)

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(330,35);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(360,200);
  button3.size(60,60);
  button3.mouseClicked(drop3);

  muteButton=createImg("mute.png")
  muteButton.position(450,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)
  
blower=createImg("blower.png")
blower.position(10,250)
blower.size(150,100)
blower.mouseClicked(airblow)

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(7,{x:400,y:225});
  ground = new Ground(200,690,600,20);
blink.frameDelay=20
eat.frameDelay=20
sad.frameDelay=20
  bunny = createSprite(230,620,100,100);
bunny.addAnimation("blinking",blink)
bunny.addAnimation("eating",eat)
bunny.addAnimation("crying",sad)
bunny.changeAnimation("blinking")
  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);
if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}


  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation("eating")
    eat_sound.play()
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("crying")
    sad_sound.play()
  }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
 cut_sound.play()
}
function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
 cut_sound.play()
}
function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
 cut_sound.play()
}
function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80){
      World.remove(engine.world,fruit)
      fruit=null
      return true    
    }
    else{
      return false
    }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air_sound.play()
}

function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play()
  }
}