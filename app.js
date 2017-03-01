var rows, cols, w = 20;
var cells = [];

var x = 0, y = 0;

var setup = function() {
  createCanvas(400, 400);
  background(0);

  rows = floor(height / w);
  cols = floor(width / w);
  
  for (var i = 0; i < rows * cols; i++) {
    cells.push(1);
  }
}

var draw = function() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var index = i + j * cols;
      fill(cells[index] ? 0 : 255);
      stroke(150);
      rect(w * i, w * j, w, w);
    }
  }
}
