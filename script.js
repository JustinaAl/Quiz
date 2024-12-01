let questionsAndAnswers=[{ 
        question:"Baklava is made with puff pastry.",
        a:"true",
        b:"false"
    },{
        question:"An éclair is traditionally filled with whipped cream.",
        a:"true",
        b:"false"
    },{
        question:"Which pastry is known for its flaky, buttery layers?",
        a:"a) Shortcrust pastry",
        b:"b) Phyllo pastry",
        c:"c) Puff pastry",
        d:"d) Choux pastry"
    },{
        question:"Which?",
        a:"a)",
        b:"b)",
        c:"c)",
        d:"d)"
    }]

let i = 0;

function createAnswerButton(){
    if(Object.keys(questionsAndAnswers[i].length === 3)){
        let buttonContainer = document.querySelector(".answerContainer");

        let answerButtonWrap = document.createElement("div")
        answerButtonWrap.classList.add("answerButtonWrap")
        answerButtonWrap.innerHTML=`<input class="checked" type="radio" name="trueFalse" id="${questionsAndAnswers[0].a}" value="${questionsAndAnswers[0].a}">
                    <label class="label" for="${questionsAndAnswers[0].a}"><span>${questionsAndAnswers[0].a}</span></label>`
        console.log(answerButtonWrap.innerHTML);
        
        buttonContainer.append(answerButtonWrap);
    }
}

createAnswerButton();

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

createNewQuestion(questionsAndAnswers[i].question);

