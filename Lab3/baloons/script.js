var gameArea = document.getElementById('gameArea');
var highScoresHeader = document.getElementById("highscoresHeader");
var highScores = document.getElementById("highscores");
var playAgainBtn = document.getElementById("playAgainBtn");
var balloonsCounter = 1;
var successfulHitCounter = 0;
var resultPoints = 0;
var startTimer;
var misses = 0;
var userId;
var audioPop = new Audio("sounds/balloon-pop.mp3");
var audioMiss = new Audio("sounds/shoot-bow.mp3");
var playerName = "";
var accuracy;
var highScoreData;


init();
function init(){
    updateNickBox();
    gameArea.style.cursor = "crosshair";
    playAgainBtn.setAttribute("onclick", "restart()");
    document.getElementById("gameArea").setAttribute("onclick", "missed()");
    generateBalloon();
    updateBalloonCounter();
    balloonsCounter++;
}

async function eventMain(id, clicked, event){
    // when 2 seconds passes without player pressing the balloon
    if (document.getElementById(id) == null) return;
    if (event != null) event.stopPropagation();
    if(clicked){
        updateHitBox();
        updateShootsFiredBox();
        changeAreaBackground("red", 0);
        audioPop.play();
        updateScoreBoardLocal(calculatePoints(id));
    } 
    deleteBalloon(id);
    if(balloonsCounter < 11){
        changeAreaBackground("white", 100);
        updateBalloonCounter();
        generateBalloon();
    }
    // Ending else
    else{
        changeAreaBackground("white", 100);
        alert("Twoj wyniki to: " + resultPoints);
        gameArea.style.cursor = "default";
        gameArea.removeAttribute("onclick");
        highScoresHeader.style.visibility = "visible";
        playAgainBtn.style.visibility = "visible";
        await highScoreLogic();
        return;
    }
    balloonsCounter++;
}


function generateBalloon(){
    const colorArray = ["red", "yellow", "green", "blue", "orange", "black"];
    const color = colorArray[Math.floor(Math.random()*6)];
    const min = 50, max = 200;
    const balloon = document.createElement("div");
    var balloonWidth = Math.floor((Math.random() * (max-min) + min));
    const balloonTop = String(Math.floor(Math.random() * (400 - balloonWidth))) + "px";
    const balloonLeft = String(Math.floor(Math.random() * (900- balloonWidth))) + "px";
    balloonWidth = String(balloonWidth) + "px";
    const id = "balloon" + String(balloonsCounter);

    balloon.setAttribute("class", "balloon");
    balloon.setAttribute("id", id);
    balloon.setAttribute("onclick", "eventMain(this.id, true, event)");
    balloon.style.background = String(color);

    balloon.style.height = balloonWidth;
    balloon.style.width = balloonWidth;
    balloon.style.left = balloonLeft;
    balloon.style.top = balloonTop;

    gameArea.appendChild(balloon);
    (async () => {
        await setTimeout("eventMain(\"" + id +"\", false, null)", 2000/Math.ceil(balloonsCounter/6));
    })()
    startTimer = performance.now();
}

function missed(){
    updateScoreBoardLocal(-3);
    updateShootsFiredBox();
    audioMiss.play();
}

function deleteBalloon(id){
    var balloon = document.getElementById(id);
    balloon.parentNode.removeChild(balloon);
}

function updateShootsFiredBox(){
    misses++;
    document.getElementById("shootsFiredBox").innerHTML = misses;
    updateAccuracy();
}

function updateScoreBoardLocal(points){
    resultPoints += points;
    document.getElementById("pointsBox").innerHTML = resultPoints;
}

function updateBalloonCounter(){
    var balloonNumber = document.getElementById("roundBox");
    balloonNumber.innerHTML = balloonsCounter;
}

function calculatePoints(id){
    const difference = performance.now() - startTimer;
    const balloon = document.getElementById(id);
    return Math.floor(4000/difference);
}

function updateHitBox(){
    successfulHitCounter++;
    document.getElementById("hitBox").innerHTML = successfulHitCounter;
}

function changeAreaBackground(color, delay){
    (async () => {
        await setTimeout(() => {document.getElementById("gameArea").style.background = color}, delay);
    })();
}

function updateNickBox(){
    while(playerName == ""){
        playerName = prompt("Insert your player name: ");
    }
    document.getElementById("nickBox").innerHTML = playerName;
}

function updateAccuracy(){
    if(misses != 0) accuracy = ((successfulHitCounter/misses)*100).toFixed(2);
    document.getElementById("accuracyBox").innerHTML = accuracy;
}

function restart(){
    appendScore(playerName, resultPoints, userId);
}

async function highScoreLogic(){
    await setHighestId();
    userId++;
    highScoreData = await getSortedData();
    highScoreData.push({id: userId, name: playerName, score: resultPoints});
    highScoreData.sort((a, b) => {return b["score"] - a["score"]});
    setHighScores(highScoreData);
}

async function getSortedData(){
    return await axios.get("http://localhost:3000/results?_sort=score&_order=desc")
    .then(resp => {
        return resp.data;
    }).catch(error => console.log(error));
}

function deleteElementById(id){
    axios.delete("http://localhost:3000/results/" + String(id))
    .then(resp => {
        console.log(resp.data)
    }).catch(error => console.log(error));
}

function setHighScores(data){
    for(var i = 0; i < 4; i++){
        var myTr = document.createElement("tr");
        var myName = document.createElement("th");
        var myScore = document.createElement("th");
        
        myScore.appendChild(document.createTextNode(String(data[i]["score"])));
        myName.appendChild(document.createTextNode(String(data[i]["name"])));

        myTr.appendChild(myName);
        myTr.appendChild(myScore);
        highScores.appendChild(myTr);
    }
}

async function appendScore(inputName, inputScore, inputId){
    axios.post("http://localhost:3000/results", {
        id: inputId,
        name: inputName,
        score: inputScore
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));    
}

function clearHighScore(){
    var highScoreChilds = highScores.childNodes;
    for(var i = highScoreChilds.length - 1; i >= 0 ; i--){
        highScores.removeChild(highScoreChilds[i]);
    }
}

async function setHighestId(){
    await axios.get("http://localhost:3000/results?_sort=id&_order=desc")
    .then(resp => {
        UserId = resp.data[0]["id"] + 1;
    }).catch(error => console.log(error));
}