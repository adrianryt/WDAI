var flag = true;
function change(){
    fetch("http://localhost:3000/people").then(function (response){
            return response.json();
        }).then(function (data){
            if(flag){
                var addNumberOfLetters = document.getElementById("point1");
                var includesR = document.getElementById("point2");
                var youngestPpl = document.getElementById("point3");
                includesR.innerHTML = "Included r: <br> ";
                var average = 0;
                for(i = 0; i < data.length; i++){
                    data[i].name = data[i].name + "-" + (data[i].name.length);
                    addNumberOfLetters.innerHTML += data[i].name + " Lat: " + data[i].age + "<br>"; 
                    average += Number(data[i].age);
                    if((data[i].name).includes("r") || data[i].name.includes("R")){
                        includesR.innerHTML += data[i].name + "<br>";
                    }
                }
                addNumberOfLetters.innerHTML += "<br>" + "Average age: " + (average/data.length);
                data.sort(function (a, b){
                    return (a.age)-(b.age)
                });
                youngestPpl.innerHTML = "Second and Third youngest persons: <br>" + data[1].name + " " +(data[1].age) + "<br>" + data[2].name + " " + (data[2].age) + "<br>";
            }
        flag = false;
        })
}