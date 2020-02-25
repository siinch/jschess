require.config({

  paths: {
    PieceData: "data/PieceData",
    LegalMovesUtility: "data/LegalMovesUtility",
    PieceControl: "control/PieceControl",
    UnitTests: "test/UnitTests"
  }

});

require(["UnitTests"], function(ut) {
});
