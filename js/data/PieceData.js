define([], function() {

  var pieces = CreatePieces();
  var inEnPassant = [];

  function CreatePieces () {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var rows = [1, 2, 7, 8];
    var pieces = [];

    for (var row of rows) {
      for (var column of columns) {
        var piece = {};
        piece.position = column + row;
        piece.GetLegalMoves = GetLegalMoves;
        piece.hasMoved = false;

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
      case "bishop": return GetLegalMovesBishop(this); break;
      case "queen": return GetLegalMovesQueen(this); break;
      case "knight": return GetLegalMovesKnight(this); break;
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

  function GetLegalMovesBishop (piece) {
    var legalMoves = [];
    legalMoves = legalMoves.concat(GetAllLeftUp(piece));
    legalMoves = legalMoves.concat(GetAllRightUp(piece));
    legalMoves = legalMoves.concat(GetAllLeftDown(piece));
    legalMoves = legalMoves.concat(GetAllRightDown(piece));
    return legalMoves;
  }

  function GetLegalMovesQueen (piece) {
    var legalMoves = [];
    legalMoves = legalMoves.concat(GetAllUp(piece));
    legalMoves = legalMoves.concat(GetAllDown(piece));
    legalMoves = legalMoves.concat(GetAllLeft(piece));
    legalMoves = legalMoves.concat(GetAllRight(piece));
    legalMoves = legalMoves.concat(GetAllLeftUp(piece));
    legalMoves = legalMoves.concat(GetAllRightUp(piece));
    legalMoves = legalMoves.concat(GetAllLeftDown(piece));
    legalMoves = legalMoves.concat(GetAllRightDown(piece));
    return legalMoves;
  }

  function GetLegalMovesKnight(piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = []
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);
    var moves = [{col: -2, row: -1}, {col: -2, row: 1}, {col: -1, row: -2}, {col: -1, row: 2}, {col: 1, row: -2}, {col: 1, row: 2}, {col: 2, row: -1}, {col: 2, row: 1}];

    for (var move of moves) {
      var c = column + move.col;
      var r = row + move.row;

      if (!(-1 < c && c < 8 && 0 < r && r < 9))
        continue;
      var pos = columns[c] + r;
      var otherPiece = pieces.find(x => x.position === pos);
      if (otherPiece === undefined)
        legalMoves.push(pos);
      else {
        if (otherPiece.color != piece.color)
          legalMoves.push(pos);
      }
    }

    return legalMoves;
  }

  function GetLegalMovesPawn(piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = []
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);
    var dir = 1;
    if(piece.color === "black") dir = -1;
    var moves = [{col: -1, row: dir, enPassant: false}, {col: 0, row: dir, enPassant: false}, {col: 1, row:dir, enPassant: false}];
    if (!piece.hasMoved) moves.push({col: 0, row: 2*dir, enPassant: true});

    for (var move of moves) {
      var c = column + move.col;
      var r = row + move.row;
      if (0 < r && r < 9 && -1 < c && c < 8) {
        var pos = columns[c] + r;
        var otherPiece = pieces.find(x => x.position === pos);
        if(c === column && otherPiece === undefined) {
          // move two forward if both spaces are empty
          if(move.enPassant) {
            var p = columns[c] + (move.row / 2);
            otherPiece = pieces.find(x => x.position === p);
            if(otherPiece === undefined)
                legalMoves.push(pos);
          }
          // move one forward if space is empty
          else legalMoves.push(pos);
        }
        // check if diagonal piece is same color
        else if (otherPiece.color != piece.color)
          legalMoves.push(pos);
        // check for En Passant moves
        else if (otherPiece === undefined) {
          otherPiece = inEnPassant.find(x => x.takePos === pos);
          if(otherPiece != undefined) {
            otherPiece = pieces.find(x => x.position === otherPiece.actualPos);
            if(otherPiece.color != piece.color)
              legalMoves.push(pos);
          }
        }
      }
    }

    return legalMoves;
  }

  function GetLegalMovesKing (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var column = columns.indexOf(piece.position[0]);
    var row = parseInt(piece.position[1]);
    var moves = [{col: 0, row: 1}, {col: 1, row: 1}, {col: 1, row: 0}, {col: 1, row: -1}, {col: 0, row: -1}, {col: -1, row: -1}, {col: -1, row: 0}, {col: -1, row: 1}];

    for (var move of moves) {
      var c = column + move.col;
      var r = row + move.row;
      if (0 < r && r < 9 && -1 < c && c < 8) {
        var pos = columns[c] + row;
        otherPiece = pieces.find(x => x.position === pos);
        if (otherPiece === undefined)
          legalMoves.push(pos);
        else if (otherPiece.color != piece.color)
          legalMoves.push(pos);
      }
    }
    // check if castling is possible
    if(!piece.hasMoved) {
      var piecesLeft = GetAllLeft(piece);
      if(piecesLeft[0].type === "rook" && !piecesLeft[0].hasMoved)

    }

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

  function GetAllLeftDown (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var column = columns.indexOf(piece.position[0]) - 1;
    var row = parseInt(piece.position[1]) - 1;

    while(column > -1 && row > 0) {
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
      row--;
    }
    return legalMoves;
  }

  function GetAllRightDown (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var column = columns.indexOf(piece.position[0]) + 1;
    var row = parseInt(piece.position[1]) - 1;

    while(column < 8 && row > 0) {
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
      row--;
    }
    return legalMoves;
  }

  function GetAllLegalMoves(color) {
    var legalMoves = [];
    for ()
  }

  return {
    pieces,
    CreatePieces
  };
});
