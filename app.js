var rows, cols, w = 8;
var cells = [], stack = [], path = [];

var x = 0, y = 0, ci = 0, loop = true;

var setup = function() {
  createCanvas(640, 320);
  background(0);

  rows = floor(height / w);
  cols = floor(width / w);
  
  for (var i = 0; i < rows * cols; i++) {
    cells.push(1);
  }
  cells[ci] = 0;
}

var draw = function() {
  for (var k = 0; k < 1; k++) {
    // check neighboors
    var neighboors = [];
    for (i = -2; i <= 2; i += 2) {
      for (j = -2; j <= 2; j += 2) {
        var index = x + i + (y + j) * cols;

        if (abs(i) + abs(j) == 2 &&
            x + i >= 0 && x + i < cols &&
            y + j >= 0 && y + j < rows &&
            cells[index]) {
          neighboors.push({ x: x + i, y: y + j, i: index });
        }
      }
    }

    // pick a neighboor or backtrack
    if (neighboors.length > 0) {
      var i = floor(random() * neighboors.length);
      var n = neighboors[i];
      cells[(n.i + ci) / 2] = 0;
      cells[n.i] = 0;
      stack.push({ x: x, y: y, i: ci });
      x = n.x;
      y = n.y;
      ci = n.i;

      if (x == cols - 2 && y == rows - 2)
        stack.forEach(function (n2) { path.push(n2); })
    } else {
      var n = stack.pop();
      if (!n) {
        console.log("Finished");
        noLoop();
      } else {
        x = n.x;
        y = n.y;
        ci = n.i;
      }
    }
  }

  noStroke();
  fill(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var index = i + j * cols;
      if (!cells[index])
        rect(w * i, w * j, w, w);
    }
  }
  
  fill('lime');
  rect(w * x, w * y, w, w);
  
  if (path.length > 0) {
    push();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(3/4*w);
    translate(w / 2, w / 2);
    beginShape();
    path.forEach(function (n) {
      vertex(n.x * w, n.y * w);
    });
    vertex(width - 2*w, height - 2*w)
    endShape();
    pop();
  }
}
