define([], function() {

  var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var pieces = CreatePieces();

  function CreatePieces () {
    var rows = [1, 2, 7, 8];
    var pieces = [];

    for (var row of rows) {
      for (var column of columns) {
        var piece = {};
        piece.position = column + row;
        piece.GetLegalMoves = GetLegalMoves;

        if (row < 3)
          piece.color = "white";
        else if (row > 6)
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

  function GetLegalMoves() {
    switch (this.type) {
      case "rook": return GetLegalMovesRook(this); break;
    }
  }

  function GetLegalMovesRook(rook) {
    var legalMoves = [];
    rook.position = "d5";
    var letter = rook.position[0];
    var column = columns.indexOf(rook.position[0]);
    var row = parseInt(rook.position[1]);

    // scan moves down
    for(var r = row -1; r > 0; r--) {
      var pos = letter + r;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != rook.color)
          legalMoves.push(pos);
        break;
      }
    }

    // scan up
    for(var r = row + 1; r < 9; r++) {
      var pos = letter + r;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != rook.color)
          legalMoves.push(pos);
        break;
      }
    }

    // scan right
    for(var c = column + 1; c < 8; c++) {
      var pos = columns[c] + row;
      console.log(pos)
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != rook.color)
          legalMoves.push(pos);
        break;
      }
    }

    // scan left
    for(var c = column - 1; c > -1; c--) {
      var pos = columns[c] + row;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != rook.color)
          legalMoves.push(pos);
        break;
      }
    }

    return legalMoves;
  }

  function GetAllLegalMovesDown (piece) {
    var legalMoves = [];
    var letter = piece.position[0];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(rook.position[1]);

    // scan all the positions below the current position
    for(var r = row -1; r > 0; r--) {
      var pos = letter + r;
      // check for other pieces
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        // legal if other color and stop
        if(otherPiece.color != rook.color)
          legalMoves.push(pos);
        break;
      }
    }

    return legalMoves;
  }

  return {
    pieces,
    CreatePieces
  };
});
