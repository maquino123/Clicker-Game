var game = {
	mangoes: 0,
	totalMangoes: 0,
	gold: 0,
	goldCost: 1,
	totalGold: 0,
	totalClicks: 0,
	clickValue: 1,
	version: 0.000,

	gatherMangoes: function(amount) {
			this.mangoes += amount; //this = whatever variable in var game
			this.totalMangoes += amount;
			display.updateScore();
			// if (game.mangoes >= 100){ //Display trade button once user reaches a certain amount of mangoes. 50 for testing purposes
			if (game.totalMangoes >= 7000){ //Display trade button once user reaches a certain amount of mangoes. 50 for testing purposes
				document.getElementById("tradeButton").style.display = 'inline-block';
				document.getElementById("trademsg").style.display = 'inline-block';
		 }
		 display.updateScore();
},

	getScorePerSecond: function() {
		var scorePerSecond = 0;
		for (i = 0; i < items.name.length; i++) { //Go through every index in items.name
				scorePerSecond += items.income[i] * items.count[i];
		}
		return scorePerSecond;
	},

	tradeForGold: function(){
		// trade all mangoes for gold
			game.gold += game.mangoes;
			game.mangoes = 0;
			document.getElementById("gold").style.display = 'inline-block';
			document.getElementById("gold").innerHTML = "Now you have " + game.gold + " gold!";
		if (game.gold >= items2.cost[0]){ //Have mango stand button pop up when the user reaches 5 gold
			document.getElementById("mangoStand").style.display = 'inline-block';
		}
	},
};

//Literally just have to add to this list to add more resources
var items = {
	name: [
			"Equipment",
			"Farmer",
			"Sprinkler",
			"Work Animals"
		],

	image: [
			"equipment.png",
			"farmer.png",
			"sprinkler.png",
			"farmanimals.png"
		],

	count: [
			0,
			0,
			0,
			0
		],

	income: [
			1,
			3,
		 8,
		 20
		],

	cost: [
			20,
			50,
			100,
			200
		],

		purchase: function(index) {
			if (game.mangoes >= this.cost[index]) { //Check if wh
				game.mangoes -= this.cost[index];
				this.count[index] += 1
				this.cost[index] = Math.round(this.cost[index] * 1.15);
				display.updateScore();
				display.updateStore();
			}
		}
};

var items2 = {
	name:[
		"Stand",
		"Factory",
		"Corporation",
		"City",
		"Country"
	],

	image: [

	],

	count: [
		0,
		0,
		0,
		0,
		0
	],

	cost:[
		1,
		2,
		3,
		4,
		5 //one country = 5 cities, one city = 4 corporations, one corporation = 3 factories, one factory = 2 stands, one stand = 1 gold
	]
}


var display = {
	updateScore: function() {
		document.getElementById("mangoes").innerHTML = game.mangoes;
		document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
	},

	updateStore: function() {
		document.getElementById("storeContainer").innerHTML = "";
		for (i = 0; i < items.name.length; i++){
			document.getElementById("storeContainer").innerHTML += '<table class="store" onClick="items.purchase('+i+')"><tr>						<td id="image"><img src='+items.image[i]+'></td> 			<td id="nameandcost"><p>'+items.name[i]+'</p><p> Cost: <span>'+items.cost[i]+'</span> Mangoes</p></td>	<td id="prodimprovement"><span>'+items.income[i]+'</span>/sec</td>		<td id="amount"><span>'+items.count[i]+'</span></td>					</tr></table>';
		}
	},
}

window.onload = function() {
	display.updateScore();
	display.updateStore();
};

var items2 = {
	name:[
		"Stand",
		"Factory",
		"Corporation",
		"City",
		"Country"
	],

	count: [
		0,
		0,
		0,
		0,
		0
	],

	cost:[
		1,
		2,
		3,
		4,
		5 //one country = 5 cities, one city = 4 corporations, one corporation = 3 factories, one factory = 2 stands, one stand = 1 gold
	],

	purchaseStand: function(){
		if (game.gold >= this.cost[0]){
			game.gold -= this.cost[0];
			this.count[0] += 1;
			this.cost[0] = Math.round(this.cost[0] * 1.5);
			document.getElementById("gold").innerHTML = "Now you have " + game.gold + " gold!";
			document.getElementById("standCost").innerHTML = this.cost[0];
			document.getElementById("mangoStandCount").style.display = 'inline-block';
			document.getElementById("mangoStandCount").innerHTML = "Now you have " + this.count[0] + " mango stands! Why not build a factory?";
		}
		if (this.count[0] >= this.cost[1]){
			document.getElementById("mangoFactory").style.display = 'inline-block';
		}
	},

	purchaseFactory: function(){
		if (this.count[0] >= this.cost[1]){ //If the user has enough mango stands to purchase a factory (2 mango stands for 1 factory)
			this.count[0] -= this.cost[1];
			this.count[1] += 1;
			this.cost[1] = Math.round(this.cost[1] * 1.01);
			document.getElementById("mangoStandCount").innerHTML = "Now you have " + this.count[0] + " mango stands! Why not build a factory?";
			document.getElementById("factoryCost").innerHTML = this.cost[1];
			document.getElementById("factoryCount").style.display = 'inline-block';
			document.getElementById("factoryCount").innerHTML = "Now you have " + this.count[1] + " factories! A lot of people are moving in to work in the factories! You've got a lot of money and power. Wanna turn your business into a corporation?";
		}
		if (this.count[1] >= this.cost[2]){
			document.getElementById("mangoCorporation").style.display = 'inline-block';
		}
	},

	purchaseCorporation: function(){
		if (this.count[1] >= this.cost[2]){ //If the user has enough factories: can buy corp (needs 3 factories to buy 1 corp, at the start)
			this.count[1] -= this.cost[2];
			this.count[2] += 1;
			this.cost[2] = Math.round(this.cost[2] * 1.02);
			document.getElementById("factoryCount").innerHTML = "Now you have " + this.count[1] + " factories! A lot of people are moving in to work in the factories! You've got a lot of money and power. Wanna turn your business into a corporation?";
			document.getElementById("corpCostyCost").innerHTML = this.cost[2];
			document.getElementById("corpCount").style.display = 'inline-block';
			document.getElementById("corpCount").innerHTML = "Now you have " + this.count[2] +" mango corporations! Pay off some governments like a proper corporation and buy a city!";
		}
		if (this.count[2] >= this.cost[3]){
			document.getElementById("mangoCity").style.display = 'inline-block';
		}
	},

	purchaseCity: function(){
		if (this.count[2] >= this.cost[3]){ //If the user has enough corporations:
			this.count[2] -= this.cost[3];
			this.count[3] += 1;
			this.cost[3] = Math.round(this.cost[3] * 1.01);
			document.getElementById("corpCount").innerHTML = "Now you have " + this.count[2] +" mango corporations! Pay off some governments like a proper corporation and buy a city!";
			document.getElementById("cityCostyCost").innerHTML = this.cost[3];
			document.getElementById("citiesCount").style.display = 'inline-block';
			document.getElementById("citiesCount").innerHTML = "Now you have " + this.count[3] + " mango cities! You can open your own mango country :D";
		}
		if (this.count[3] >= this.cost[4]){
			document.getElementById("mangoCountry").style.display = 'inline-block';
		}
	},

	purchaseCountry: function(){
		if (this.count[3] >= this.cost[4]){ //If the user has enough Cities: country
			this.count[3] -= this.cost[4];
			this.count[4] += 1;
			this.cost[4] = Math.round(this.cost[4] * 1.01);
			document.getElementById("citiesCount").innerHTML = "Now you have " + this.count[3] + " mango cities! You can open your own mango country :D";
			document.getElementById("countryCostyCost").innerHTML = this.cost[4];
			document.getElementById("countryCount").style.display = 'inline-block';
			document.getElementById("countryCount").innerHTML = "Now you have " + this.count[4] + " countries!";
			if(this.count[4] >= 3){ //Display win message if number of countries you purchase is >= 3
				document.getElementById("winmsg").style.display = 'inline-block';
			}
		}
	},

	winGame: function(){
				location.href='endscreen.html';
			}
};




var display = {
	updateScore: function() {
		document.getElementById("mangoes").innerHTML = game.mangoes;
		document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
	},

	updateStore: function() {
		document.getElementById("storeContainer").innerHTML = "";
		for (i = 0; i < items.name.length; i++){
			document.getElementById("storeContainer").innerHTML += '<table class="store" onClick="items.purchase('+i+')"><tr>						<td id="image"><img src='+items.image[i]+'></td> 			<td id="nameandcost"><p>'+items.name[i]+'</p><p> Cost: <span>'+items.cost[i]+'</span> Mangoes</p></td>	<td id="prodimprovement"><span>'+items.income[i]+'</span>/sec</td>		<td id="amount"><span>'+items.count[i]+'</span></td>					</tr></table>';
		}
	},
}

window.onload = function() {
	display.updateScore();
	display.updateStore();
};

setInterval(function() {
	game.mangoes += game.getScorePerSecond();
	game.totalMangoes += game.getScorePerSecond();
	display.updateScore();
}, 1000);
