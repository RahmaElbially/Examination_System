// Timer
let time = document.querySelector(".time").textContent;
let timeArr = time.split(":").map(Number);
let [minutes , seconds] = timeArr;
const intervalId = setInterval(function(){
    if(seconds === 0){
        if(minutes === 0){
            clearInterval(intervalId);
            document.querySelector(".time").textContent="Time up";
            saveUserProgress();
            location.replace("timeOut.html");
            return;
        }
        minutes -= 1;
        seconds = 60;
    }
    seconds -= 1;
    let formateTime=`${String(minutes).padStart(2,0)}:${String(seconds).padStart(2,0)}`;
    document.querySelector(".time").textContent=formateTime;
},1000);


// Declare Variabels
let questionsDiv = document.querySelector(".question");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let submitBtn = document.getElementById("submit");
let firstNum = document.querySelector(".first-num");
let currentQuestionIndex = 0; 
let data;
let correctdAnswers = 0;
let inCorrectdAnswers = 0;
let selectedAnswers = {};
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Random Questions 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

// Fetsch Questions
async function fetchData() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        data = await response.json(); 
        const shuffledQuestions = shuffleArray(data.questions);
        showQuestion(currentQuestionIndex, shuffledQuestions); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showQuestion(index) {
    questionsDiv.innerHTML = "";
    const question = data.questions[index];
    const p = document.createElement("p");
    p.innerHTML = `${question.questionTitle} <i class="fa-solid fa-flag"></i>`;
    p.classList.add("question-title");
    questionsDiv.appendChild(p);

    const ul = document.createElement("ul");
    ul.classList.add("options");

    question.answers.forEach((answer) => {
        const li = document.createElement("li");
        li.textContent = answer.option;
        ul.appendChild(li);

        li.addEventListener("click", () => {
            const allLis = ul.querySelectorAll("li");
            allLis.forEach(li => li.style.cssText = "");
            li.style.cssText = "background-color: #cedcc5; font-weight: bold; color: #fff"
            selectedAnswers[index] = answer.id;
        });
    });
    questionsDiv.appendChild(ul);
}

fetchData();

// Save User Progress
function saveUserProgress() {
    correctdAnswers = 0;
    inCorrectdAnswers = 0;

    data.questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswerId) {
            correctdAnswers++;
        } else {
            inCorrectdAnswers++;
        }
    });

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
    const currentUserIndex = users.findIndex(user => user.email === currentUserEmail);

    if (currentUserIndex !== -1) {
        users[currentUserIndex].correctAnswers = correctdAnswers;
        users[currentUserIndex].incorrectAnswers = inCorrectdAnswers;
        localStorage.setItem('users', JSON.stringify(users)); 
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.correctAnswers = correctdAnswers;
    currentUser.incorrectAnswers = inCorrectdAnswers;
    localStorage.setItem("currentUser", JSON.stringify(currentUser)); 
}

// Next Button
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < data.questions.length - 1) {
        currentQuestionIndex++; 
        firstNum.textContent = currentQuestionIndex + 1;
        showQuestion(currentQuestionIndex); 
    } 
});

// Previous Button
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--; 
        firstNum.textContent = currentQuestionIndex + 1;
        showQuestion(currentQuestionIndex); 
    } 
});


// Submit Button
submitBtn.addEventListener("click",()=>{
    saveUserProgress();
    location.replace("grade.html");
});