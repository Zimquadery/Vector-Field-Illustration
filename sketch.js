let H, W;
let v = [];
let p = [];
let scl = 30;
let z = 0.0005;
let cnv;
function setup() {
  createCanvas(windowWidth, windowHeight);
  H = height / scl;
  W = width / scl;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      let index = i * W + j;
      let a = noise(j / 100, i / 100, z) * TWO_PI * 7;
      v[index] = p5.Vector.fromAngle(a).setMag(1);
    }
  }
  cnv = createGraphics(width, height);
  cnv.fill(0, 0, 255);
  cnv.noStroke();
  cnv.textAlign(CENTER, CENTER);
  cnv.textSize(25);
  cnv.textStyle("bold");
  cnv.text("Vector Flow Feild", width / 2, 25);
  cnv.textSize(15);
  cnv.text("Click to drop particles", width / 2, 50);
}

function draw() {
  background(255);
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      let index = i * W + j;
      let y = i * scl;
      let x = j * scl;
      push();
      translate(x + scl / 2, y + scl / 2);
      rotate(v[index].heading());
      stroke(30, 200);
      line(0, 0, scl, 0);
      fill(30, 200);
      beginShape();
      vertex(scl - 5, 5);
      vertex(scl, 0);
      vertex(scl - 5, -5);
      endShape(CLOSE);
      pop();
      let a = noise(j / 100, i / 100, z) * TWO_PI * 7;
      v[index] = p5.Vector.fromAngle(a).setMag(1);
    }
  }
  z += 0.0005;

  strokeWeight(5);
  stroke(0, 0, 255);
  for (let i = 0; i < p.length; i++) {
    let index = floor(p[i].x / scl) + floor(p[i].y / scl) * W;
    p[i].add(v[index]);
    point(p[i].x, p[i].y);
    if (p[i].x > width) p[i].x = 0;
    if (p[i].x < 0) p[i].x = width;
    if (p[i].y > height) p[i].y = 0;
    if (p[i].y < 0) p[i].y = height;
  }
  strokeWeight(1);
  image(cnv, 0, 0);
}
function mouseReleased() {
  let x = createVector(mouseX, mouseY);
  p.push(x);
}
