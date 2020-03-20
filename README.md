# Javascript Chess
Chess game in pure Javascript except for module loading with RequireJS and a bit of HTML and CSS. The application is broken into the follwing layers:
## Data
Here data of the pieces is generated as an array with objects with the following properties and methods:
- position : string ("a1", "a2", "a3" .... h8)
- GetLegalMoves : method (returns array of all the legal moves)
- hasMoved : boolean (used to control legal moves)
- color : string ("black" or "white")
- type : string ("pawn", "rook", "knight", etc)

## Control
