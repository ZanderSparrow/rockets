let button;
let rocketData = null;

function preload() {
  httpGet('/getSpacePic', function(response) {
    let spaceImg = loadImage(JSON.parse(response).url);
    console.log(spaceImg);
  });
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //background(0, 100, 250);
  // setup an input for the number of rockets
  input = createInput();
  input.position(60, 80);

  // setup a button (requires p5.dom library, see index.html)
  button = createButton('Get Rockets');
  button.position(60, 120);
  button.id('rockets-btn');
  button.mousePressed(getRockets);

  textAlign(CENTER);

  frameRate(10);
}

// --------------------------------------------------------
function draw() {
  var color1 = color(0, 0, 153);
  var color2 = color(204, 51, 0);
  setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
  
  var xStar, yStar;
  for (var i = 0; i < 50; i++) {
    xStar = random(windowWidth);
    yStar = random(windowHeight-200);
    noStroke();
    fill(255, 255, 0);
    ellipse(xStar, yStar, 2, 2);
  }

  setupTitle();

  let x = 60;
  let startingY = 200;
  var rad = 10;

  if (rocketData) {

    // do something with the data!
    for (var i = 0; i < rocketData.length; i++) {
      //🚀!!
      stroke(255, 255, 0);
      star(x, startingY + (30 * i) - rad/2, i, rad, i + 2);
      noStroke();
      createRocketInfo(rocketData[i], x + rad + 10, startingY + (30 * i));
    }
  }
}

// --------------------------------------------------------
function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// --------------------------------------------------------
function setupTitle() {
  fill(200);
  textAlign(LEFT);
  textSize(22);
  let titleText = "Enter number of rockets";
  text(titleText, 60, 60);
}

// --------------------------------------------------------
function getRockets() {
  var num = input.value();
  httpGet('/getRocketData?num=' + num, function(response) {
    rocketData = JSON.parse(response).launches;
    console.log(rocketData);
  });
  input.value();
}

// --------------------------------------------------------
function createRocketInfo(rocket, xPos, yPos) {
  // this time, we'll draw some of the rocket's info to the canvas
  let name       = rocket.name;
  let startDate = rocket.windowstart;
  let endDate = rocket.windowend;
  let content = "\"" + name + "\" scheduled launch between " + startDate + " and " + endDate;

  textSize(16);
  text(content, xPos, yPos);
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == "X") {  // Left to right gradient
    for (let j = x; j <= x+w; j++) {
      var inter2 = map(j, x, x+w, 0, 1);
      var d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y+h);
    }
  }
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}