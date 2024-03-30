// Number of Question 
let time = document.querySelector(".time");
let quesOne = document.querySelector(".question-one");
let numQuestion = document.querySelector(".question-one .one");
let allNumQuestion = document.querySelector(".question-one .two");
let question = document.querySelector(".question");
let chooseAnswer = document.querySelector(".choose form");
let submitButton = document.querySelector(".choose .submit");
let myNumQues = document.querySelector(".num-question");
let queSpan = document.querySelector(".num-question p span");
let infos = document.querySelector(".info");
let myInfoPara = document.querySelector(".info p span");
let myProgress = document.querySelector(".info .states .progress");
let timeDown = document.querySelector(".time span");


let currentIndex = 0;

let currctAnswer = 0;

let index = 1;

let CountIntervel;

// Create Api function 
function getData() {

    let jsonData = new XMLHttpRequest();

    jsonData.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            let responseData = JSON.parse(this.response);
            let qCount = responseData.length;


            // create question and answer
            questionandAnswer(responseData[currentIndex], qCount);

            // Create CountDown Function 
            cownDown(30, qCount);

            // Create Check Answer Function 
            submitButton.onclick = function () {
                let rightAnswer = responseData[currentIndex]["right-answer"];

                // Increase Count Number
                currentIndex++;

                // Create CountDown Function 
                clearInterval(CountIntervel);
                cownDown(30, qCount);

                // Checked Answer Function
                checkedAnswer(rightAnswer, qCount);


                // remove previous question and answers 
                question.innerHTML = "";
                chooseAnswer.innerHTML = "";

                // Add New Question and Answers
                questionandAnswer(responseData[currentIndex], qCount);

                // number of question scope
                ++index;
                numQuestion.innerHTML = index;


                progress(index);

                // Show Resulte
                showResulte(qCount);
            }


        }
    }


    jsonData.open("GET", "./main.json", true);
    jsonData.send();

}
getData();

function questionandAnswer(obj, count) {

    if (currentIndex < count) {
        // all of question number 
        allNumQuestion.innerHTML = count;

        // Create Question element h2
        let quesH2 = document.createElement("h2");

        // Create Question Element Text 
        let quesH2Text = document.createTextNode(obj.Question);

        // Add Question text and h2
        quesH2.appendChild(quesH2Text);

        question.appendChild(quesH2);

        // Creat Answer 

        for (let i = 1; i <= 4; i++) {

            // CREATE MAIN DIV
            let mainDiv = document.createElement("div");


            // Create Answer Input + label
            let inputvalue = document.createElement("input");

            // Add type + name + id + dataAtrribute To Input
            inputvalue.name = "question";
            inputvalue.type = "radio";
            inputvalue.id = `answer_${i}`;
            inputvalue.dataset.answer = obj[`answer-${i}`];

            // Add text In Input 
            let inputText = document.createTextNode(obj[`answer-${i}`]);
            inputvalue.appendChild(inputText);

            // Label 
            let label = document.createElement("label");

            // Add [for] In Label
            label.htmlFor = `answer_${i}`;

            // create Text in Label
            let labelText = document.createTextNode(obj[`answer-${i}`]);

            // add text label in label
            label.appendChild(labelText);


            // Add Input and Label and Submit in Main Div
            mainDiv.appendChild(inputvalue);
            mainDiv.appendChild(label);

            // Add ALL Dives And Form In Choose Answer 
            chooseAnswer.appendChild(mainDiv);

        }
    }
}



function checkedAnswer(rAnswer, qNumber) {
    let answersCheck = document.getElementsByName("question");
    let AnswerisChoose;

    for (let i = 0; i < answersCheck.length; i++) {
        if (answersCheck[i].checked) {
            AnswerisChoose = answersCheck[i].dataset.answer;
        }
    }



    if (rAnswer === AnswerisChoose) {
        currctAnswer++;
        queSpan.innerHTML = currctAnswer;
    }

}

function progress(increas) {

    myInfoPara.innerHTML = --increas * 10;
    myProgress.style.width = `${increas * 10}%`;

}

function showResulte(count) {
    if (currentIndex === count) {
        time.remove();
        quesOne.remove();
        question.remove();
        submitButton.remove();



        // Create if to Choose Answers
        if (currctAnswer === count) {
            let quesPerfect = document.querySelector(".num-question .perfect");
            quesPerfect.innerHTML = "Perfect";
            quesPerfect.style = "color: #00a4ff"
            myNumQues.style = "display: flex; align-items: center; gap: 20px; justify-content: center; height: 200px;";
            let myParaQues = document.querySelector(".num-question p");
            myParaQues.style = "font-size: 22px; font-weight: bold";
            let choosePar = document.querySelector(".choose");
            choosePar.style = "margin: 100px auto";
        } else if (currctAnswer < count && currctAnswer >= (count * (70 / 100))) {
            let quesPerfect = document.querySelector(".num-question .perfect");
            quesPerfect.innerHTML = "Good";
            quesPerfect.style = "color: #6eff6d";
            myNumQues.style = "display: flex; align-items: center; gap: 20px; justify-content: center; height: 200px;";
            let myParaQues = document.querySelector(".num-question p");
            myParaQues.style = "font-size: 22px; font-weight: bold";
            let choosePar = document.querySelector(".choose");
            choosePar.style = "margin: 100px auto";
        } else if (currctAnswer >= (count / 2) && currctAnswer <= (count * (60 / 100))) {
            let quesPerfect = document.querySelector(".num-question .perfect");
            quesPerfect.innerHTML = "Not Bad";
            quesPerfect.style = "color: #ffe58e";
            myNumQues.style = "display: flex; align-items: center; gap: 20px; justify-content: center; height: 200px;";
            let myParaQues = document.querySelector(".num-question p");
            myParaQues.style = "font-size: 22px; font-weight: bold";
            let choosePar = document.querySelector(".choose");
            choosePar.style = "margin: 100px auto";
        } else {
            let quesPerfect = document.querySelector(".num-question .perfect");
            quesPerfect.innerHTML = "Bad";
            quesPerfect.style = "color: #ff0000";
            myNumQues.style = "display: flex; align-items: center; gap: 20px; justify-content: center; height: 200px;";
            let myParaQues = document.querySelector(".num-question p");
            myParaQues.style = "font-size: 22px; font-weight: bold";
            let choosePar = document.querySelector(".choose");
            choosePar.style = "margin: 100px auto";
        }
    }
}

// Create CountDown Function 
function cownDown(time, qCount) {
    if (currentIndex < qCount) {
        CountIntervel = setInterval(function () {

            timeDown.innerHTML = time -= 1;

            if (time === 0) {
                clearInterval(CountIntervel);

                submitButton.click();
            }
        }, 1000);

    }
}

