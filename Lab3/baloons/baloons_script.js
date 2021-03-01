var gameArea = document.getElementById("gameArea");
var playAgainBtn = document.getElementById("playAgainBtn");
var shootsFiredBox = document.getElementById("shootsFiredBox");
var accuracyBox = document.getElementById("accuracyBox");
var hitBox = document.getElementById("hitBox");
var roundBox = document.getElementById("roundBox");
var nickBox = document.getElementById("nickBox");
var Nick = "";
var audioMiss = new Audio("sounds/shoot-bow.mp3");
var audioHit = new Audio("sounds/balloon-pop.mp3");
var pointBox = document.getElementById("pointsBox");
var shots;
var HitsCounter;
var accuracy;
var result;
var balloonsCounter;
var startTimer;



start();


function start(){
    shots = 0;
    HitsCounter = 0;
    accuracy = 0;
    result = 0;
    balloonsCounter = 1;
    playAgainBtn.style.visibility = "hidden";
    addNick();
    gameArea.setAttribute("onclick", "miss()");
    playAgainBtn.setAttribute("onclick", "playAgain()");
    generateBalloons();
}

function generateBalloons(){
    var colorArray = ["black", "blue", "green", "orange", "purple"];
    var color = colorArray[Math.floor(Math.random()*5)];
    var min = 50;
    var max = 180;
    var balloon = document.createElement("div");
    var ballonSize = Math.floor((Math.random() * (max-min) + min));
    var balloonTop = Math.floor(Math.random() * (340 - ballonSize)) + "px";
    var balloonLeft = Math.floor(Math.random() * (840- ballonSize)) + "px";
    ballonSize = ballonSize + "px";
    var id = balloonsCounter;

    balloon.setAttribute("class", "balloon");
    balloon.setAttribute("id", id);
    balloon.setAttribute("onclick", "main(this.id, true, event)");
    balloon.style.background = color;
    balloon.style.left = balloonLeft;
    balloon.style.top = balloonTop;
    balloon.style.height = ballonSize;
    balloon.style.width = ballonSize;
    gameArea.appendChild(balloon);

    
    (async () => {
        setTimeout("main(\"" + id +"\", false, null)", 2000/Math.ceil(balloonsCounter/7));
    })()
    startTimer = performance.now();
}

async function main(id, clicked, event){
    if (event != null) event.stopPropagation();
    if(clicked){
        countHits();
        countShootsFired();
        changeBackground("red", 0);
        audioHit.play();
        countScoreBoard(calculatePoints());
    } 
    deleteBalloon(id);
    if(balloonsCounter < 30){
        changeBackground("white", 150);
        roundBox.innerHTML = balloonsCounter;
        generateBalloons();
    }
    else{
        changeBackground("white", 100);
        alert("Twoj wyniki to: " + result);
        gameArea.style.cursor = "default";
        gameArea.removeAttribute("onclick");
        playAgainBtn.style.visibility = "visible";
        return;
    }
    balloonsCounter++;
}


function addNick(){
    while(Nick == ""){
        Nick = prompt("Write your Nick: ");
    }
    nickBox.innerHTML = Nick;
}

function miss(){
    countScoreBoard(-2);
    countShootsFired();
    audioMiss.play();
}

function countScoreBoard(points){
    result += points;
    pointBox.innerHTML = result;
}

function countShootsFired(){
    shots++;
    shootsFiredBox.innerHTML = shots;
    updateAccuracy();
}

function updateAccuracy(){
    if(shots != 0){
        accuracy = ((HitsCounter/shots)*100).toFixed(2);
    }
    accuracyBox.innerHTML = accuracy;
}

function countHits(){
    HitsCounter++;
    hitBox.innerHTML = HitsCounter;
}

function calculatePoints(){
    var difference = performance.now() - startTimer;
    return Math.floor(4000/difference);
}

function changeBackground(color, delay){
    (async () => {
        setTimeout(() => {gameArea.style.background = color}, delay);
    })();
}

function deleteBalloon(id){
    var balloon = document.getElementById(id);
    balloon.parentNode.removeChild(balloon);
}

function playAgain(){
    window.event.stopPropagation()
    start();
}