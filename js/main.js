require.config({

  paths: {
    PieceData: "data/PieceData"
  }

});

require(["PieceData"], function(pd) {
  console.log(pd.pieces);
});
