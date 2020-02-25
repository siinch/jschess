define(["LegalMovesUtility"], function(lmu) {

  var pieces = CreatePieces();

  function CreatePieces () {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
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

  function GetLegalMovesRook (piece) {
    var legalMoves = [];
    piece.position = "5d";
    legalMoves = legalMoves.concat(lmu.GetAllUp(piece));
    legalMoves = legalMoves.concat(lmu.GetAllDown(piece));
    legalMoves = legalMoves.concat(lmu.GetAllLeft(piece));
    legalMoves = legalMoves.concat(lmu.GetAllRight(piece));
    console.log(legalMoves);
    return legalMoves;
  }

  // Helper functions

  function GetAllDown (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var letter = piece.position[0];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

    // scan all the positions below the current position
    for(var r = row -1; r > 0; r--) {
      var pos = letter + r;
      // check for other pieces
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        // legal if other color and stop
        if(otherPiece.color != piece.color)
          legalMoves.push(pos);
        break;
      }
    }
    return legalMoves;
  }

  function GetAllUp (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var letter = piece.position[0];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

    for(var r = row + 1; r < 9; r++) {
      var pos = letter + r;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != piece.color)
          legalMoves.push(pos);
        break;
      }
    }

    return legalMoves;
  }

  function GetAllRight (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var letter = piece.position[0];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

    // scan right
    for(var c = column + 1; c < 8; c++) {
      var pos = columns[c] + row;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != piece.color)
          legalMoves.push(pos);
        break;
      }
    }

    return legalMoves;
  }

  function GetAllLeft (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var letter = piece.position[0];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

    // scan left
    for(var c = column - 1; c > -1; c--) {
      var pos = columns[c] + row;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != piece.color)
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
