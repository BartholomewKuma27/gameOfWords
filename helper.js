function generateNumbers(quantity){
	var arr = [];
	while(arr.length < quantity){
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
};


function shuffle(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}

function valueFromWord(word){
	var value = 0;
	for(var i = 0; i < word.length; i++){
		var curChar = word[i];
		value += points[curChar];
	}
	return value;
}