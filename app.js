var rows, cols, w = 2;
var cells = [], stack = [];

var x = 0, y = 0, ci = 0, loop = true;

var setup = function() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);

  rows = floor(height / w);
  cols = floor(width / w);
  
  for (var i = 0; i < rows * cols; i++) {
    cells.push(1);
  }
  cells[ci] = 0;

  noStroke();
  fill(255);
  rect(0, 0, w, w);
}

var draw = function() {
  for (var k = 0; k < 1000; k++) {
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
      //cells[(n.i + ci) / 2] = 0;
      cells[n.i] = 0;
      rect(w * n.x, w * n.y, w, w);
      rect(w * (n.x + x) / 2, w * (n.y + y) / 2, w, w);
      stack.push({ x: x, y: y, i: ci });
      x = n.x;
      y = n.y;
      ci = n.i;

      if (cols - x <= 2 && rows - y <= 2) {
        push();
        noFill();
        stroke(255, 0, 0);
        strokeWeight(w/2);
        translate(w / 2, w / 2);
        beginShape();
        stack.forEach(function (n) {
          vertex(n.x * w, n.y * w);
        });
        vertex(
          ceil(cols / 2 - 1) * 2 * w,
          ceil(rows / 2 - 1) * 2 * w);
        endShape();
        pop();
      }
    } else {
      var n = stack.pop();
      if (!n) {
        console.log("Finished");
        noLoop();
        return;
      } else {
        x = n.x;
        y = n.y;
        ci = n.i;
      }
    }
  }
}
