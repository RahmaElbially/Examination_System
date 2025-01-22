// Inputs
let firstNameInput = document.querySelector(".first-name input");
let lastNameInput = document.querySelector(".last-name input");
let emailInput = document.querySelector(".email input");
let passwordInput = document.querySelector(".password input");
let confirmPasswordInput = document.querySelector(".confirm-password input");

// Errors
let firstNameError = document.getElementById("first-name-error");
let lastNameError = document.getElementById("last-name-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let confirmPasswordError = document.getElementById("confirm-password-error");

// Submit Button
let submitBtn = document.querySelector("input[type='submit']");

// Inputs Event
firstNameInput.addEventListener('keydown',namesReg);
lastNameInput.addEventListener('keydown',namesReg);
emailInput.addEventListener('input',emailReg);
passwordInput.addEventListener('input', () => {
    if (passwordInput.value !== "") {
        passwordError.style.visibility = "hidden";
        passwordInput.style.boxShadow = "1px 1px 10px #aaa";
    }
});
confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value !== "") {
        confirmPasswordError.style.visibility = "hidden";
        confirmPasswordInput.style.boxShadow = "1px 1px 10px #aaa";
    }
});

// Submit Button Event 
submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    firstNameReq();
    lastNameReq();
    emailReq();
    passwordReq();
    confirmPasswordReq();
    if (
        firstNameError.style.visibility === "hidden" &&
        lastNameError.style.visibility === "hidden" &&
        emailError.style.visibility === "hidden" &&
        passwordError.style.visibility === "hidden" &&
        confirmPasswordError.style.visibility === "hidden"
    ){
        location.replace("signIn.html");
        localStorage.setItem("firstName",firstNameInput.value);
        localStorage.setItem("lastName",lastNameInput.value);
        localStorage.setItem("email",emailInput.value);
        localStorage.setItem("password",passwordInput.value);
    }
})

// FirstName and LastName Reg Expression Function 
function namesReg(e){
    const inputField = e.target; 
    const errorField = inputField.nextElementSibling;
    let isChar = /^[A-Z a-z]$/.test(e.key);
    let isControlKey = e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Delete";
    if (!isChar && !isControlKey) {
        e.preventDefault(); 
        errorField.style.visibility = "visible"; 
        errorField.textContent = "This Field Accept Characters Only"; 
        inputField.style.boxShadow = "0px 0px 10px #f00"; 
    } else {
        errorField.style.visibility = "hidden"; 
        inputField.style.boxShadow = "1px 1px 10px #aaa";
    }
}

// Email Reg Expression Function
function emailReg(){
    let emailValue = emailInput.value; 
    let isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
    if(!isEmail){
        emailError.style.visibility = "visible";
        emailError.textContent = "This Is Invalid Email";
        emailInput.style.boxShadow = "0px 0px 10px #f00";
    }else{
        emailError.style.visibility = "hidden";
        emailInput.style.boxShadow = "1px 1px 10px #aaa";
    }
}


// Reqired Functions 
function firstNameReq(){
    if(firstNameInput.value === ""){
        firstNameError.style.visibility = "visible";
        firstNameError.textContent = "This Field Is Required";
        firstNameInput.style.boxShadow = "0px 0px 10px #f00";
    }else{
        firstNameError.style.visibility = "hidden";
        firstNameInput.style.boxShadow = "1px 1px 10px #aaa";
    }
}

function lastNameReq(){
    if(lastNameInput.value === ""){
        lastNameError.style.visibility = "visible";
        lastNameError.textContent = "This Field Is Required";
        lastNameInput.style.boxShadow = "0px 0px 10px #f00";
    }else{
        lastNameError.style.visibility = "hidden";
        lastNameInput.style.boxShadow = "1px 1px 10px #aaa";
    }
}

function emailReq(){
    if(emailInput.value === ""){
        emailError.style.visibility = "visible";
        emailError.textContent = "This Field Is Required";
        emailInput.style.boxShadow = "0px 0px 10px #f00";
    }else{
        emailError.style.visibility = "hidden";
        emailInput.style.boxShadow = "1px 1px 10px #aaa";
    }
}

function passwordReq(){
    if(passwordInput.value === ""){
        passwordError.style.visibility = "visible";
        passwordError.textContent = "This Field Is Required";
        passwordInput.style.boxShadow = "0px 0px 10px #f00";
    }else if(passwordInput.value.length < 9){
        passwordError.style.visibility = "visible";
        passwordError.textContent = "Password Must Be Greater Than 8";
        passwordInput.style.boxShadow = "0px 0px 10px #f00";
    }else{
        passwordError.style.visibility = "hidden";
        passwordInput.style.boxShadow = "1px 1px 10px #aaa";
    }
}

function confirmPasswordReq(){
    if(confirmPasswordInput.value === ""){
        confirmPasswordError.style.visibility = "visible";
        confirmPasswordError.textContent = "This Field Is Required";
        confirmPasswordInput.style.boxShadow = "0px 0px 10px #f00";
    }else if(confirmPasswordInput.value !== passwordInput.value){
        confirmPasswordError.style.visibility = "visible";
        confirmPasswordError.textContent = "The 2 Password Are Not Identical";
        confirmPasswordInput.style.boxShadow = "0px 0px 10px #f00";
    }else{
        confirmPasswordError.style.visibility = "hidden";
        confirmPasswordInput.style.boxShadow = "1px 1px 10px #aaa";
    }
}