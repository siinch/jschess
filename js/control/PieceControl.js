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

  return {
    RemovePiece,
    ResetPieces,
    GetPieces
  }
});
