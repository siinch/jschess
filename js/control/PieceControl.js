define (["PieceData"], function (pd) {

  function RemovePiece (position) {
    pd.pieces = pd.pieces.filter(x => x.position !== position);
    console.log(pd.pieces);
  }
  RemovePiece("a1");
  RemovePiece("b1");

  return {

  }
});
