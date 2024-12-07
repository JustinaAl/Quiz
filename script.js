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
    a:"a) Croissant",
    b:"b) Puff pastry",
    c:"c) Shortcrust pastry",
    d:"d) Danish pastry"
},{ 
    question:"12. Which ingredients are typically used in making choux pastry?",
    a:"a) Flour",
    b:"b) Butter",
    c:"c) Eggs",
    d:"d) Yeast"
},{
    question:"13. Which of these pastries are often filled with frangipane (almond cream)?",
    a:"a) Galette des Rois",
    b:"b) Tarte Tatin",
    c:"c) Almond croissant",
    d:"d) Bakewell tart"
},{
    question:"14. Which of these pastries are made using yeast dough?",
    a:"a) Brioche",
    b:"b) Choux Pastry",
    c:"c) Pain au chocolat",
    d:"d) Churros"
},{
    question:"15. Which of the following are classic French pastries?",
    a:"a) Éclair",
    b:"b) Tarte Tatin",
    c:"c) Cannoli",
    d:"d) Madeleines"
}];

let body = document.querySelector("body");

let i = 0;
let mainContainer = document.querySelector(".mainContainer");

let rightAnswers =["False","False","False","False","True","c) Puff pastry","d) Almond flour","c) Shortcrust pastry","c) Butter","b) Mille-feuille",["a) Croissant","b) Puff pastry","d) Danish pastry"],["a) Flour", "b) Butter", "c) Eggs"],["a) Galette des Rois", "c) Almond croissant", "d) Bakewell tart"],["a) Brioche", "c) Pain au chocolat"],["a) Éclair", "b) Tarte Tatin", "d) Madeleines"]];
let chechedValues =[];

let darkLightInput = document.querySelector("#darkLightInput");
let submit = document.createElement("button");



//Function that collects answers.
function collectAnswers (){
    let checked = document.querySelectorAll('input:not(#darkLightInput):not(#disableAnimation):not(#music):checked');
    if (checked.length < 2) {
        checked.forEach(value => {
            chechedValues.push(value.value);
        });
    }else{
        let allValues = [];
        checked.forEach(value=>allValues.push(value.value));
        chechedValues.push(allValues);
    }
    
}

//Function that compares values of an array with correct answers and an array with chosen values and counts points
let points = 0;
function countPoints() {
    if(Array.isArray(rightAnswers[i])){
        let rightArray = rightAnswers[i];
        let chosenArray = chechedValues[i];
        let rightArrayNew = new Map([rightArray]);

        if(Array.isArray(chechedValues[i])){
            for (let y=0; y<chechedValues[i].length; y++){
                chosenArray.forEach(value=>{
                    if(rightArrayNew.has(value)){
                        points++;
                    }
                })
            }
        }else if(rightArray.includes(chosenArray)){
            points++;
       }
    }else{
        if (rightAnswers[i]===chechedValues[i]){
             points++;
        }
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
        correctAnswer.innerHTML = `Correct answer: ${rightAnswers[x]} <p id="chosenAnswer">Your answer: ${chechedValues[x]}</p><hr>`;
        
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
                <input class="radio" type="radio" name="oneTrue" id="${value.slice(0, 2)}" value="${value}">
                <label class="label" for="${value.slice(0, 2)}"><span>${value}</span></label>`;
            //where multiple answers are correct
            }else{
                answerButtonWrap.innerHTML = `
                <input class="checkbox" type="checkbox" name="fewTrue" id="${value.slice(0, 2)}" value="${value}">
                <label class="label" for="${value.slice(0, 2)}"><span>${value}</span></label>`;
            }
            document.querySelector(".answerContainer").append(answerButtonWrap);
        }
    });

        //dark light mode thing
        if(darkLightInput.checked){
            document.querySelectorAll('div.answerButtonWrap .label').forEach(label =>{label.classList.add("light")});
            document.querySelector('.whatNumber').classList.add("light");
        }
}


//Previous button function
function buttonPrevious() {
    if (i!==0){
        i--;
        if(Array.isArray(chechedValues[i])){
            let thePoints = chechedValues[i].length
            points -= thePoints;
        }else{
            points--;
        }
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
        countPoints();
        i++;

        if (i < questionsAndAnswers.length) {
            let newQuestionText = questionsAndAnswers[i].question;
            createNewQuestion(newQuestionText);
        }else{
            mainContainer.innerHTML = "";
            submit.classList.add("submit");
            submit.textContent = "Submit the answers";
            mainContainer.append(submit);

            if(darkLightInput.checked){
                submit.classList.add("light");
            }
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
    theResults();
    colourResult();
    
});

//Starts the game
document.querySelector("#startGame").addEventListener("click",()=>{
    document.querySelector(".mainContainer").classList.remove("first");
    createNewQuestion(questionsAndAnswers[i].question);
});


//Dark light function
function darkLight(){
    if(darkLightInput.checked){
        body.classList.add("light");
        document.querySelector('header').classList.add("light");
        document.querySelector('.mainContainer').classList.add("light");
        document.querySelectorAll(".answerButtonWrap .label").forEach(label => label.classList.add("light"));
    }
    else{
        body.classList.remove("light");
        document.querySelector('header').classList.remove("light");
        document.querySelector('.mainContainer').classList.remove("light");
        document.querySelectorAll(".answerButtonWrap .label").forEach(label => label.classList.remove("light"));
        if (!"#startGame") {
            document.querySelector('#startGame').classList.remove("light");
        }
    }
}

//Dark light mode button
darkLightInput.addEventListener("change",()=> darkLight());


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
