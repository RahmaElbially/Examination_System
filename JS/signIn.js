let loginEmail =document.querySelector("#loginEmail")
let loginPass =document.querySelector("#loginPass")
let login =document.querySelector("#login")
let emailErr=document.querySelector(".emailErr")
let passErr=document.querySelector(".passErr")
let subErr=document.querySelector(".subErr")
let eyeIcon =document.querySelector(".pas i")

const users = JSON.parse(localStorage.getItem("users")) || [];

loginEmail.addEventListener('input',emailCheck);
loginPass.addEventListener('input',passCheck);

login.addEventListener("click" , function(e){
    e.preventDefault();
    emailCheck();
    passCheck();
    let checked = true;
    if(loginEmail.value === ""){
        emailErr.style.visibility = "visible";
        emailErr.textContent = "This Field Is Required";
        checked = false;
        loginEmail.style.boxShadow = "0px 0px 10px #f00"
        eyeIcon.style.lineHeight = "1"
    }
    else{
        emailErr.style.visibility = "hidden";
        loginEmail.style.boxShadow = "1px 1px 10px #aaa"
    }

    
    if(loginPass.value === ""){
        passErr.style.visibility = "visible";
        passErr.textContent = "This Field Is Required";
        checked = false;
        loginPass.style.boxShadow = "0px 0px 10px #f00"
        eyeIcon.style.lineHeight = "1"
    }else {
        passErr.style.visibility = "hidden";
        loginPass.style.boxShadow = "1px 1px 10px #aaa"
    }

    if(checked){
        const user = users.find(user => user.email === loginEmail.value);
        if(user){
            if (user.password === loginPass.value) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                location.replace("startExam.html");
            } else {
                passErr.style.visibility = "visible";
                passErr.textContent = "This Password/Email Is Wrong";
                loginPass.style.boxShadow = "0px 0px 10px #f00";
                loginEmail.style.boxShadow = "0px 0px 10px #f00";
            } 
        } 
        else {
            passErr.style.visibility = "visible";
            passErr.textContent = "This Password/Email Is Wrong";
            loginEmail.style.boxShadow = "0px 0px 10px #f00";
            loginPass.style.boxShadow = "0px 0px 10px #f00";
        }
    }
})

function emailCheck(){
    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginEmail.value)){
        emailErr.style.visibility = "visible";
        emailErr.textContent = "Please Enter Valid Email";
        checked = false;
        loginEmail.style.boxShadow = "0px 0px 10px #f00";
        eyeIcon.style.lineHeight = "1";
    } else{
        emailErr.style.visibility = "hidden";
        loginEmail.style.boxShadow="1px 1px 10px #aaa"
    }
}

function passCheck(){
    const regExpPass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    if(!(loginPass.value.length >= 8) ){
        passErr.style.visibility = "visible";
        passErr.textContent = "Password Must Be Greater Than Or Equal 8";
        checked = false;
        loginPass.style.boxShadow = "0px 0px 10px #f00";
        eyeIcon.style.lineHeight = "1;"
    }
    else{
        passErr.style.visibility = "hidden";
        loginPass.style.boxShadow = "1px 1px 10px #aaa";
    }
}


const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPass");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});