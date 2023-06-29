
const quiz = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const answerContainer = document.getElementById('answer-container');
const submit = document.getElementById('submit');
const counterElement = document.getElementById('counter');
const scoreList = document.getElementById('scoreList');

let currentQuiz = parseInt(localStorage.getItem('currentQuiz'));
let score = parseInt(localStorage.getItem('score')) || 0;
let intervalId;
loadQuiz();

function loadQuiz() {
  deselectAnswers();

  if (isNaN(currentQuiz) || currentQuiz >= quizData.length) {
    currentQuiz = 0;
    stopTimer();
    saveScore();
    displayScores();

    quiz.innerHTML = `<h2 class="after_quiz">You answered correctly at ${score}/${quizData.length} questions</h2>
    <div class="gif"></div>
    <button class="quiz-button" onclick="resetQuiz()">Reload</button>`;
    return;
  }

  try {
    const currentQuizData = quizData[currentQuiz];

    questionElement.innerText = currentQuizData.question;
    createAnswerOptions(currentQuizData);

    const savedAnswer = getSavedAnswer(currentQuizData);
    if (savedAnswer) {
      const selectedAnswer = document.getElementById(savedAnswer);
      selectedAnswer.checked = true;
    }
  } catch (error) {
    console.error('An error occurred while loading the quiz:', error);
  }
}

function deselectAnswers() {
  const answerElements = answerContainer.querySelectorAll('.answer');
  answerElements.forEach(function (answerEl) {
    answerEl.checked = false;
  });
}

function createAnswerOptions(currentQuizData) {
  answerContainer.innerHTML = '';
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let i = 0; i < letters.length; i++) {
    const answerLetter = letters[i];
    const answerOption = currentQuizData[answerLetter];
    if (answerOption) {
      const li = document.createElement('li');
      li.className = 'custom-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.id = answerLetter;
      input.className = 'answer';
      const label = document.createElement('label');
      label.htmlFor = answerLetter;
      label.innerText = answerOption;

      li.appendChild(input);
      li.appendChild(label);
      answerContainer.appendChild(li);
    }
  }
}

function getSelected() {
  const answerElements = answerContainer.querySelectorAll('.answer');
  let selectedAnswer = null;
  answerElements.forEach(function (answerEl) {
    if (answerEl.checked) {
      selectedAnswer = answerEl.id;
    }
  });
  return selectedAnswer;
}

    // Theme
    const toggle = document.getElementById('toggle');
    const label = document.querySelector('label[for="toggle"]');
    const body = document.body;
    const currentBackgroundImage = body.style.backgroundImage;
    const timerBlocks = document.getElementsByClassName("timer_block");
    const numbs = document.getElementsByClassName("numb");

    const colors = {
        background: {
          original: 'url("assets/fon.jpg")',
          new: 'url("assets/fon2.jpg")'
        },
        timerBlock: {
          original: '#3cff00',
          new: '#00bfff'
        },
        numb: {
          original: '#ff0000',
          new: '#00bfff'
        }
      };
      document.addEventListener('DOMContentLoaded', function() {
      let toggle = document.getElementById('toggle');
      toggle.addEventListener("click", function() {
        if (this.checked) {
          body.style.backgroundImage = colors.background.new;
          label.classList.add('active');
          for (let k = 0; k < timerBlocks.length; k++) {
            timerBlocks[k].style.backgroundColor = colors.timerBlock.new;
          }
          for (let l = 0; l < numbs.length; l++) {
            numbs[l].style.backgroundColor = colors.numb.new;
          }
          localStorage.setItem("backgroundImage", colors.background.new);
          localStorage.setItem("timerBlockColor", colors.timerBlock.new);
          localStorage.setItem("numbColor", colors.numb.new);
        } else {
          body.style.backgroundImage = colors.background.original;
          label.classList.remove('active');
          for (let i = 0; i < timerBlocks.length; i++) {
            timerBlocks[i].style.backgroundColor = colors.timerBlock.original;
          }
          for (let j = 0; j < numbs.length; j++) {
            numbs[j].style.backgroundColor = colors.numb.original;
          }
          localStorage.setItem("backgroundImage", colors.background.original);
          localStorage.setItem("timerBlockColor", colors.timerBlock.original);
          localStorage.setItem("numbColor", colors.numb.original);
        }
      
        
        localStorage.setItem('toggleState', this.checked);
      });
      
    
    window.addEventListener('load', function() {
        const toggleState = localStorage.getItem('toggleState');
        if (toggleState === 'true') {
            toggle.checked = true;
        } else {
            toggle.checked = false;
        }
    });
  }); 


    // Timer
    
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
      const timerElement = document.getElementById('timer');
      timerElement.textContent = '';
      clearInterval(intervalId);
    }

    // Local Storage
    function saveScore(answer) {
        try {
            const currentQuizData = quizData[currentQuiz];
        
            if (currentQuizData) {
              const question = currentQuizData.question;
        
              let savedScores = JSON.parse(localStorage.getItem('scores')) || [];
              const scoreData = {
                question: question,
                answer: answer,
              };
        
              savedScores[currentQuiz] = scoreData;
        
              localStorage.setItem('scores', JSON.stringify(savedScores));
            }
          } catch (error) {
            console.error('An error occurred while saving the score:', error);
          }
        }

    function displayScores() {
        try {
            const savedScores = localStorage.getItem('scores');
            if (savedScores) {
              const scores = JSON.parse(savedScores);
        
              scoreList.innerHTML = '';
              scores.forEach(function (score) {
                const listItem = document.createElement('li');
                listItem.innerText = 'Question: ' + score.question + ' - Answer: ' + score.answer;
                scoreList.appendChild(listItem);
              });
            }
          } catch (error) {
            console.error('An error occurred while displaying scores:', error);
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
            try {
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
          
                counterElement.textContent = currentQuiz + 1;
          
                displayScores();
              }
            } catch (error) {
              console.error('An error occurred while processing the answer:', error);
              
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
