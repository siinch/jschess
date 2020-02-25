define([], function () {

  function GetLegalMovesRook(rook) {
    var legalMoves = [];
    rook.position = "d5";
    var letter = rook.position[0];
    var column = columns.indexOf(rook.position[0]);
    var row = parseInt(rook.position[1]);

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

  function AllMovesDown (piece) {
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

  }

});
