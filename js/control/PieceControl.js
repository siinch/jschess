define (["PieceData"], function (pd) {

  function DeletePiece (position) {
    pd.pieces = pd.pieces.filter(x => x.position !== position);
  }

  function ResetPieces () {
    pd.pieces = pd.CreatePieces();
  }

  function GetPieces () {
    return pd.pieces;
  }

  function UpdatePiecePosition (fromPos, toPos) {
    var piece = pd.pieces.find(x => x.position === fromPos);
    piece.position = toPos;
    piece.hasMoved = true;
  }

  function GetPiece (position) {
    return pd.pieces.find(x => x.position === position);
  }

  function UpdatePieceType (position, type) {
    pd.pieces.find(x => x.position === position).type = type;
  }

  function GetPieceMoves(position) {
    return pd.pieces.find(x => x.position === position).GetLegalMoves();
  }

  return {
    DeletePiece,
    ResetPieces,
    GetPieces,
    UpdatePiecePosition,
    GetPiece,
    UpdatePieceType,
    GetPieceMoves
  }
});
