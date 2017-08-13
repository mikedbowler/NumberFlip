//Display the game board
displayBoard();

var tds = document.querySelectorAll("td");

//Displays the gmae board
function displayBoard(){

var board = "<table cellspacing='8px'>";
var side = "<table cellspacing='8px'>";
var bottom = "<table cellspacing='8px'><tr>";
var n = 0;

	for(i=0;i<5;i++){

		board+="<tr>";

		for(j=0;j<5;j++){

			board+="<td id='box"+(n++)+"' class='tile' onclick='showCellNumber(this)'></td>";

		}

		board+="</tr>";
	}

	board+="</table>";

	document.getElementById("board").innerHTML = board;

	for (i=0;i<5;i++){
		side+="<tr><td id='s"+i+"'></td></tr>";
		bottom+="<td id='b"+i+"'></td>";
	}

	side+="</table>";
	bottom+="</tr></table>";

	document.getElementById("side").innerHTML = side;
	document.getElementById("bottom").innerHTML = bottom;
	
}

//Function for debugging purposes to ensure box ids are correct.
function showCellNumber(box){

	box.innerHTML = box.id.replace("box","");
}