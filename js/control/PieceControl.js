define (["PieceData"], function (pd) {

  function RemovePiece (position) {
    pd.pieces = pd.pieces.filter(x => x.position !== position);
  }

  return {
    RemovePiece
  }
});
