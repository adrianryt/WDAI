document.getElementById("yellow").onclick = function() {pressYellow()};
document.getElementById("red").onclick = function() {pressRed()};
document.getElementById("grey").onclick = function() {pressGrey()};
document.getElementById("StopStartPropagation").onclick = function() {StopStart()};
document.getElementById("Reset").onclick = function() {Reset()};


var counter = document.getElementById("counter");
var StopStartf = true;
function pressYellow(){
    if(counter.innerHTML <= 50){
        alert("nacisnąłeś żółty o wartości 5");
        counter.innerHTML = parseInt(counter.innerHTML) + 5;
        
    }
    if(StopStartf){
        window.event.stopPropagation();
    }
    
}

function pressRed(){
    if(counter.innerHTML <= 30){
        alert("nacisnąłeś czerwony o wartości 2");
        counter.innerHTML = parseInt(counter.innerHTML) + 2;
    }
    if(StopStartf){
        window.event.stopPropagation();
    }
    
}

function pressGrey(){
        alert("nacisnąłeś szary o wartości 1");
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
}

function StopStart(){
    if(StopStartf){
        StopStartf = false;
        document.getElementById("StopStartPropagation").innerHTML = "Stop Propagation"
    }
    else{
        StopStartf = true;
        document.getElementById("StopStartPropagation").innerHTML = "Start Propagation"
    }
}

function Reset(){
    counter.innerHTML = 0;
}