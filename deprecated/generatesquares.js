// utility script for writing json array of squares
// run the script and copy from the console into the json file

var rows = [1, 2, 3, 4, 5, 6, 7, 8];
var colums = ["a", "b", "c", "d", "e", "f", "g", "h"];
counter = 1;

console.log('"squares":[');
for (var column of colums) {
  for (var row of rows) {
    console.log("  {")
    console.log('    "position":"' + column + row + '",');
    if(counter % 2 === 1) console.log('    "color":"black"'); else console.log('    "color":"white"');
    if (column === "h" && row === 8) console.log("  }"); else console.log("  },");
    counter++;
  }
}
console.log("]");
