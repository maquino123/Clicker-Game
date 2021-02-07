var mangoes = 0; //Keep track of mangoes
var clickingPower = 1;

var equipCost = 15; //Cost of farming equipment
var equipment = 0; //Number of farming equipment

var farmerCost = 50; //Cost of hiring farmers
var farmers = 0; //Number of farmers

var sprinklerCost = 100;
var sprinklers = 0;

function buyEquipment() {
  if (mangoes >= equipCost) { //If the number of mangoes is greater than the cost of the equipment
    mangoes = mangoes - equipCost; //Subtract from the mangoes cause you bought equipment
    equipment = equipment + 1; //Add to the equipment the player has
    equipCost = Math.round(equipCost * 1.15) //Increase the cost of equipment each time you buy it
    document.getElementById("equipcost").innerHTML = equipCost; //Get the mangoes element id and update so it shows
    document.getElementById("equipment").innerHTML = equipment; //Get the mangoes element id and update so it shows
    document.getElementById("mangoes").innerHTML = mangoes; //Get the mangoes element id and update so it shows
    updateScorePerSecond();
  }
}

function buyFarmers() {
  if (mangoes >= farmerCost) { //If the number of mangoes is greater than the cost of the equipment
    mangoes = mangoes - farmerCost; //Subtract from the mangoes cause you bought equipment
    farmers = farmers + 1; //Add to the equipment the player has
    farmerCost = Math.round(farmerCost * 1.15) //Increase the cost of equipment each time you buy it
    document.getElementById("farmercost").innerHTML = farmerCost; //Get the mangoes element id and update so it shows
    document.getElementById("farmers").innerHTML = farmers; //Get the mangoes element id and update so it shows
    document.getElementById("mangoes").innerHTML = mangoes; //Get the mangoes element id and update so it shows
    updateScorePerSecond();
  }
}

function buySprinkler() {
  if (mangoes >= sprinklerCost) { //If the number of mangoes is greater than the cost of the equipment
    mangoes = mangoes - sprinklerCost; //Subtract from the mangoes cause you bought equipment
    sprinklers = sprinklers + 1; //Add to the equipment the player has
    sprinklerCost = Math.round(sprinklerCost * 1.15) //Increase the cost of equipment each time you buy it
    document.getElementById("sprinklercost").innerHTML = sprinklerCost; //Get the mangoes element id and update so it shows
    document.getElementById("sprinklers").innerHTML = sprinklers; //Get the mangoes element id and update so it shows
    document.getElementById("mangoes").innerHTML = mangoes; //Get the mangoes element id and update so it shows
    updateScorePerSecond();
  }
}

//Gather Mangoes when you click on the mango image
function gatherMangoes(num) {
  mangoes = mangoes + num; //Add to score
  document.getElementById("mangoes").innerHTML = mangoes; //Get the mangoes element id and update so it shows
}

//Take scores and update scorepersecond id
function updateScorePerSecond() {
  scorepersecond = equipment + farmers * 5 + sprinklers * 10;
  document.getElementById("scorepersecond").innerHTML = scorepersecond; //Get the mangoes element id and update so it shows
}

//Do something every second
setInterval(function() {
  mangoes = mangoes + equipment //Idle element: Get mangoes based on how much equipment you have. Ex. 2 equipment = 2 mangoes per second
  mangoes = mangoes + farmers * 5 //Farmers get 5 mangoes per second
  mangoes = mangoes + sprinklers * 10 //Sprinklers get 10 mangoes per second
  document.getElementById("mangoes").innerHTML = mangoes; //Get the mangoes element id and update so it shows
}, 1000) //1000ms = 1 second
