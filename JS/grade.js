//  let names =document.querySelector(".con")
//  let namef =document.querySelector(".fail")
//  let fname=localStorage.getItem("firstName")
//  let lname=localStorage.getItem("lastName")
// // console.log(name);
// names.textContent=`Congratlations ${fname} ${lname}`
// namef.textContent=`sorry you are failed ${fname} ${lname}`
let image = document.querySelector(".success img");
let names = document.querySelector(".con");
let namef = document.querySelector(".fail");

let users = JSON.parse(localStorage.getItem("users")) || [];
const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
const currentUser = users.find(user => user.email === currentUserEmail);

if (currentUser) {
    const fname = currentUser.firstName || 'First Name'; 
    const lname = currentUser.lastName || 'Last Name';  
    const correctdAnswers = currentUser.correctAnswers || 0; 
    const inCorrectdAnswers = currentUser.incorrectAnswers || 0;   

    let resultMessage = '';
    if (correctdAnswers >= inCorrectdAnswers) {
        resultMessage = `Congratulations ${fname} ${lname}, you passed with ${correctdAnswers} correct answers!`;
        names.textContent = resultMessage;
        image.src = "../Images/Success_factors.gif"; 
    } else {
        resultMessage = `Sorry ${fname} ${lname}, you failed with ${inCorrectdAnswers} wrong answers.`;
        namef.textContent = resultMessage;
        image.src = "../Images/Worried.gif"; 
    }
} else {
    console.log("No user data found");
}
