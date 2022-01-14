img = "";
Status = "";
objects = [];

function preload(){
    img = loadImage("desk.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function draw(){
    image(img,0,0,640,420);

    if(Status != ""){

        objectDetector.detect(img,gotResult);

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("status").innerHTML = "Number of Objects Detected are : " + objects.length;

           fill("#000000");
           percent = floor(objects[i].confidence*100);
           text(objects[i].label + " " + percent + "%" + objects[i].x,objects[i].y);
           noFill();
           stroke("#000000");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}

function modelLoaded(){
    console.log("Model is Loaded !");
    Status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function back(){
    window.location = "index.html";
}