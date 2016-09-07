document.getElementById("offlineLink").onclick = function (){
	document.getElementById("mainPageDiv").style.display = "none";
	sessionStorage.setItem("mainPageDisplay", "none");
	//
	sessionStorage.setItem("player3Display", "none");
	sessionStorage.setItem("player4Display", "none");
	document.getElementById("player3").style.display = "none";
	document.getElementById("player4").style.display = "none";
	//
}

window.onload = function(){
	var mainPageDisplay = sessionStorage.getItem('mainPageDisplay');
	document.getElementById("mainPageDiv").style.display = mainPageDisplay;
	//
	var player3Display = sessionStorage.getItem('player3Display');
	document.getElementById("player3").style.display = player3Display;
	var player4Display = sessionStorage.getItem('player4Display');
	document.getElementById("player4").style.display = player4Display;
}

//mtavaria ar damaviwydes tamashis boloshi kvelafris gamochena

var Board = function() {
	
}


Board.prototype = {
	dealCards : function (){
		var numbers = this.generateNumbers();
		this.giveCards(numbers);
	},
	generateNumbers: function(){
		var arr = [];
		while(arr.length < 11){
			var randomNum = Math.ceil(Math.random()*77);
			var contains = false;
			for (var i=0; i<arr.length; i++){
				if(arr[i] == randomNum){
					contains = true;
					break;
				}
			}
			arr[arr.length] = randomNum;
		}
		return arr;
	},
	
	giveCards: function(numbers){
		this.fillTable(document.getElementById("board"), numbers, 0, 6);
		this.fillTable(document.getElementById("player1"), numbers, 7, 8);
		this.fillTable(document.getElementById("player2"), numbers, 9, 10);
	},
	
	fillTable: function(curTable, numbers, arrStartIndex, arrEndIndex){
		var upRow = curTable.rows[0];
		var downRow = curTable.rows[1];
		var cellIndex = 0;
		while(arrStartIndex <= arrEndIndex){
			var indexInLetters = numbers[arrStartIndex];
			var currentLetter = letters[indexInLetters];
			var currentValue = points[currentLetter];
			var upcell = upRow.cells[cellIndex];
			upcell.innerHTML = currentLetter;
			var downCell = downRow.cells[cellIndex];
			downCell.innerHTML = currentValue;
			arrStartIndex++;
			cellIndex++;
		}
	}
	
}

var b = new Board();
b.dealCards();