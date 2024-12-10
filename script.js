let questionsAndAnswers=[{ 
    question:"1. Puff pastry is made with yeast.",
    a:"True",
    b:"False"
},{ 
    question:"2. Baklava is made with puff pastry.",
    a:"True",
    b:"False"
},{
    question:"3. An éclair is traditionally filled with whipped cream",
    a:"True",
    b:"False"
},{
    question:"4. Tiramisu is French",
    a:"True",
    b:"False"
},{
    question:"5. Croissants are made with a laminated dough.",
    a:"True",
    b:"False"
},{ 
    question:"6. Which pastry is known for its flaky, buttery layers?",
    a:"a) Shortcrust pastry",
    b:"b) Phyllo pastry",
    c:"c) Puff pastry",
    d:"d) Choux pastry"
},{ 
    question:"7. Which ingredient is NOT typically used in a traditional French éclair?",
    a:"a) Choux pastry",
    b:"b) Vanilla custard",
    c:"c) Chocolate glaze",
    d:"d) Almond flour"
},{
    question:"8. Which type of pastry is often used for making tarts?",
    a:"a) Filo pastry",
    b:"b) Choux pastry",
    c:"c) Shortcrust pastry",
    d:"d) Puff pastry"
},{
    question:"9. What is the key ingredient in puff pastry that creates its flakiness?",
    a:"a) Baking powder",
    b:"b) Yeast",
    c:"c) Butter",
    d:"d) Milk"
},{
    question:"10. What is the other name for Napoleon cake?",
    a:"a) Angel food cake",
    b:"b) Mille-feuille",
    c:"c) Black Forest",
    d:"d) Ensaimada"
},{ 
    question:"11. Which of the following are types of laminated dough?",
    a:"Croissant",
    b:"Puff pastry",
    c:"Shortcrust pastry",
    d:"Danish pastry"
},{ 
    question:"12. Which ingredients are typically used in making choux pastry?",
    a:"Flour",
    b:"Butter",
    c:"Eggs",
    d:"Yeast"
},{
    question:"13. Which of these pastries are often filled with frangipane (almond cream)?",
    a:"Galette des Rois",
    b:"Tarte Tatin",
    c:"Almond croissant",
    d:"Bakewell tart"
},{
    question:"14. Which of these pastries are made using yeast dough?",
    a:"Brioche",
    b:"Choux Pastry",
    c:"Pain au chocolat",
    d:"Churros"
},{
    question:"15. Which of the following are classic French pastries?",
    a:"Éclair",
    b:"Tarte Tatin",
    c:"Cannoli",
    d:"Madeleines"
}];

let body = document.querySelector("body");

let i = 0;
let mainContainer = document.querySelector(".mainContainer");

let rightAnswers =["False","False","False","False","True","c) Puff pastry","d) Almond flour","c) Shortcrust pastry","c) Butter","b) Mille-feuille",[" Croissant"," Puff pastry"," Danish pastry"],[" Flour", " Butter", " Eggs"],[" Galette des Rois", " Almond croissant", " Bakewell tart"],[" Brioche", " Pain au chocolat"],[" Éclair", " Tarte Tatin", " Madeleines"]];
let chechedValues =[];


let darkLightInput = document.querySelector("#darkLightInput");
let submit = document.createElement("button");

//Function that compares values of an array with correct answers and an array with chosen values and counts points
let points = 0;

function countPoints() {
    for (let a = 0; a < rightAnswers.length; a++) {
        if(Array.isArray(rightAnswers[a])){
            if (Array.isArray(chechedValues[a])) {
                chechedValues[a].forEach(value =>{
                    if(rightAnswers[a].includes(value)){
                        points++;
                    }else if(points>0){
                        points--;
                    }
                })
            }else if(rightAnswers[a].includes(chechedValues[a])){
                points++;
            }else if(points>0){
                points--;
            }

        }else if(rightAnswers[a]===chechedValues[a]){
            points++;
        }
    }
}


//Function that collects answers.
function collectAnswers (){
    let checked = document.querySelectorAll('input:not(#darkLightInput):not(#disableAnimation):not(#music):checked');
    if (checked.length < 2) {
        checked.forEach(value => {
            chechedValues.push(value.value);
        });
    }else{
        let allValues = [];
        checked.forEach(value=>allValues.push(" "+value.value));
        chechedValues.push(allValues);
    }
    
}

//Function that prints out the results
function theResults(){
    mainContainer.classList.add("results");

    mainContainer.innerHTML =`
    <h1>Results</h1>
        <div class="scoreBox">
            <div class="score">
                <h2>Your score</h2>
                <p class="pScore">${((points / rightAnswers.flat().length) * 100).toFixed(2)}%</p>
            </div>
            <div class="score">
                <h2>Your points</h2>
                <p class="pScore">${points}/${rightAnswers.flat().length}</p>
            </div>
        </div>
        <div class="allQuestions">
        </div>`;

    //Prints out all the questions
    let allQuestions = document.querySelector(".allQuestions");

    questionsAndAnswers.forEach((question, x )=> {
        let questionBox = document.createElement('div');
        questionBox.classList.add("questionBox");

        let aQuestion = document.createElement('p');
        aQuestion.classList.add("aQuestion"); 
        aQuestion.textContent = question.question;


        questionBox.append(aQuestion);

        let correctAnswer = document.createElement("p");
        correctAnswer.classList.add("rightAnswer");
        correctAnswer.innerHTML = `Correct answer: ${rightAnswers[x]} <p id="chosenAnswer">Your answer: ${chechedValues[x]} </p><hr>`;
        
        questionBox.append(correctAnswer);
        allQuestions.append(questionBox);
    });


}


//This function creates answer buttons
function createAnswerButton(){

     Object.keys(questionsAndAnswers[i]).forEach((key, index) => {
        if (index > 0) {
            let answerButtonWrap = document.createElement("div");
            answerButtonWrap.classList.add("answerButtonWrap");

            let value = questionsAndAnswers[i][key];
            //where only one answer is correct
            if(i<10){
                answerButtonWrap.innerHTML = `
                <input class="radio" type="radio" name="oneTrue" id="${value.slice(0, 3)}" value="${value}">
                <label class="label" for="${value.slice(0, 3)}"><span>${value}</span></label>`;
            //where multiple answers are correct
            }else{
                answerButtonWrap.innerHTML = `
                <input class="checkbox" type="checkbox" name="fewTrue" id="${value.slice(0, 3)}" value="${value}">
                <label class="label" for="${value.slice(0, 3)}"><span>${value}</span></label>`;
            }
            document.querySelector(".answerContainer").append(answerButtonWrap);
        }
    });
}


//Previous button function
function buttonPrevious() {
    if (i!==0){
        i--;
        chechedValues.pop();
        let newQuestionText = questionsAndAnswers[i].question;
        createNewQuestion(newQuestionText);
    }
}

//Next button
function buttonNext() {
    let isChecked = document.querySelector("input:not(#darkLightInput):not(#disableAnimation):not(#music):checked");

    if(isChecked){
        collectAnswers ();
        i++;

        if (i < questionsAndAnswers.length) {
            let newQuestionText = questionsAndAnswers[i].question;
            createNewQuestion(newQuestionText);
        }else{
            mainContainer.innerHTML = "";
            submit.classList.add("submit");
            submit.textContent = "Submit the answers";
            mainContainer.append(submit);
        }
        }
        
}

//This function creates question card
function createNewQuestion(questionText) {

    mainContainer.innerHTML = `
        <div class="questionContainer">
            <p>${questionText}</p>
        </div>
        <div class="answerAndButton">
            <div class="answerContainer"> </div>
            <div class = "nextP">
                <button class="previousButton"><img src="images/previous.svg" alt="" width="100%"></button>
                <div class="whatNumber">${i+1}/${questionsAndAnswers.length}</div>
                <button class="nextButton" ><img class="nextButtonImg" src="images/next.svg" width="100%"  alt=""></button>
            </ div>
        </div>`;
    
    if(i>=10){
        let span = document.createElement('span');
        span.innerText = " (Multiple answers may be correct)";
        document.querySelector(".questionContainer p").append(span)
    }
    
    body.append(mainContainer);
    createAnswerButton();

    document.querySelector('.nextButton').addEventListener('click',() => buttonNext());
    document.querySelector('.previousButton').addEventListener('click',() => buttonPrevious());
    
}


//Function that changes result color
function colourResult(){
    let allPoinst = rightAnswers.flat().length;
    let procent = points/allPoinst * 100;
    let divScore = document.querySelectorAll('div.score');
    divScore.forEach(div =>{
        if(procent<50){
            div.classList.add("red");
        }else if(procent>=50 && procent<75){
            div.classList.add("orange");
        }else{
            div.classList.add("green");
        }
    });
}

//submit button function
submit.addEventListener("click",() => {
    countPoints();
    theResults();
    colourResult();
});

//Starts the game
document.querySelector("#startGame").addEventListener("click",()=>{
    document.querySelector(".mainContainer").classList.remove("first");
    createNewQuestion(questionsAndAnswers[i].question);
});


if (localStorage.getItem('DarkLightMode') === 'light') {
    body.classList.add('light');
    darkLightInput.checked = true;
} else {
    body.classList.remove('light');
    darkLightInput.checked = false;
}

//Dark light mode button
darkLightInput.addEventListener("change",()=> {
    if(darkLightInput.checked){
        body.classList.add("light");
        localStorage.setItem('DarkLightMode', 'light');
    }
    else{
        body.classList.remove("light");
        localStorage.removeItem('DarkLightMode', 'light');
    }
});


//Background animation enable/disable
let object = document.querySelectorAll(".backgroundObject")
let disableAnimation = document.querySelector("#disableAnimation")

disableAnimation.addEventListener("change",() => {
    if(disableAnimation.checked){
        object.forEach(object => object.style.animation = "none");
        document.querySelector(".animationButton label").style.backgroundImage = "url('images/sitting.svg')";
    }else{
        object.forEach((object, i) => {
            object.style.animation = "goDown linear 40s infinite";
            if(i<5){
                object.style.animationDelay = "0s";
            }else if(i>5 && i<11){
                object.style.animationDelay = "10s";
            }else if(i>11 && i<16){
                object.style.animationDelay = "20s";
            }else {
                object.style.animationDelay = "30s"
            }
        });
        document.querySelector(".animationButton label").style.backgroundImage = "url('images/running.svg')";
    }
})

//Music emable/disable
let enableMusic = document.querySelector("#music");
let audio = new Audio("images/Sakura-Girl-Daisy-chosic.com_.mp3")
enableMusic.addEventListener("change",()=>{
    if(enableMusic.checked){
        audio.play();
        audio.loop = true;
    }else{
        audio.pause();
    }
})
