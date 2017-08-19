 //Declaring board variable
 var board = new2DArray(5,5);
 var rowHints = [5];
 var colHints = [5];
 var numOf2s = 0;
 var numOf3s = 0;
 var totalPoints = 0;
 var score = 1;
 var gameOver = false;
 var isWin = false;
 var tilesFlipped = 0;
 var level = 1;

 initializeBoard();
 createHints();

//Display the game board
displayBoard();
//Display the hints
displayHints();

var tds = document.querySelectorAll("td");

//Resets the game and changes the level up or down depending on the game's outcome
function levelChange(){

	if(isWin){
		numOf2s = 0;
		numOf3s = 0;
		totalPoints += score;
		score = 1;
		level++;
		gameOver = false;
		isWin = false;
		tilesFlipped = 0;
	}
	else{
		numOf2s = 0;
		numOf3s = 0;
		score = 1;
		gameOver = false;
		level = (tilesFlipped < level) ? tilesFlipped : level;
		tilesFlipped = 0;
	}

	initializeBoard();
 	createHints();

	//Display the game board
	displayBoard();
	//Display the hints
	displayHints();
}

//Displays the gmae board
function displayBoard(){

var board = "<table cellspacing='8px'>";
var side = "<table cellspacing='8px'>";
var bottom = "<table cellspacing='8px'><tr>";
var n = 0;

	for(i=0;i<5;i++){

		board+="<tr>";

		for(j=0;j<5;j++){

			board+="<td id='box"+(n++)+"' class='tile' onclick='showNumber(this)'></td>";

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

//Displays the hints
function displayHints(){

	for(i=0;i<5;i++){
		document.getElementById("s"+i).innerHTML = rowHints[i].getHint();
		document.getElementById("b"+i).innerHTML = colHints[i].getHint();
	}
}

//Function for debugging purposes to ensure box ids are correct.
function showNumber(box){

	//If game is over this will prevent the player from flipping over more tiles.
	if(!gameOver){

	//box.innerHTML = box.id.replace("box",""); //Prints the current box's id.
	var boxValue = getBoardRC(box.id.replace("box",""));
	box.innerHTML = boxValue;
	box.style.background = "#B88880";

	onFlipUpdate(boxValue);
	}
}

/**************************************************************
Below this section is all code related to the game's logic.
The code above this division is more suited to the display of
elements on screen.
**************************************************************/

//Creates a 2D array with the given number of rows and columns
function new2DArray(r,c){

	var arr = [r];

	for(i=0;i<r;i++){
		arr[i] = [c];
	}

	return arr;
}

//Initializes each tile on the board with either 0, 1, 2, or 3.
function initializeBoard(){

	var num = 0;

	for(i=0;i<5;i++){
		for(j=0;j<5;j++){
			
			num = getRandomInt(0,3);

			if(num == 3){
				numOf3s++;
			}
			else if(num == 2){
				numOf2s++;
			}

			board[i][j] = num;
		}
	}
}

//Create hints to be added to the board
function createHints(){

	var rowHint = new Hint(0,0);
	var colHint = new Hint(0,0);

	for (i=0;i<5;i++){
		for(j=0;j<5;j++){

			if(board[i][j] > 0){
				rowHint.ptotal += board[i][j];
			}
			else{
				rowHint.ztotal++;
			}

			if(board[j][i] > 0){
				colHint.ptotal += board[j][i];
			}
			else{
				colHint.ztotal++;
			}
			
		}//End inner for loop

		rowHints[i] = rowHint;
		colHints[i] = colHint;

		rowHint = new Hint(0,0);
		colHint = new Hint(0,0);		
	}//End outer for loop
}

//Decides the next action based on what number was flipped over
function onFlipUpdate(num){

	tilesFlipped++;

	switch (num){

		case 0:
			score*=0;
			gameOver = true;
			alert("Game Over You Flipped Over A Zero!");
			levelChange();
			alert("Start level "+level+"?");
			break;
		case 2:
			numOf2s--;
			score*=2;
			isWinner();
			break;
		case 3:
			numOf3s--;
			score*=3;
			isWinner();
			break;
		default:
			break;
	}
}

//Determines if the player won the game
function isWinner(){

	if(numOf2s + numOf3s == 0){
		gameOver = true;
		isWin = true;
		alert("Congratulations You Won!\nScore = "+(score+totalPoints));
		levelChange();
		alert("Start level "+level+"?");
	}
}

/*Converts a number in the range [1,25] into the corresponding coordinates in
a 2D array. Example: 1 is converted to array[R][C] where R=0 and C=0. Returns 
the value located at board[r][c].
*/
function getBoardRC(num){

	var r = Math.floor(num / 5);
	var c = num % 5;

	return board[r][c];
}

//Returns a random integer in the range [min,max]
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

 //Creates a Hint object
function Hint(ptotal,ztotal){
	this.ptotal = ptotal; //Total points per row/column
	this.ztotal = ztotal; //Total number of zeros per row/column

	this.getHint = function() { 
		return this.ptotal+"/z"+this.ztotal;
	}
}