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
            emailErr.style.color="red"
            checked=false;
        }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginEmail.value)){
            emailErr.textContent="please enter valid email"
            checked=false;
        }else{
            emailErr.textContent="";
        }
    
    const  regExpPass=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

    if(loginPass.value==""){
        passErr.textContent="Required"
        checked=false;
        passErr.style.color="red"
    }else {
        if(!(loginPass.value.length>=8) ){
        passErr.textContent="please enter 8 digit"
        checked=false;
        passErr.style.color="red"
     }else if(!regExpPass.test(loginPass.value) ){
        passErr.textContent="numbers or special char and uppercase Letter"
        checked=false;
        passErr.style.color="red"
    }
}
    if(checked==true){
       subErr.textContent="valid login"
       subErr.style.color="green"
    //    passErr.textContent=""
    //    passErr.textContent=""
    }
    else{
        subErr.textContent="not valid login"
       subErr.style.color="red"
    }
})