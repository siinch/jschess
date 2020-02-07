var squares = CreateSquares();
//console.log(squares);

function CreateSquares () {
  var squares = [];
  var rows = [1, 2, 3, 4, 5, 6, 7, 8];
  var colums = ["a", "b", "c", "d", "e", "f", "g", "h"];
  counter = 1;

  for (var column of colums) {
    for (var row of rows) {

      var square = {};
      square.position = column + row;
      if (counter % 2 === 1)
        square.color = "black";
      else
        square.color = "white";
      counter++;
      squares.push(square);

    }
  }

  return squares;
}
