"use strict";

//The divs with hidden msg for choice of using Numbers
const hidbox1 = document.querySelector("#hidbox1");
const hidbox2 = document.querySelector("#hidbox2");

const container = document.querySelector("#nameContainer");

const divContainer = document.querySelector("#container");

const dibba = document.querySelector("#goContainer");

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

//If only a number is set on the number input element, checking the first two checkboxes will be enabled
document.querySelector('input[type="number"]').addEventListener("change",()=>{
    const cbox1 = document.querySelector('input[value="num"]');
    const cbox2 = document.querySelector('input[value="name"]');
    const childBox1 = document.querySelector(`input[name="set4action1"]`);
    const childBox2 = document.querySelector(`input[name="set4action2"]`);
    cbox1.disabled = false;
    cbox2.disabled = false;
    if(cbox1.checked){
        cbox1.checked = false;
        hidbox1.style.visibility = "hidden";
        hidbox1.style.zIndex = "-1";
        childBox1.checked = false;
        childBox1.disabled = false;
    }
    if(cbox2.checked){
        cbox2.checked = false;
        hidbox2.style.visibility = "hidden";
        hidbox2.style.zIndex = "-2";
        childBox2.checked = false;
        childBox2.disabled = false;
    }
    removeNames();
    removeDivs();
    removeBtn();
});

//If the choice is using numbers
function onNumbers(){
    const choiceNum = document.querySelector('input[value="num"]');
    const choiceName = document.querySelector('input[value="name"]');
    const num = getNum();
    if(choiceNum.checked){
        choiceNumEffects();
        removeNames();
        getRandomOrder();
    }
    else{
        document.querySelector(`input[name="set4action1"]`).disabled = false;
        choiceName.checked = true;
        choiceNamEffects();
        getNames(num);
        removeDivs();
    }
    removeBtn();
    c = 0;
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
        getRandomOrder();
    }
    else{
        document.querySelector(`input[name="set4action2"]`).disabled = false;
        choiceNum.checked = true;
        choiceNumEffects();
        removeNames();
        removeDivs();
    }
    removeBtn();
    c = 0;
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
        newElements[i].setAttribute("class","names");
        newElements[i].setAttribute("id","name"+ (i+1));
        newElements[i].setAttribute("placeholder","name"+ (i+1));   
    }
    for(let i = 0; i < num; i+= 1){
        newDiv.appendChild(newElements[i]);
    }
}

//Add event listener to the checkboxes that appear to confirm the names or the numbers assigned
document.querySelector('input[name="set4action2"]').addEventListener("click",observe());
document.querySelector('input[name="set4action1"]').addEventListener("click",observe());

//Observes the changes in the webpage
function observe(){
    const num = getNum();
    const knownIDs = Array.from({length: num},(_, i) => "namae" + (i + 1));
    const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
            if(mutation.type === "childList"){
                mutation.addedNodes.forEach((node) => {
                    if(node.nodeType === 1 && knownIDs.includes(node.id)){
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
}

//Get names as input by user inside script
let names = [];
function setNames(event){
    event.target.disabled = true;
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
        createDivs(event); 
    },1500);
}

//Clears previous message that appeared when the choice was numbers
function setNumbers(event){
    event.target.disabled = true;
    setTimeout(() => {
        hidbox1.style.visibility = "hidden";
        hidbox1.style.zIndex = "-2";
    },1000);
    setTimeout(() => {
        createDivs(event);
    },1500);
}

//Circular divs for storing names
function createDivs(event){
    const num = getNum();
    let newDivs = [num];
    if(event.target.id == "s2"){
        for(let i = 0; i < num; i += 1){
            newDivs[i] = document.createElement("div");
            newDivs[i].setAttribute("class","card");
            newDivs[i].setAttribute("id","namae"+(i+1));
            newDivs[i].innerHTML = names[i];
            divContainer.appendChild(newDivs[i]);
        }
    }
    else if(event.target.id == "s1"){
        for(let i = 0; i < num; i += 1){
            newDivs[i] = document.createElement("div");
            newDivs[i].setAttribute("class","card");
            newDivs[i].setAttribute("id","namae"+(i+1));
            newDivs[i].innerHTML = i+1;
            divContainer.appendChild(newDivs[i]);
        }
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
    
    addButton();
}

//Function to add the button
function addButton(){
    const btn = document.createElement("div");
    btn.setAttribute("class", "go");
    btn.setAttribute("id", "go");
    btn.innerHTML = "Let's Go";
    dibba.appendChild(btn);
    btn.addEventListener("click",colorDivs);
}

//Function to remove the button
function removeBtn(){
    if(dibba.querySelector("div")){
        dibba.removeChild(document.querySelector("#go"));
    }
}

//Function to remove the pervious circular divs
function removeDivs(){
    const divs = document.querySelectorAll(".card");
    divs.forEach(div => div.remove());
}

//Color animation
function colorDivs(){
    if(intervalID){
        clearInterval(intervalID);
    }
    const num = getNum();
    const divs = Array.from(document.querySelectorAll(".card"));
    const colors = [
        "#FF00FF", 
        "#00FFFF", 
        "#FF4500", 
        "#ADFF2F", 
        "#FFFF00", 
        "#8A2BE2", 
        "#FF1493", 
        "#32CD32", 
        "#00FF7F", 
        "#00CED1", 
        "#FF69B4", 
        "#FFD700", 
        "#7FFF00", 
        "#DC143C", 
        "#1E90FF"  
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

//Fucntion to get a person according to the random order
function getAPerson(num){
    const divs = document.querySelectorAll(".card");
    const people = Array.from(divs, div => div.textContent);
    if(c == num){
        getRandomOrder();
        c = 0;
    }
    document.querySelector("#namae"+order[c]).style.background = "yellowgreen";
    //getRandomAnimation();
    c += 1;
}


