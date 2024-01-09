const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time');
const endScreenElement = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');
const initialsInputElement = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score-btn');

let shuffledQuestions, currentQuestionIndex;
let quizTimer = 60;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
saveScoreButton.addEventListener('click', saveScore);

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timerElement.textContent = quizTimer;
    const timerId = setInterval(() => {
        quizTimer--;
        timerElement.textContent = quizTimer;
        if (quizTimer <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        quizTimer = 0; // End the quiz
    }
    if (!correct) {
        quizTimer -= 10; // Subtract time for wrong answers
        if (quizTimer < 0) quizTimer = 0;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endGame() {
    questionContainerElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    finalScoreElement.textContent = quizTimer;
}

function saveScore() {
    const initials = initialsInputElement.value;
    alert('Score saved!');
}

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyperlinks and Text Markup Language', correct: false },
            { text: 'Home Tool Markup Language', correct: false },
            { text: 'Hyper Tool Markup Language', correct: false }
        ]
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: [
            { text: 'onchange', correct: false },
            { text: 'onclick', correct: true },
            { text: 'onmouseover', correct: false },
            { text: 'onmouseclick', correct: false }
        ]
    },
];


