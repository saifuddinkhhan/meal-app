let result=document.getElementById("result");
let searchbtn=document.getElementById("btn");
let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchbtn.addEventListener("click", () =>{
    let takeinput=document.getElementById("input").value; 
    if(takeinput.length == 0){
        result.innerHTML=`<h3>Input feild cannot be Empty</h3>`;
    }else{
        fetch(url + takeinput).then(response => response.json()).then((data)=>{
            let myMeal=data.meals[0];
            console.log(myMeal);
            console.log(myMeal.strMealThumb);
            console.log(myMeal.strMeal);
            console.log(myMeal.strArea);
            console.log(myMeal.strInstructions);
            let count=1;
            let ingredients=[];
            for(let i in myMeal){
                let ingredient="";
                let measure="";
                if(i.startsWith("strIngredient") && myMeal[i]){
                    ingredient = myMeal[i];
                    measure = myMeal[`strMeasure`+ count];
                    count+=1;
                     ingredients.push(`${measure} ${ingredient}`);
                    
                }
            }
             console.log(ingredients);
             result.innerHTML = `<img src=${myMeal.strMealThumb}>;
            <div class="details">
                <h2>${myMeal.strMeal}</h2>
                <h2>${myMeal.strArea}</h2>
            </div>
            <div id="ingredient"></div>
            <div id="dish">
            <button id="close-btn">X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
            </div>
            <button id="show-btn">Show Instruction</button>
            `;
            let ingredientCon= document.getElementById("ingredient");
            let parent = document.createElement("ul");
            let dish = document.getElementById("dish");
            let closebtn = document.getElementById("close-btn");
            let showbtn = document.getElementById("show-btn");
        
            ingredients.forEach(function (i) {
                let child = document.createElement("li");
                child.innerText = i;
                parent.appendChild(child);
                ingredientCon.appendChild(child);

            });
            closebtn.addEventListener("click", ()=> {
                    dish.style.display = "none";
                });
            showbtn.addEventListener("click",  ()=> {
                    dish.style.display = "block";
                });
            
        }).catch(()=>{
            result.innerHTML = `<h3>Invalid Input</h3>`;
        });
        

    }
});


