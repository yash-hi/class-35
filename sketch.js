var hyptonicball;
var database;
var position;


function setup(){
database=firebase.database();
console.log(database);
createCanvas(500,500);
hyptonicball = createSprite(250,250,10,10);
hyptonicball.shapeColor = "red";
   
var hyptonicballposition=database.ref("ball/position");
hyptonicballposition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

function readPosition(data){
    position=data.val();
    hyptonicball.x = position.x;
    hyptonicball.y = position.y;
}

function writePosition(x,y){
database.ref("ball/position").set({
'x':position.x+x,
'y':position.y+y
})
}

function showError(){
console.log("error in writting to the database");
}