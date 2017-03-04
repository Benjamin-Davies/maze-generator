var rows, cols, w = 20, drawRout = false;
var cells = [], stack = [];

var x = 0, y = 0, ci = 0, loop = true;

var setup = function() {
  createCanvas(380, 380).parent("canvascontainer");
  
  try {
    // http://stackoverflow.com/questions/6539761/window-location-search-query-as-json
    var params = location.search;
    params = "{\"" + params.replace(/\?/gi, "").replace(/\&/gi, "\",\"").replace(/\=/gi, "\":\"") + "\"}";
    params = JSON.parse(params);

    var dif = int(params.dif);

    switch (dif) {
      case 1:
        w = 15;
        resizeCanvas(375, 375);
        document.getElementById("dif").innerText = "Medium";
        break;
      case 2:
        w = 10;
        resizeCanvas(390, 390);
        document.getElementById("dif").innerText = "Hard";
        break;
      case 3:
        w = 5;
        resizeCanvas(395, 395);
        document.getElementById("dif").innerText = "Super Hard";
        break;
    }
  } catch (e) { }

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

      if (cols - x <= 2 && rows - y <= 2 && drawRout) {
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
