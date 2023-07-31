img = "";
status = "";
objects = [];

function preload()
{
img = loadImage('Cats.jpg');
}

function setup()
{
    canvas = createCanvas(500, 350);
    canvas.position(390,280);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
}

function draw()
{
    image(img, 0, 0, 500, 350);
    
    if (status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            fill("#F28500");
            strokeWeight(0.5);
            document.getElementById("Count").innerHTML = "Object Count = " + objects.length;
            percent = floor(objects[i].confidence * 100);
            textSize(15);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 20);
            noFill();
            strokeWeight(3);
            stroke("#F28500");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}