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

//
var Listener = function (){
	
}

Listener.prototype = {
	startListening: function(){
		this.cardClickListening();
	},
	
	cardClickListening: function(){
		var tmp = [];
		var tableDatas = document.querySelectorAll(".cards");
		for (var i = 0; i < tableDatas.length; i++){
			var curTableData = tableDatas[i];
			curTableData.onclick = function(e){
				var curElem = e.target;
				var curElemClass = curElem.className.split(" ")[0];
				var letterIndex = curElemClass[curElemClass.length - 1];
				var curLetterIndexes = sessionStorage.getItem("usedLetterIndexes");
				if (curLetterIndexes != null && curLetterIndexes.indexOf(letterIndex) != -1){
					return;
				}
				if (curLetterIndexes == null){
					sessionStorage.setItem("usedLetterIndexes", letterIndex);
				}
				else{
					curLetterIndexes = sessionStorage.getItem("usedLetterIndexes");
					sessionStorage.setItem("usedLetterIndexes", curLetterIndexes + letterIndex);
				}
				var letterAndValue = document.getElementsByClassName(curElemClass);
				var curLetter = letterAndValue[0].innerHTML;
				var curValue = letterAndValue[1].innerHTML;
				letterAndValue[0].style.display = "none";
				letterAndValue[1].style.display = "none";
				var letterIndex = sessionStorage.getItem("letterIndex");
				if (letterIndex == null){
					letterIndex = "0";
					sessionStorage.setItem("letterIndex", "1");
				}
				else{
					letterIndex = sessionStorage.getItem("letterIndex");
					sessionStorage.setItem("letterIndex", parseInt(letterIndex) + 1);
				}
				var player1Table = document.getElementById("player1Score");
				player1Table.rows[0].cells[letterIndex].innerHTML = curLetter;
			}
		}
	}
}

var l = new Listener();
l.startListening();