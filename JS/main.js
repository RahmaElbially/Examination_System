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
    let formateTime= `${String(minutes).padStart(2,0)}:${String(seconds).padStart(2,0)}`;
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
    const body = document.querySelector("body");
    const container = document.querySelector(".container");

    // Loading
    const loadingIndicator = document.createElement("div");
    loadingIndicator.classList.add("loading");
    body.insertBefore(loadingIndicator, container);

    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            container.style.display = "none";
            loadingIndicator.remove();
            var dataError = document.createElement("h2");
            dataError.classList.add("data-error");
            dataError.textContent = "There Is a Problem When getting Data !";
            body.appendChild(dataError);
            return;
        }
        data = await response.json(); 
        loadingIndicator.remove();
        const shuffledQuestions = shuffleArray(data.questions);
        showQuestion(currentQuestionIndex, shuffledQuestions); 
    } catch (error) {
        dataError.textContent = `Error fetching data:', ${error}`;
    }
}


function showQuestion(index) {
    questionsDiv.innerHTML = "";
    const question = data.questions[index];
    const p = document.createElement("p");
    p.innerHTML = `${question.questionTitle} <i class="fa-solid fa-flag flag"></i>`;
    p.classList.add("question-title");
    questionsDiv.appendChild(p);

    const ul = document.createElement("ul");
    ul.classList.add("options");

    question.answers.forEach((answer) => {
        const li = document.createElement("li");
        li.textContent = answer.option;
        ul.appendChild(li);

        if (selectedAnswers[index] === answer.id) {
            li.style.cssText = "background-color: #8bc5bac5; font-weight: bold; color: #fff";
        }

        li.addEventListener("click", () => {
            const allLis = ul.querySelectorAll("li");
            allLis.forEach(li => li.style.cssText = "");
            li.style.cssText = "background-color: #8bc5bac5; font-weight: bold; color: #fff"
            selectedAnswers[index] = answer.id;
        });
    });
    questionsDiv.appendChild(ul);
    ////flag////
    let flag =document.querySelector(".flag")
    let flagQues=document.querySelector(".flag-content")
    flag.addEventListener("click" , function () {
        let checked=true;
        let self=this;
        document.querySelectorAll(".flag_para").forEach(function(q){ 
          if(self.parentElement.textContent==q.textContent){
            checked=false;
        }       
    })
    if(checked){
        flagQues.innerHTML+=`<div class="question toggle flaged d-flex  justify-content-between align-items-center mt-4">
      <p class="flaged flag_para">${this.parentNode.textContent}</p>  <i class="fa-solid fa-trash trash"></i> 
    </div>`
        this.style.color="yellow"
        console.log(this.parentElement);
        }
    })
    function updateColor(){
        let flag_para =document.querySelectorAll(".flag_para") 
        let isflagged=false
        flag_para.forEach(function(q){ 
            if(flag.parentElement.textContent==q.textContent){
              isflagged=true;
              console.log(flag_para);
            }
          } )
          if(isflagged){
            flag.style.color="yellow"
          }else{
            flag.style.color=""
          }

    }
    updateColor()
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

// flag
let flagQues=document.querySelector(".flag-content")
flagQues.addEventListener("click" , function(e){
    if(e.target.classList.contains("trash")){
        e.target.parentElement.remove();
        // e.target.parentElement.classList.remove(".toggle")
        updateColor();
    }else if(e.target.classList.contains("flaged")){
        let clickedText=e.target.textContent.trim()
        let matched=data.questions.find(q=>q.questionTitle==clickedText)
        if(matched){
             currentQuestionIndex =data.questions.findIndex((q)=>q.questionTitle==clickedText)
        }
        firstNum.textContent=currentQuestionIndex +1
        showQuestion(currentQuestionIndex)
    }
})