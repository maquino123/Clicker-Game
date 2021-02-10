var game = {
	mangoes: 0,
	totalMangoes: 0,
	gold: 0,
	goldCost: 50,
	totalGold: 0,
	totalClicks: 0,
	clickValue: 1,
	version: 0.000,

	gatherMangoes: function(amount) {
			this.mangoes += amount; //this = whatever variable in var game
			this.totalMangoes += amount;
			display.updateScore();
			if (game.mangoes >= 50){ //Display trade button once user reaches a certain amount of mangoes. 50 for testing purposes
				document.getElementById("tradeButton").style.display = 'inline-block';
		 }
	},

	getScorePerSecond: function() {
		var scorePerSecond = 0;
		for (i = 0; i < items.name.length; i++) { //Go through every index in items.name
				scorePerSecond += items.income[i] * items.count[i];
		}
		return scorePerSecond;
	},

	tradeForGold: function(){
		//First check if you have enough mangoes to trade for Gold
		if (game.mangoes >= game.goldCost){
			game.mangoes -= game.goldCost;
			game.gold += 1;
			game.goldCost = Math.round(game.goldCost * 1.15);
			document.getElementById("gold").style.display = 'inline-block';
			document.getElementById("gold").innerHTML = "Gold: " + game.gold;
			document.getElementById("goldCost").innerHTML = game.goldCost;
		}
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
		],

	image: [
			"equipment.png",
			"farmer.png",
			"sprinkler.png"
		],

	count: [
			0,
			0,
			0
		],

	income: [
			1,
			5,
		 10
		],

	cost: [
			15,
			50,
			100
		],

		purchase: function(index) {
			if (game.mangoes >= this.cost[index]) { //Check if wh
				game.mangoes -= this.cost[index];
				this.count[index] += 1;
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
		"Government",
		"Country"
	],

	image: [

	],

	count: [
		0,
		0,
		0,
		0
	],

	income: [
		2,
		5,
		15,
		50
	],

	cost:[
		5,
		5,
		5,
		50
	],

	purchaseStand: function(){
		if (game.gold >= this.cost[0]){
			game.gold -= this.cost[0];
			this.count[0] += 1;
			this.cost[0] = Math.round(this.cost[0] * 1.15);
			document.getElementById("gold").innerHTML = "Gold:" + game.gold;
			document.getElementById("standCost").innerHTML = this.cost[0];
			document.getElementById("mangoStandCount").style.display = 'inline-block';
			document.getElementById("mangoStandCount").innerHTML = "Mango Stands: " + items2.count[0];
		}
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
			document.getElementById("storeContainer").innerHTML += '<table class="store" onClick="items.purchase('+i+')"><tr><td id="image"><img src='+items.image[i]+'></td> <td id="nameandcost"><p>'+items.name[i]+'</p><p><span>'+items.cost[i]+'</span> Mangoes</p></td><td id="amount"><span>'+items.count[i]+'</span></td></tr></table>';
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
