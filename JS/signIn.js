let loginEmail =document.querySelector("#loginEmail")
let loginPass =document.querySelector("#loginPass")
let login =document.querySelector("#login")

let emailErr=document.querySelector(".emailErr")
let passErr=document.querySelector(".passErr")
let subErr=document.querySelector(".subErr")

let eyeIcon =document.querySelector(".pas i")

const users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users)

login.addEventListener("click" , function(e){
    e.preventDefault();
    emailCheck();
    passCheck();
    let checked =true;
    if(loginEmail.value==""){
        emailErr.textContent="Required";
        checked=false;
        loginEmail.style.boxShadow="0px 0px 10px #f00"
        eyeIcon.style.lineHeight="1"
    }
    else{
        emailErr.textContent="";
        loginEmail.style.boxShadow="1px 1px 10px #aaa"
    }

    
    if(loginPass.value==""){
        passErr.textContent="Required"
        checked=false;
        loginPass.style.boxShadow="0px 0px 10px #f00"
        eyeIcon.style.lineHeight="1"
    }else {
            passErr.textContent="";
            loginPass.style.boxShadow="1px 1px 10px #aaa"
    }

    if(checked){
        let userFound = false;
        for (let i = 0; i < users.length; i++) {
            if (loginEmail.value === users[i].email) {
                if (loginPass.value === users[i].password) {
                    userFound = true;
                    localStorage.setItem("currentUser", JSON.stringify(users[i])); 
                    location.replace("startExam.html"); 
                    break;
                } else {
                    passErr.textContent = "Wrong password";
                    loginPass.style.boxShadow="0px 0px 10px #f00";
                    eyeIcon.style.lineHeight="1"
                    break;
                }
            }else{
                emailErr.textContent = "Wrong Email";
             loginEmail.style.boxShadow="0px 0px 10px #f00";
            }
        }
        // if (!userFound) {
        //     // emailErr.textContent = "Wrong Email";
        //     // loginEmail.style.boxShadow="0px 0px 10px #f00";
        // }
    }
})

function emailCheck(){
    loginEmail.addEventListener("input" , function(){
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginEmail.value)){
          emailErr.textContent="please enter valid email"
          checked=false;
          loginEmail.style.boxShadow="0px 0px 10px #f00"
          eyeIcon.style.lineHeight="1"
      }else{
        emailErr.textContent="";
        loginEmail.style.boxShadow="1px 1px 10px #aaa"
    }
    })
}
function passCheck(){
const  regExpPass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
    loginPass.querySelector("input",function(){
            if(!(loginPass.value.length>=8) ){
                passErr.textContent="please enter 8 digit"
                checked=false;
                loginPass.style.boxShadow="0px 0px 10px #f00"
                eyeIcon.style.lineHeight="1"
            }
            else{
                passErr.textContent="";
                loginPass.style.boxShadow="1px 1px 10px #aaa"
            }
    })
}


const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("loginPass");

togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});