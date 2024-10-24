const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.TryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const progressValue = document.querySelector('.progress-value');





// Start Quiz Popup
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');

}

// Exit Popup
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');

}

// Continue to Quiz
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

// Go Home Button
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active')

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

}

// Try Again Button
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active')

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();



}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Next Button
const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');


    }
    else {
        showResultBox();
    }
}

// Display Questions
const optionList = document.querySelector('.option-list');

// getting questions and options from the array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

        let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
        <div class="option"><span>${questions[index].options[4]}</span></div>`;

        optionList.innerHTML = optionTag;

        const option = document.querySelectorAll('.option');
        for (let i = 0; i < option.length; i++) {
            option[i].setAttribute('onclick', 'optionSelected(this)');
        }
}

// Option Selected Logic
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        // console.log('answer is correct');
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else { // worked on 9/5/24
        // console.log('answer is wrong');
        answer.classList.add('incorrect');

        // if answer incorrect, auto selected correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // Disable all options after user selects
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');

    // console.log(correctAnswer);
}

// Question Counter
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Update Header Score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}


// Show Result Box and Progress Image
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100; // Calculate percentage based on score
    let speed = 20;

    let progress = setInterval(() => {
        // Ensure that progress doesn't go beyond progressEndValue
        if (progressStartValue <= progressEndValue) {
            progressStartValue++;

        // Dynamically update background image based on percentage
        let imagePercentage = Math.floor(progressStartValue / 10) * 10; // Nearest 10 (0, 10, 20, etc.)
        circularProgress.style.backgroundImage = `url('images/progress-${imagePercentage}.png')`;

       // Update percentage text
        progressValue.textContent = `${progressStartValue}%`; // Reflect the progress percentage

        if (progressStartValue === Math.floor(progressEndValue)) {
            clearInterval(progress);
        }
    }}, speed);
}

// Show Result Box and Progress Image

// function showResultBox() {
//     quizBox.classList.remove('active');
//     resultBox.classList.add('active');

//     const scoreText = document.querySelector('.score-text');
//     scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

//     const circularProgress = document.querySelector('.circular-progress');
//     const progressValue = document.querySelector('.progress-value');
//     let progressStartValue = 0;
//     let progressEndValue = 60;
//     let speed = 20;

//     let progress = setInterval(() => {
//         progressStartValue++;
//         // console.log(progressStartValue);
//         progressValue.textContent = `{progressStartValue}%`; // Remove later since you will be using images 
//         if (progressStartValue == progressEndValue) {
//             clearInterval(progress);
//         }
//     }, speed);

// }