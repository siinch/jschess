define([], function () {

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
    var letter = rook.position[0];
    var column = columns.indexOf(rook.position[0]);
    var row = parseInt(rook.position[1]);

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

    return legalMoves;
  }

  function GetAllLeft (piece) {
    var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var legalMoves = [];
    var letter = rook.position[0];
    var column = columns.indexOf(rook.position[0]);
    var row = parseInt(rook.position[1]);

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

  return {
    GetAllDown,
    GetAllUp,
    GetAllRight,
    GetAllLeft
  }

});
