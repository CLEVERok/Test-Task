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


let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz(){
    deselectAnswers();
    
    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    a_answer.innerText = currentQuizData.a;
    b_answer.innerText = currentQuizData.b;
    c_answer.innerText = currentQuizData.c;
}

function deselectAnswers() {
    answerElements.forEach(function(answerEl) {
      answerEl.checked = false;
    });
  };
function getSelected(){
    let answer;

    answerElements.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submit.addEventListener('click', () => {
    const answer = getSelected();

    if(answer){
        if(answer === quizData[currentQuiz].correct){
            score++;
        }
        
        currentQuiz++;
        
        
        if(currentQuiz < quizData.length){
            loadQuiz();
        }
        else{
            currentQuiz--;
            quiz.innerHTML = `<h2 class="after_quiz">You answered coreectly at ${score}/${quizData.length} questions</h2>
            <img clas="gif" src="assets/final_test_korgi.gif">
            <button class="quiz-button" onclick="location.reload()">Reload</button>
            `;
        }
        counterElement.textContent = currentQuiz + 1;
    }
});