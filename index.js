const quizData = [
    {
        question: "How many planets are in the solar system?",
        a: "8",
        b: "9",
        c: "10",
        correct: "a",
    },
    {
        question: "What is the freezing point of water?",
        a: "0",
        b: "-5",
        c: "6",
        correct: "a",
    },
    {
        question: "What is the longest river in the world?",
        a: "Nile",
        b: "Amazon",
        c: "Yangtze",
        correct: "b",
    },
    {
        question: "How many chromosomes are in the human genome?",
        a: "42",
        b: "44",
        c: "46",
        correct: "c",
    },
    {
        question: "What is the capital of Canada?",
        a: "Toronto",
        b: "Ottawa",
        c: "Vancouver",
        correct: "b",
    },
    {
        question: "What is the Jewish New Year called?",
        a: "Hanukkah",
        b: "Yom Kippur",
        c: "Kwanzaa",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_answer = document.getElementById('a_answer');
const b_answer = document.getElementById('b_answer');
const c_answer = document.getElementById('c_answer');
const submit = document.getElementById('submit');
const counterElement = document.getElementById('counter');
const scoreList = document.getElementById('scoreList');

let currentQuiz = parseInt(localStorage.getItem('currentQuiz'));
let score = parseInt(localStorage.getItem('score')) || 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    if (currentQuiz === null || currentQuiz >= quizData.length) {
        currentQuiz = 0;
        stopTimer();
        saveScore();
        displayScores();
        quiz.innerHTML = `<h2 class="after_quiz">You answered correctly at ${score}/${quizData.length} questions</h2>
        <img class="gif" src="assets/final_test_korgi.gif">
        <button class="quiz-button" onclick="resetQuiz()">Reload</button>`;
        return;
    }

    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_answer.innerText = currentQuizData.a;
    b_answer.innerText = currentQuizData.b;
    c_answer.innerText = currentQuizData.c;

    const savedAnswer = getSavedAnswer(currentQuizData);
    if (savedAnswer) {
        const selectedAnswer = document.getElementById(savedAnswer);
        selectedAnswer.checked = true;
    }
}

function deselectAnswers() {
    answerElements.forEach(function (answerEl) {
        answerEl.checked = false;
    });
}

function getSelected() {
    let answer;

    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

// Theme
const changeBackgroundBtn = document.getElementById("changeBackgroundBtn");
const originalBackgroundImage = 'url("assets/fon.jpg")';
const newBackgroundImage = 'url("assets/fon2.jpg")';
const originalTimerBlockColor = '#3cff00';
const originalNumbColor = '#ff0000';

changeBackgroundBtn.addEventListener("click", function() {
    const body = document.body;
    const currentBackgroundImage = body.style.backgroundImage;
    const timerBlocks = document.getElementsByClassName("timer_block");
    const numbs = document.getElementsByClassName("numb");

    if (currentBackgroundImage === newBackgroundImage) {
        body.style.backgroundImage = originalBackgroundImage;
        for (let i = 0; i < timerBlocks.length; i++) {
            timerBlocks[i].style.backgroundColor = originalTimerBlockColor;
        }
        for (let j = 0; j < numbs.length; j++) {
            numbs[j].style.backgroundColor = originalNumbColor;
        }
        localStorage.setItem("backgroundImage", originalBackgroundImage);
        localStorage.setItem("timerBlockColor", originalTimerBlockColor);
        localStorage.setItem("numbColor", originalNumbColor);
    } else {
        body.style.backgroundImage = newBackgroundImage;
        for (let k = 0; k < timerBlocks.length; k++) {
            timerBlocks[k].style.backgroundColor = '#00bfff';
        }
        for (let l = 0; l < numbs.length; l++) {
            numbs[l].style.backgroundColor = '#00bfff';
        }
        localStorage.setItem("backgroundImage", newBackgroundImage);
        localStorage.setItem("timerBlockColor", '#00bfff');
        localStorage.setItem("numbColor", '#00bfff');
    }
});
// Timer
let intervalId;
let duration = 10;

function startTimer(duration, callback) {
    const timerElement = document.getElementById('timer');

    intervalId = setInterval(function() {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;

        let timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        timerElement.textContent = timeString;

        if (duration <= 0) {
            clearInterval(intervalId);
            callback();
        }

        duration--;
    }, 1000);
}

function timerCallback() {
    const result = confirm("Time over");
    if (result == true) {
        duration = 0;
    } else {
        location.reload();
    }
}

function restartTimer() {
    clearInterval(intervalId);
    duration = 10;
    startTimer(duration, timerCallback);
}

window.onload = function() {
    startTimer(duration, timerCallback);
};

function stopTimer() {
    var timerElement = document.getElementById('timer');
    timerElement.textContent = '';
    clearInterval(intervalId);
}

// Local Storage
function saveScore(answer) {
    const currentQuizData = quizData[currentQuiz];
    
    if (currentQuizData) {
        const question = currentQuizData.question;

        let savedScores = JSON.parse(localStorage.getItem("scores")) || [];
        const scoreData = {
            question: question,
            answer: answer
        };

        savedScores[currentQuiz] = scoreData; 

        localStorage.setItem("scores", JSON.stringify(savedScores));
    }
}

function displayScores() {
    const savedScores = localStorage.getItem("scores");
    if (savedScores) {
        const scores = JSON.parse(savedScores);

        scoreList.innerHTML = ""; 
        scores.forEach(function (score) {
            const listItem = document.createElement("li");
            listItem.innerText = "Question: " + score.question + " - Answer: " + score.answer;
            scoreList.appendChild(listItem);
        });
    }
}
function getSavedAnswer(currentQuizData) {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
        const scores = JSON.parse(savedScores);
        const scoreData = scores[currentQuiz];
        if (scoreData && scoreData.question === currentQuizData.question) {
            return scoreData.answer;
        }
    }
    return null;
}
    

function getSelectedAnswer(currentQuizData) {
    let selectedAnswer = "";

    answerElements.forEach(function (answerEl) {
        if (answerEl.checked) {
            if (answerEl.id === "a_answer") {
                selectedAnswer = currentQuizData.a;
            } else if (answerEl.id === "b_answer") {
                selectedAnswer = currentQuizData.b;
            } else if (answerEl.id === "c_answer") {
                selectedAnswer = currentQuizData.c;
            }
        }
    });

    return selectedAnswer;
}



submit.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        const currentQuizData = quizData[currentQuiz];

        if (currentQuizData && answer === currentQuizData.correct) {
            if (duration <= 0) {
                score = score;
            } else {
                score++;
            }
        }

        saveScore(answer);

        currentQuiz++;

        restartTimer();

        loadQuiz();

        counterElement.textContent = currentQuiz;

        displayScores();
    }
});

window.onbeforeunload = function () {
    localStorage.setItem('currentQuiz', currentQuiz);
    localStorage.setItem('score', score); 
};

function resetQuiz() {
    localStorage.removeItem('currentQuiz');
    localStorage.removeItem('score');
    localStorage.removeItem('scores');
    score = 0; 
    location.reload();
}

window.onload = function() {
    startTimer(duration, timerCallback);
    restoreBackgroundState();
};

function restoreBackgroundState() {
    const body = document.body;
    const savedBackgroundImage = localStorage.getItem("backgroundImage");
    const savedTimerBlockColor = localStorage.getItem("timerBlockColor");
    const savedNumbColor = localStorage.getItem("numbColor");

    if (savedBackgroundImage) {
        body.style.backgroundImage = savedBackgroundImage;
    }
    if (savedTimerBlockColor) {
        const timerBlocks = document.getElementsByClassName("timer_block");
        for (let i = 0; i < timerBlocks.length; i++) {
            timerBlocks[i].style.backgroundColor = savedTimerBlockColor;
        }
    }
    if (savedNumbColor) {
        const numbs = document.getElementsByClassName("numb");
        for (let i = 0; i < numbs.length; i++) {
            numbs[i].style.backgroundColor = savedNumbColor;
        }
    }
}

