let questionsAndAnswers=[{ 
        question:"1. Puff pastry is made with yeast.",
        a:"true",
        b:"false"
    },{ 
        question:"2. Baklava is made with puff pastry.",
        a:"true",
        b:"false"
    },{
        question:"3. Which pastry is known for its flaky, buttery layers?",
        a:"a) Shortcrust pastry",
        b:"b) Phyllo pastry",
        c:"c) Puff pastry",
        d:"d) Choux pastry"
    },{
        question:"4. Which ingredient is NOT typically used in a traditional French éclair?",
        a:"a) Choux pastry",
        b:"b) Vanilla custard",
        c:"c) Chocolate glaze",
        d:"d) Almond flour"
    },{
        question:"5. Which of the following are types of laminated dough?",
        a:"a) Croissant",
        b:"b) Puff pastry",
        c:"c) Chocolate glaze",
        d:"d) Shortcrust pastry"
    }]

let i = 0;
let mainContainer = document.querySelector(".mainContainer")

let rightAnswers =["fa","fa","c)","d)",["a)","b)","d)"]]
let chechedValues =[];


//Function that collects answers.
function collectAnswers (){
    let checked = document.querySelectorAll('input:checked');
    if (checked.length < 2) {
        checked.forEach(value => {
            chechedValues.push(value.value)
        });
    }else{
        let allValues = [];
        checked.forEach(value=>allValues.push(value.value))
        chechedValues.push(allValues);
    }
    
}

//Function that compares values of an array with correct answers and an array with chosen values and counts points
let points = 0;

function countPoints() {
    if(Array.isArray(rightAnswers[i])){
        for (let x=0; x<rightAnswers[i].length; x++){
            if(rightAnswers[i][x] === chechedValues[i][x]){
                points++;
            }
        }
    }else{
        if (rightAnswers[i]===chechedValues[i]){
             points++;
        }
    }
    
}

//Function that prints out the results
function theResults(){
    mainContainer.classList.remove("first");
    mainContainer.classList.add("results");


    mainContainer.innerHTML =`
    <h1>Results</h1>
        <div class="scoreBox">
            <div class="score">
                <h2>Your score</h2>
                <p>${((points / rightAnswers.flat().length) * 100).toFixed(2)}%</p>
            </div>
            <div class="score">
                <h2>Your points</h2>
                <p>${points}/${rightAnswers.flat().length}</p>
            </div>
        </div>
        <div class="allQuestions">
        </div>`

            // <div class="questionBox">
            //     <p class="question">1. Puff pastry is made with yeast ?</p>
            //     <p class="rightAnswer">Answer: Falses <span id="chosenAnswer">Your answer: False</span></p>
            // </div>


        //Prints out all the questions
        let allQuestions = document.querySelector(".allQuestions");

        questionsAndAnswers.forEach(question => {
            let questionBox = document.createElement('div');
            questionBox.classList.add("questionBox");

            let aQuestion = document.createElement('p');
            aQuestion.classList.add("aQuestion"); 
            aQuestion.textContent = question.question;

            questionBox.append(aQuestion);
            allQuestions.append(questionBox);
            
            let allQuestionBoxes = document.querySelectorAll(".questionBox")
            //allQuestionBoxes.forEach(box)  create a p tag with class right anser
        });

        //let questionBoxes = document.querySelectorAll('.question')

}


//This function creates answer buttons
function createAnswerButton(){
    let buttonContainer = document.querySelector(".answerContainer");

     Object.keys(questionsAndAnswers[i]).forEach((key, index) => {
        if (index > 0) {
            let answerButtonWrap = document.createElement("div");
            answerButtonWrap.classList.add("answerButtonWrap");

            let value = questionsAndAnswers[i][key];
            //where only one answer is correct
            if(i<3){
                answerButtonWrap.innerHTML = `
                <input class="radio" type="radio" name="oneTrue" id="${value.slice(0, 2)}" value="${value.slice(0, 2)}">
                <label class="label" for="${value.slice(0, 2)}"><span>${value.charAt(0).toUpperCase()+ value.slice(1)}</span></label>
            `;
            //where multiple answers are correct
            }else{
                answerButtonWrap.innerHTML = `
                <input class="checkbox" type="checkbox" name="fewTrue" id="${value.slice(0, 2)}" value="${value.slice(0, 2)}">
                <label class="label" for="${value.slice(0, 2)}"><span>${value.charAt(0).toUpperCase()+ value.slice(1)}</span></label>
            `;
            }
            
            buttonContainer.append(answerButtonWrap);
        }
        });

}

//This function creates question card
function createNewQuestion(questionText) {

    mainContainer.innerHTML = `
        <div class="questionContainer">
            <p>${questionText}</p>
        </div>
        <div class="answerAndButton">
            <button class="previousButton"><img src="triangle-svgrepo-com-purple.png" alt="" width="100%"></button>
            <div class="answerContainer"> </div>
            <button class="nextButton" ><img class="nextButtonImg" src="triangle-svgrepo-com-purple.png" width="100%"  alt=""></button>
        </div>`;
    
    document.querySelector('body').append(mainContainer);

    createAnswerButton();

    document.querySelector('.nextButton').addEventListener('click',() => {
        let isChecked = document.querySelector("input:checked");

        if(isChecked){
            collectAnswers ();
            countPoints();
            console.log(points);
            
            i++;
            if (i < questionsAndAnswers.length) {
                let newQuestionText = questionsAndAnswers[i].question;
                createNewQuestion(newQuestionText);
            }else{
                mainContainer.innerHTML = "";
                let submit = document.createElement("button");
                submit.classList.add("submit");
                submit.textContent = "Submit the answers"
                mainContainer.append(submit);
                submit.addEventListener("click",() => theResults())
            }
            }
    });

    document.querySelector('.previousButton').addEventListener('click',() => {
        if (i!==0){
            i--;
            points--;
            let newQuestionText = questionsAndAnswers[i].question;
            createNewQuestion(newQuestionText);
        }
    });
    
}

//Starts the game
document.querySelector("#startGame").addEventListener("click",()=>{
    createNewQuestion(questionsAndAnswers[i].question);
})





