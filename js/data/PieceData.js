define([], function() {

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
    legalMoves = legalMoves.concat(GetAllUp(piece));
    legalMoves = legalMoves.concat(GetAllDown(piece));
    legalMoves = legalMoves.concat(GetAllLeft(piece));
    legalMoves = legalMoves.concat(GetAllRight(piece));
    return legalMoves;
  }

  // Helper functions

  function GetAllDown (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

    // scan all the positions below the current position
    for(var r = row -1; r > 0; r--) {
      var pos = columns[column] + r;
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
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

    for(var r = row + 1; r < 9; r++) {
      var pos = columns[column] + r;
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
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

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
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);

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

  function GetAllLeftUp (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var column = columns.indexOf(piece.position[0]) -1;
    var row = parseInt(piece.position[1]) + 1;

    while(column > -1 && row < 9) {
      var pos = columns[column] + row;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != piece.color)
          legalMoves.push(pos);
        break;
      }
      column--;
      row++;
    }
    return legalMoves;
  }

  function GetAllRightUp (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var column = columns.indexOf(piece.position[0]) + 1;
    var row = parseInt(piece.position[1]) + 1;

    while(column < 8 && row < 9) {
      var pos = columns[column] + row;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if(otherPiece.color != piece.color)
          legalMoves.push(pos);
        break;
      }
      column++;
      row++;
    }
    return legalMoves;
  }

  console.log(pieces)
  console.log(GetAllRightUp(pieces[8]));

  return {
    pieces,
    CreatePieces
  };
});
