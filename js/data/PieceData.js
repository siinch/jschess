define([], function() {

  var pieces = CreatePieces();

  function CreatePieces () {
    var colums = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var rows = [1, 2, 7, 8];
    var pieces = [];

    for (var row of rows) {
      for (var column of colums) {
        var piece = {};
        piece.position = column + row;

        if (row < 3)
          piece.color = "white";
        else
          piece.color = "black";

        if (row === 2 || row === 7)
          piece.type = "pawn";
        else {
          if (column === "a" || column === "h")
            piece.type = "rook";
          else if (column === "b" || column === "g")
            piece.type = "knight";
          else if (column === "c" || column === "f")
            piece.type = "bishop";
          else if (column === "d")
            piece.type = "queen";
          else
            piece.type = "king";
        }
        pieces.push(piece);
      }
    }

    return pieces;
  }

  function ResetPieces () {
    pieces = CreatePieces();
  }

  return {
    pieces,
    ResetPieces
  };
});
