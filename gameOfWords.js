document.getElementById("offlineLink").onclick = function (){
	document.getElementById("mainPageDiv").style.display = "none";
	sessionStorage.setItem("mainPageDisplay", "none");
}

window.onload = function(){
	var mainPageDisplay = sessionStorage.getItem('mainPageDisplay');
	document.getElementById("mainPageDiv").style.display = mainPageDisplay;
}

//mtavaria ar damaviwydes tamashis bolos shemdegi kodi: sessionStorage.setItem("mainPageDisplay", "flex");