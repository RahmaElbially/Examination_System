let loginEmail =document.querySelector("#loginEmail")
let loginPass =document.querySelector("#loginPass")
let login =document.querySelector("#login")

let emailErr=document.querySelector(".emailErr")
let passErr=document.querySelector(".passErr")
let subErr=document.querySelector(".subErr")

console.log(loginEmail);
console.log(loginPass);
console.log(login);
console.log(emailErr);
console.log(passErr);
console.log(subErr);



login.addEventListener("click" , function(e){
    e.preventDefault();
    let checked =true;


        if(loginEmail.value==""){
            emailErr.textContent="Required";
            checked=false;
            loginEmail.style.boxShadow="0px 0px 10px #f00"
        }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginEmail.value)){
            emailErr.textContent="please enter valid email"
            checked=false;
            loginEmail.style.boxShadow="0px 0px 10px #f00"
        }
        else{
            emailErr.textContent="";
        }
    
    const  regExpPass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

    if(loginPass.value==""){
        passErr.textContent="Required"
        checked=false;
        loginPass.style.boxShadow="0px 0px 10px #f00"
    }else {
        if(!(loginPass.value.length>=8) ){
        passErr.textContent="please enter 8 digit"
        checked=false;
        loginPass.style.boxShadow="0px 0px 10px #f00"
     }
     else{
        passErr.textContent="";
    }
}

if(checked){
    if(loginEmail.value!=localStorage.getItem("email")){
        emailErr.textContent="Wrong Email"
    }else if(loginPass.value!=localStorage.getItem("password")){
        passErr.textContent="Wrong password"
    }else{
        location.replace("startExam.html")

    }
}
})