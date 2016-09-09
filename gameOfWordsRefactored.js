var playerNum = 2;
var usedLetterIndexes = [];
var curIndex = 0;
var prevWord = [];
var wasOkClicked = false;
var maxRounds = 4;

var Brain = function (){
	
}

Brain.prototype = {
	genereatePlayerScores : function(){
		var playerScores = [];
		for (var i = 0; i < playerNum; i++){
			playerScores.push(0);
		}
		return playerScores;
	},
	generateBoardAndPlayerCards : function(){
		var totalSize = 7 + playerNum*2;
		var randomNumArr = generateNumbers(totalSize);
		var boardAndPlayerCards = [];
		for(var i = 0; i < totalSize; i++){
			var curRandomNum = randomNumArr[i];
			var curLetter = letters[curRandomNum];
			boardAndPlayerCards.push(curLetter);
		}
		return boardAndPlayerCards;
	}
}

var DaVinci = function(){
	
}

DaVinci.prototype = {
	drawState : function(playerScores, boardAndPlayerCards,roundNumber){
		this.drawCards(boardAndPlayerCards);
		this.drawScores(playerScores);
		this.drawRoundNumber(roundNumber);
	},
	
	drawCards: function(cards){
		this.fillCards(document.getElementById("board"), cards, 0, 6);
		for (var i = 0 ; i < playerNum; i++){
			var curPlayerId = "player" + (i + 1);
			this.fillCards(document.getElementById(curPlayerId), cards, 7+(i*2), 8+(i*2));
		}
	},
	
	fillCards: function(table, cards, arrStartIndex, arrEndIndex){
		var upRow = table.rows[0];
		var downRow = table.rows[1];
		var cellIndex = 0;
		while(arrStartIndex <= arrEndIndex){
			var currentLetter = cards[arrStartIndex];
			var currentValue = points[currentLetter];
			var upcell = upRow.cells[cellIndex];
			upcell.innerHTML = currentLetter;
			var downCell = downRow.cells[cellIndex];
			downCell.innerHTML = currentValue;
			arrStartIndex++;
			cellIndex++;
		}
	},
	drawScores: function(scores){
		for (var i = 1; i <= playerNum; i++){
			var playerScoreId = "player" + i +"Score";
			document.getElementById(playerScoreId).innerHTML = scores[i-1];
		}
	},
	drawRoundNumber: function(roundNumber){
		document.getElementById("round").innerHTML = roundNumber;
	},
	
	clear: function(){
		usedLetterIndexes = [];
		curIndex = 0;
		prevWord [0] = "";
		
		var myWordTable = document.getElementById("player1Cards");
		var firstRow = myWordTable.rows[0];
		for (var i = 0; i < 9; i++){
			firstRow.cells[i].innerHTML = "";
		}
		for (var i = 1; i <= playerNum; i++){
			var playerScoreId = "player" + i +"Word";
			document.getElementById(playerScoreId).innerHTML = "";
		}
	},
	
	zeroCurrentScore: function(){
		for (var i = 1; i <= playerNum; i++){
			var playerScoreId = "player" + i +"CurrentScore";
			document.getElementById(playerScoreId).innerHTML = 0;
		}
	},
	
	hidePlayerEverything : function(playerId){
		document.getElementById("player" + playerId).style.display = "none";
		document.getElementById("player" + playerId + "Cont").style.display = "none";
	}
}

var SessionVault = function(){
	
}

SessionVault.prototype = {
	saveState : function(playerScores, boardAndPlayerCards, roundNumber){
		var scores = "";
		for (var i = 0; i < playerScores.length; i++){
			scores += playerScores[i]+ " ";
		}
		scores = scores.substring(0, scores.length - 1);
		
		var cards = "";
		for (var i = 0; i < boardAndPlayerCards.length; i++){
			cards += boardAndPlayerCards[i]+ " ";
		}
		cards = cards.substring(0, cards.length - 1);
		
		sessionStorage.setItem("status", "inGame");
		sessionStorage.setItem("scores", scores);
		sessionStorage.setItem("cards", cards);
		sessionStorage.setItem("round", roundNumber);
	},
	
	getScoresFromState: function(){
		var scores = sessionStorage.getItem("scores").split(" ");
		return scores;
	},
	
	getCardsFromState: function(){
		var cards = sessionStorage.getItem("cards").split(" ");
		return cards;
	},
	
	getRoundNumberFromState: function(){
		var roundNumber = sessionStorage.getItem("round");
		return roundNumber;
	}
	
}

var Player = function(){
	
}

Player.prototype = {
	updateScore: function(playerNum, scoreToAdd){
		var playersId = "player" + playerNum + "Score";
		var playerScore = document.getElementById(playersId);
		var score = playerScore.innerHTML;
		playerScore.innerHTML = parseInt(score) + parseInt(scoreToAdd);
	},
	updateCurrentScore: function(playerNum, scoreToAdd){
		var playersId = "player" + playerNum + "CurrentScore";
		var playerCurrentScore = document.getElementById(playersId);
		var currentScore = playerCurrentScore.innerHTML;
		playerCurrentScore.innerHTML = parseInt(currentScore) + parseInt(scoreToAdd);
	},
	updateWord: function(playerNum, newWord){
		var playersId = "player" + playerNum + "Word";
		var playerWord = document.getElementById(playersId);
		var currentWord = playerWord.innerHTML;
		playerWord.innerHTML = currentWord + newWord;
	}
}

var Listener = function (){
	
}

Listener.prototype = {
	startListening: function(){
		this.cardClickListening();
		this.okClick();
		this.clearClick();
		this.nextClick();
		this.offlineClick();
	},
	
	cardClickListening: function(){
		var tmp = [];
		var tableDatas = document.querySelectorAll(".cards");
		for (var i = 0; i < tableDatas.length; i++){
			var curTableData = tableDatas[i];
			curTableData.onclick = function(e){
				if (wasOkClicked == true){
					return;
				}
				var curElem = e.target;
				var curElemClass = curElem.className.split(" ")[0];
				var letterIndex = curElemClass[curElemClass.length - 1];
				if (usedLetterIndexes.indexOf(letterIndex) != -1){
					return;
				}
				usedLetterIndexes += letterIndex;
				var letterAndValue = document.getElementsByClassName(curElemClass);
				var curLetter = letterAndValue[0].innerHTML;
				var curValue = letterAndValue[1].innerHTML;
				var p = new Player();
				p.updateCurrentScore(1, curValue);
				prevWord[0] += curLetter;
				//sheidzleba sheicvalos
				letterAndValue[0].innerHTML = "";
				letterAndValue[1].innerHTML = "";
				var player1Table = document.getElementById("player1Cards");
				player1Table.rows[0].cells[curIndex++].innerHTML = curLetter;
			}
		}
	},
	
	okClick : function(){
		document.getElementById("okButton").onclick = function(){
			if(wasOkClicked == true){
				return;
			}
			wasOkClicked = true;
			var p = new Player();
			var e = new Era();
			for( var i = 1; i < playerNum; i++){
				var curWord = prevWord[i];
				if(words.indexOf(curWord) == -1){
					prevWord[i] = "";
				}
				p.updateWord(i+1, prevWord[i]);
				p.updateScore(i+1, valueFromWord(prevWord[i]));
				p.updateCurrentScore(i+1, valueFromWord(prevWord[i]));
			}
			
			var myScoreId = "player1CurrentScore";
			var myCurrentScore = document.getElementById(myScoreId);
			if(words.indexOf(prevWord[0]) == -1){
				p.updateScore(1, 0);
				p.updateWord(1, "");
			}
			else{
				p.updateScore(1, myCurrentScore.innerHTML);
				p.updateWord(1, prevWord[0]);
			}
			document.getElementById("clearButton").style.display = "none";
			document.getElementById("nextButton").style.display = "inline-block";
		}
	},
	
	clearClick: function(){
		document.getElementById("clearButton").onclick = function(){
			var artist =  new DaVinci();
			artist.clear();
			var e = new Era();
			
			e.oldEra();
			prevWord[0] = "";
		}
	},
	
	nextClick: function(){
		document.getElementById("nextButton").onclick = function(){
			
			wasOkClicked = false;
			var artist =  new DaVinci();
			artist.clear();
			var e = new Era();
			e.nextEra();
			document.getElementById("nextButton").style.display = "none";
			document.getElementById("clearButton").style.display = "inline-block";
			
			//
			var sesVault = new SessionVault();
			var roundNumber = sesVault.getRoundNumberFromState();
			if (roundNumber == maxRounds){
				var scores = sesVault.getScoresFromState();
				var winnerInd = 0;
				console.log(scores);
				for (var i = 1; i < scores.length; i++){
					if (parseInt(scores[i]) > parseInt(scores[winnerInd])){
						winnerInd = i;
					}
				}
				alert("The Winner Is Player " + (winnerInd+1)+ " With Score: " + scores[winnerInd]);
				sessionStorage.clear();
				window.location = window.location.href.split('#')[0];
				return;
			}
			//
		}
	},
	
	offlineClick: function(){
		document.getElementById("mainPageDiv").onclick = function(){
			var artist = new DaVinci();
			document.getElementById("mainPageDiv").style.display = "none";
			sessionStorage.setItem("mainPageDisplay", "none");
			for (var i = playerNum + 1; i <= 4; i++){
				artist.hidePlayerEverything(i);
			}
		}
	}
}
var Era = function(){
	
}

Era.prototype = {
	newEra: function(){
		var brain = new Brain();
		var playerScores = brain.genereatePlayerScores();
		var boardAndPlayerCards = brain.generateBoardAndPlayerCards();
		//
		var genius = new AI();
		genius.generateWordsAndSave(boardAndPlayerCards);
		//
		var roundNumber = 1;
		var artist = new DaVinci();
		artist.drawState(playerScores, boardAndPlayerCards, roundNumber);
		var sesVault = new SessionVault();
		sesVault.saveState(playerScores, boardAndPlayerCards, roundNumber);
		artist.zeroCurrentScore();
	},
	
	oldEra: function(){
		var sesVault = new SessionVault();
		var savedScores = sesVault.getScoresFromState();
		var savedCards = sesVault.getCardsFromState();
		//
		var genius = new AI();
		genius.generateWordsAndSave(savedCards);
		//
		var savedRoundNumber = sesVault.getRoundNumberFromState();
		var artist = new DaVinci();
		artist.drawState(savedScores, savedCards, savedRoundNumber);
		artist.zeroCurrentScore();
	},
	
	nextEra: function(){
		var brain = new Brain();
		var sesVault = new SessionVault();
		var artist = new DaVinci();
		var nextScores = [];
		for (var i = 1; i <= playerNum; i++){
			var playerId = "player" + i + "Score";
			var curPlayerScore = document.getElementById(playerId).innerHTML;
			nextScores.push(curPlayerScore);
		}
		var nextCards = brain.generateBoardAndPlayerCards();
		var nextRoundNumber = parseInt(sesVault.getRoundNumberFromState()) + 1;
		sesVault.saveState(nextScores, nextCards, nextRoundNumber);
		this.oldEra();
		artist.clear();
	}
}


var AI = function(){
	
}

AI.prototype = {
	generateWordsAndSave : function(lettersArr){
		var concatedLetters = "";
		for(var i =0; i < 7; i++){
			concatedLetters += lettersArr[i];
		}
		for (var i = 1; i < playerNum; i++){
			var curConcatedLetters = concatedLetters + lettersArr[7+(i*2)] + lettersArr[8+(i*2)];
			var curDifficulty = document.getElementById("dif").value;
			var curWord =  this.generateWord(curConcatedLetters, curDifficulty);
			prevWord [i] = curWord;
		}
	},
	
	generateWord: function(concatedLetters, curDifficulty){
		var myWords = words;
		shuffle(myWords);
		var myLength = Math.floor(myWords.length * curDifficulty / 100);
		var maxValue = 0;
		var maxWord = "";
		for (var i = 0; i < myLength; i++){
			var curWord = myWords[i];
			var curValue = this.getWordValue(curWord, concatedLetters);
			if (curValue > maxValue){
				maxValue = curValue;
				maxWord = curWord;
			}
		}
		return maxWord;
	},
	
	getWordValue : function(myWord, concatedLetters){
		var value = 0;
		for (var i = 0; i < myWord.length; i++){
			var curChar = myWord[i];
			var ind = concatedLetters.indexOf(curChar);
			if(ind == -1){
				var snowFlakeInd = concatedLetters.indexOf("*");
				if (snowFlakeInd != -1){
					concatedLetters = concatedLetters.substring(0, snowFlakeInd) + concatedLetters.substring(snowFlakeInd + 1, myWord.length);
				}
				else{
					return 0;
				}
			}
			value += points[curChar];
			concatedLetters = concatedLetters.substring(0, ind) + concatedLetters.substring(ind + 1, myWord.length);
		}
		return value;
	}
}


window.onload = function(){
	var mainPageDisplay = sessionStorage.getItem("mainPageDisplay");
	document.getElementById("mainPageDiv").style.display = mainPageDisplay;
	
	for (var ind = 0; ind < playerNum; ind++){
		prevWord.push("");
	}
	
	var e = new Era();
	var status = sessionStorage.getItem("status");
	if (status == null){
		e.newEra();
	}
	else{
		e.oldEra();
	}
	//
	var l = new Listener();
	l.startListening();
}