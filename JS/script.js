const list = document.getElementById("list");
const infos = document.getElementById("infos");
const description = document.getElementById("description");
const types = document.querySelector("#type");
const api = "https://pokeapi.co/api/v2/pokemon?limit=150";

/**
 * Try to parse a response as JSON data
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Content not loaded");
}

/**
 * Clear the list of all its items
 */
function emptyList (list) {
    // ...
    list.innerHTML = "";
}



/**
 * Create an item, fetch its data and setup event listener
 */
function createItem (pokemon) {
    // Create a li tag
    const item = document.createElement("li");

    
   
    // ...
    
    fetch(pokemon.url).then(transformToJson).then((data) => {
        // ...
      
       item.textContent = data.name ;
       list.appendChild(item);
        
    item.addEventListener("click", function(){ 
        document.getElementById("description").style.display="block"; 
        showDescription(data);
    }); 
 
    });
}

/**
 * fill the item list with values
 */
function fillList (json) {
    emptyList(list);
    json.results.forEach(createItem);
  
}

/**
 * Fill and display the description
 */
function showDescription (data) {
   
    
    description.classList.add("show");
    
     const fields = description.querySelectorAll("dd");
    fields.forEach((dd) => {
        if(dd.classList[0] != undefined){
        console.log(dd.classList[0]);
         dd.textContent = data[dd.classList[0]];
        }
    });
         
        document.querySelector("#blackScreen").style.display="none";
        document.querySelector("#greenScreen").style.display="none";
        document.querySelector("#battleScreen").style.display="block";
        document.querySelector(".forms").textContent = data.forms[0].name;
        createAbilities(data.abilities);
        createTypes (data.types);
        document.querySelector("#selfie").setAttribute("src", "https://pokeres.bastionbot.org/images/pokemon/" + data.id + ".png");
        const btnClose = document.getElementsByClassName("close")[0];
        document.querySelector("#play").addEventListener("click", function(){
            document.querySelector("audio").play();
        });


    btnClose.addEventListener("click", function(){ 
        
        document.querySelector("#battleScreen").style.display="none";
        document.getElementById("description").style.display="none"; 
        document.querySelector("#blackScreen").style.display="block";
        document.querySelector("#greenScreen").style.display="block";
        document.querySelector("audio").pause();
        document.querySelector("audio").currentTime = 0;
    }); 
}

/**
 * Hide the description
 */
function hideDescription () {
    description.classList.remove("show");
}


function createAbilities (array) {
    emptyList (infos);
    array.forEach(function(element){
        let item = document.createElement("li");
        item.setAttribute("classe", "infos");
        item.textContent = ". " + element.ability.name;
        infos.appendChild(item);
    });

    
}

function createTypes (array) {
    emptyList(types);
    array.forEach(function (element){
        let item = document.createElement("li");
        item.setAttribute("class", "type");
        item.textContent= ". " + element.type.name;
        types.appendChild(item);
    });
}

function playSound () {
    document.querySelector("#play").addEventListener("click", function(){
        document.querySelector("audio").setAttribute("src", "JS/sound/First-150/1 (" + data.id + ").wav");
        document.querySelector("audio").play();
    });
}



// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);

