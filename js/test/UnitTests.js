define (["PieceControl"],
function (pc) {

  function GetPieces_Success() {
    console.log("GetPieces_Success: " + (pc.GetPieces().length === 32));
  } GetPieces_Success();

  function ResetPieces_Success() {
    var original = pc.GetPieces();

    pc.DeletePiece("a1");
    pc.ResetPieces();

    console.log("ResetPieces_Success: " + (original[0].position === pc.GetPieces()[0].position));
  } ResetPieces_Success();

  function DeletePiece_Success() {
    var position = "a1";

    pc.DeletePiece(position);

    console.log("DeletePiece_Success: " + (pc.GetPieces().filter(x => position === x.position).length === 0));
    pc.ResetPieces();
  } DeletePiece_Success();

  function UpdatePiecePosition_Success () {
    var fromPos = "a1";
    var toPos = "a4";

    pc.UpdatePiecePosition(fromPos, toPos);

    console.log("UpdatePiecePosition_Success: " + (pc.GetPieces()[0].position === toPos));
    pc.ResetPieces();
  } UpdatePiecePosition_Success();

  function GetPiece_Success () {
    var piece = pc.GetPiece("a1");
    console.log("GetPiece_Success: " + (piece.position === "a1" && piece.color === "white" && piece.type === "rook"));
  } GetPiece_Success();

  function UpdatePieceType_Success () {
    var position = "a1";
    var type = "rook";

    pc.UpdatePieceType(position, type);

    console.log("UpdatePieceType_Success: " + (pc.GetPiece(position).type === type));
    pc.ResetPieces();
  } UpdatePieceType_Success();

  function GetRookMoves_Success() {
    var expectedMoves = ["d6", "d7", "d4", "d3", "c5", "b5", "a5", "e5", "f5", "g5", "h5"];

    pc.UpdatePiecePosition("a1", "d5");
    var moves = pc.GetPieceMoves("d5");

    console.log("GetRookMoves_Success: " + (expectedMoves.toString() === moves.toString()));
  } GetRookMoves_Success();

  return {

  }

});
