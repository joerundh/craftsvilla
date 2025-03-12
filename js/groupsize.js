let counter = 2;

let minGroupSize = 2;
let maxGroupSize = 10;

/*
Define and style DOM elements
*/

let groupCounter = document.createElement("div");
groupCounter.style.display = "flex";
groupCounter.style.flexDirection = "row";
groupCounter.justifyItems = "center";

let groupSize = document.createElement("div");
groupSize.style.width = "fit-content";
groupSize.style.display = "inline";

let numberDisplay = document.createElement("span");
numberDisplay.style.width = "20px";
numberDisplay.style.marginLeft = "5px";
numberDisplay.style.marginRight = "10px";
numberDisplay.innerText = `${counter}`;

/*
Functions
*/

function getSpanWithText(text) {
    let span = document.createElement("span");
    span.innerText = text;
    return span;
}

function turnOn(el) {
    el.style.color = "var(--light-blue)";
    el.style.shadow = "4px 4px 4px";
}

function turnOff(el) {
    el.style.color = "var(--light-gray)";
    el.style.shadow = "none";
}

function viewCount(max) {
    max = max || counter;
    for (let [key, el] of Array.from(groupSize.children).entries()) {
        if (key < max) turnOn(el);
        else turnOff(el);
    }
    numberDisplay.innerText = `${max}`
}

/*
Add counter icons and event listeners
*/

for (let i = 0; i < maxGroupSize; i++) {
    let person = document.createElement("span");
    person.class = "person-icon";
    person.innerHTML = "X";
    person.setAttribute("data-value", `${i + 1}`);
    person.style.cursor = "pointer";
    person.style.fontWeight = "bolder";
    if (i === 0) {
        person.addEventListener("mouseover", event => {
            viewCount(2);
        })
        person.addEventListener("click", event => {
            counter = 2;
        });
    } else {
        person.addEventListener("mouseover", event => {
            viewCount(parseInt(person.getAttribute("data-value")));
        });
        person.addEventListener("click", event => {
            counter = person.getAttribute("data-value");
        });
    }
    groupSize.append(person);
}
groupSize.addEventListener("mouseout", event => {
    viewCount();
});

groupCounter.append(getSpanWithText("Antall personer:"), numberDisplay, groupSize);
viewCount();

document.getElementById("booking").append(groupCounter);