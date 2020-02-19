define (["PieceData"], function (pd) {

  function RemovePiece (position) {
    pd.pieces = pd.pieces.filter(x => x.position !== position);
  }

  function ResetPieces () {
    pd.pieces = pd.CreatePieces();
  }

  function GetPieces () {
    return pd.pieces;
  }

  function UpdatePiecePosition (fromPos, toPos) {
    pd.pieces.find(x => x.position === fromPos).position = toPos;
  }

  function GetPiece (position) {
    return pd.pieces.find(x => x.position === position);
  }

  function UpdatePieceType (piece, type) {
    pd.pieces[pd.pieces.indexOf(piece)].type = type;
  }

  return {
    RemovePiece,
    ResetPieces,
    GetPieces,
    UpdatePiecePosition,
    GetPiece,
    UpdatePieceType
  }
});
