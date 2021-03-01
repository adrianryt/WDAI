


document.getElementById("img").onclick = function() {myFunction()};

function myFunction() {

    if(document.getElementById("img").style.border === "3px solid red"){
        document.getElementById("img").style.border = "3px solid blue";
        document.getElementById("img").src = "morze.webp";
    }
    else{
        document.getElementById("img").style.border = "3px solid red";
        document.getElementById("img").src = "gory.webp";
    }
  
}

