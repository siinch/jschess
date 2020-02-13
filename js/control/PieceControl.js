define (["PieceData"], function (pd) {

  function RemovePiece (position) {
    pd.pieces = pd.pieces.filter(x => x.position !== position);
  }

  function ResetPieces () {
    pd.pieces = pd.CreatePieces();
  }

  function MovePiece (fromPos, toPos) {
    pd.pieces.find(x => x.position === fromPos).position = toPos;
  }

  function GetPiece (position) {
    return pd.pieces.find(x => x.position === position);
  }

  function GetPieces () {
    return pd.pieces;
  }

  return {
    RemovePiece,
    ResetPieces,
    GetPieces,
    MovePiece,
    GetPiece
  }
});
