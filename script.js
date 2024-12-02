let questionsAndAnswers=[{ 
        question:"Puff pastry is made with yeast ",
        a:"true",
        b:"false"
    },{ 
        question:"Baklava is made with puff pastry.",
        a:"true",
        b:"false"
    },{
        question:"Which pastry is known for its flaky, buttery layers?",
        a:"a) Shortcrust pastry",
        b:"b) Phyllo pastry",
        c:"c) Puff pastry",
        d:"d) Choux pastry"
    },{
        question:"Which ingredient is NOT typically used in a traditional French éclair?",
        a:"a) Choux pastry",
        b:"b) Vanilla custard",
        c:"c) Chocolate glaze",
        d:"d) Almond flour"
    },{
        question:"Which of the following are types of laminated dough?",
        a:"a) Croissant",
        b:"b) Puff pastry",
        c:"c) Chocolate glaze",
        d:"d) Shortcrust pastry"
    }]

let i = 0;

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

    let newMainContainer = document.createElement('div');
    newMainContainer.classList.add('mainContainer');

    newMainContainer.innerHTML = `
        <div class="mainContainer dark">
        <div class="questionContainer">
            <p>${questionText}</p>
        </div>
        <div class="answerAndButton">
            <button class="previousButton"><img src="triangle-svgrepo-com-purple.png" alt="" width="100%"></button>
            <div class="answerContainer">
            </div>
            <button class="nextButton" ><img class="nextButtonImg" src="triangle-svgrepo-com-purple.png" width="100%"  alt=""></button>
        </div>
    </div>
    `;

    let body = document.querySelector('body');
    let mainContainer = document.querySelector('.mainContainer');
    
    if (mainContainer) {
        mainContainer.remove();
    }
    body.append(newMainContainer);

    createAnswerButton();

    document.querySelector('.nextButton').addEventListener('click',() => {
        collectAnswers ();
        i++;
        if (i < questionsAndAnswers.length) {
            let newQuestionText = questionsAndAnswers[i].question;
            createNewQuestion(newQuestionText);
        }
    });

    document.querySelector('.previousButton').addEventListener('click',() => {
        if (i!==0){
            i--;
            let newQuestionText = questionsAndAnswers[i].question;
            createNewQuestion(newQuestionText);
        }
    });

}

//Calls function for the first time and creates the first question card
createNewQuestion(questionsAndAnswers[i].question);


//Function that compares values of an array with correct answers and an array with chosen values
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




