define (["PieceData", "PieceControl"],
function (pd, pc) {

  function RemovePiece_Success() {
    var position = "a1";

    pc.RemovePiece(position);

    console.log("RemovePiece_Success: " + (pd.pieces.filter(x => position === x.position).length === 0));
  }
  RemovePiece_Success();

  return {

  }

});
