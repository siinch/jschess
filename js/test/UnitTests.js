define (["PieceControl"],
function (pc) {

  function GetPieces_Success() {
    console.log("GetPieces_Success: " + (pc.GetPieces().length === 32));
  } GetPieces_Success();

  function ResetPieces_Success() {
    var original = pc.GetPieces();

    pc.RemovePiece("a1");
    pc.ResetPieces();

    console.log("ResetPieces_Success: " + (original[0].position === pc.GetPieces()[0].position));
  } ResetPieces_Success();

  function RemovePiece_Success() {
    var position = "a1";

    pc.RemovePiece(position);

    console.log("RemovePiece_Success: " + (pc.GetPieces().filter(x => position === x.position).length === 0));
    pc.ResetPieces();
  } RemovePiece_Success();

  return {

  }

});
