//The divs with hidden msg for choice of using Numbers
const hidbox1 = document.querySelector("#hidbox1");
const hidbox2 = document.querySelector("#hidbox2");

const hidbox = document.querySelector("#hidbox");

const container = document.querySelector("#nameContainer");

const divContainer = document.querySelector("#container");

let intervalID = null;

let order = [];

let c = 0;

function getNum(){
    return document.querySelector('input[name="members"]').value;
}

//Animation for Numbers as Choice
function choiceNumEffects(){
    //Display required message
    hidbox1.style.visibility = "visible";
    hidbox1.style.zIndex = "1";
    //Hide unrequired message
    hidbox2.style.visibility = "hidden";
    hidbox2.style.zIndex = "-2";
    //Reset checkboxes from when the choice was Names
    document.querySelector('input[value="name"]').checked = false;
    if(document.querySelector('input[name="set4action2"]').checked){
        document.querySelector('input[name="set4action2"]').checked = false;
    }
}

//Animation for Names as Choice
function choiceNamEffects(){
    //Display required message
    hidbox2.style.visibility = "visible";
    hidbox2.style.zIndex = "1";
    //Hide unrequired message
    hidbox1.style.visibility = "hidden";
    hidbox1.style.zIndex = "-1";
    //Reset checkboxes from when the choice was Numbers
    document.querySelector('input[value="num"]').checked = false;
    if(document.querySelector('input[name="set4action1"]').checked){
        document.querySelector('input[name="set4action1"]').checked = false;
    }
}

//Remove name divs and associated properties
function removeNames(){
    if(document.querySelectorAll(".card")){
        const circles = Array.from(document.querySelectorAll(".card"));
        circles.forEach(circle => circle.remove());
    }
    if(document.querySelector("#names")){
        document.querySelector("#names").remove();
    }
}

//If the choice is using numbers
function onNumbers(){
    const choiceNum = document.querySelector('input[value="num"]');
    const choiceName = document.querySelector('input[value="name"]');
    const num = getNum();
    if(choiceNum.checked){
        choiceNumEffects();
        removeNames();
    }
    else{
        choiceName.checked = true;
        choiceNamEffects();
        getNames(num);
    }
}

//If the choice is using names
function onNames(){
    const choiceName = document.querySelector('input[value="name"]');
    const choiceNum = document.querySelector('input[value="num"]');
    const num = getNum();
    if(choiceName.checked == true){
        removeNames();
        choiceNamEffects();
        getNames(num);
    }
    else{
        choiceNum.checked = true;
        choiceNumEffects();
        removeNames();
    }
}

//Ask user inputs for names
function getNames(num){
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id","names");
    container.appendChild(newDiv);
    let newElements = [num];
    for(let i = 0; i < num; i+= 1){
        newElements[i] = document.createElement("input");
        newElements[i].setAttribute("type","text");
        newElements[i].setAttribute("id","name"+ (i+1));
        newElements[i].setAttribute("placeholder","name"+ (i+1));   
    }
    for(let i = 0; i < num; i+= 1){
        newDiv.appendChild(newElements[i]);
    }
    document.querySelector('input[name="set4action2"]').addEventListener("click",getRandomOrder());
}

document.querySelector('input[name="set4action2"]').addEventListener("click",()=>{
    const num = getNum();
    const knownIDs = Array.from({length: num},(_, i) => "namae" + (i + 1));
    const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
            if(mutation.type === "childList"){
                mutation.addedNodes.forEach((node) => {
                    if(node.nodeType === 1 && knownIDs.includes(node.id)){
                        alert('c = '+c);
                        if(c === num){
                            observer.disconnect();
                        }
                        c += 1;
                    }
                });
            }
        });
    });
    observer.observe(divContainer, {childList: true, subtree: true});
});

//Get names as input by user inside script
let names = [];
function setNames(){
    const num = getNum();
    if(document.querySelector('input[name="set4action2"]').checked){
        for(let i = 0; i < num; i += 1){
            names[i] = document.querySelector("#name"+(i+1)).value; 
        }
    }
    setTimeout(() => {
        hidbox2.style.visibility = "hidden";
        hidbox2.style.zIndex = "-2";
    },1000);
    setTimeout(() => {
        createDivs(); 
    },2000);
}

//Circular divs for storing names
function createDivs(){
    const num = getNum();
    let newDivs = [num];
    for(let i = 0; i < num; i += 1){
        newDivs[i] = document.createElement("div");
        newDivs[i].setAttribute("class","card");
        newDivs[i].setAttribute("id","namae"+(i+1));
        newDivs[i].innerHTML = names[i];
        divContainer.appendChild(newDivs[i]);
    }

    //Swapping the div values

    // Extracting divs values from each name divs 
    const divs = Array.from(document.querySelectorAll(".card"));
    const values = divs.map(d => d.innerHTML);

    // Using the Fisher-Yates algorithm to swap the values in divs
    for(let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [values[i],values[j]] = [values[j],values[i]];
    }

    //Assigning the shuffled values back to the divs
    divs.forEach((d,index) => {
        d.innerHTML = values[index];
    });

    alert("After: "+ values);

    // document.querySelector("#go").addEventListener("click", getAPerson());
}

//Color animation
function colorDivs(){
    if(intervalID){
        clearInterval(intervalID);
    }
    const num = getNum();
    const divs = Array.from(document.querySelectorAll(".card"));
    const colors = [
        "#FF00FF", // Neon Pink
        "#00FFFF", // Neon Cyan
        "#FF4500", // Neon Orange
        "#ADFF2F", // Neon Green
        "#FFFF00", // Neon Yellow
        "#8A2BE2", // Neon Purple
        "#FF1493", // Deep Pink
        "#32CD32", // Lime Green
        "#00FF7F", // Spring Green
        "#00CED1", // Dark Turquoise
        "#FF69B4", // Hot Pink
        "#FFD700", // Gold
        "#7FFF00", // Chartreuse
        "#DC143C", // Crimson
        "#1E90FF"  // Dodger Blue
    ];
    let colorIndex = 0;
    divs.forEach((d,i) => {
        d.style.background = colors[i % colors.length]
    });
    intervalID = setInterval(() => {
        divs.forEach((d, i) =>{
            d.style.background = colors[( i + colorIndex) % colors.length];
        });
        colorIndex += 1;
    },100);
    setTimeout(()=>{
        clearInterval(intervalID);
        divs.forEach((d) => {
            d.style.background = "rgb(82, 77, 77)"
        });
        getAPerson(num);
    },5000);
}

//A proper random number generator function
function getRandomInt(min,max){  
    return (Math.floor(Math.random() * (max-min+1)) + min);
}

//It gives random order of people beforehand
function getRandomOrder(){
    const num = getNum();
    
    order = Array.from({length : num}, (_, index) => index + 1);

    // Using the Fisher-Yates algorithm to swap the numbers in order
    for(let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [order[i],order[j]] = [order[j],order[i]];
    }
}

function getAPerson(num){
    const divs = document.querySelectorAll(".card");
    const people = Array.from(divs, div => div.textContent);
    alert(order);
    alert(people);
    if(c == num){
        getRandomOrder();
        c = 0;
    }
    document.querySelector("#namae"+order[c]).style.background = "yellowgreen";
    //getRandomAnimation();
    c += 1;
}




