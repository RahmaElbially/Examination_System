//  let names =document.querySelector(".con")
//  let namef =document.querySelector(".fail")
//  let fname=localStorage.getItem("firstName")
//  let lname=localStorage.getItem("lastName")
// // console.log(name);
// names.textContent=`Congratlations ${fname} ${lname}`
// namef.textContent=`sorry you are failed ${fname} ${lname}`

let users = JSON.parse(localStorage.getItem("users")) || [];

const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;

const currentUser = users.find(user => user.email === currentUserEmail);

if (currentUser) {
    const fname = currentUser.firstName || 'First Name'; 
    const lname = currentUser.lastName || 'Last Name';  
    const correctAnswers = currentUser.correctAnswers || 0; 
    const wrongAnswers = currentUser.wrongAnswers || 0;   

    let resultMessage = '';
    if (correctAnswers >= wrongAnswers) {
        resultMessage = `Congratulations ${fname} ${lname}, you passed with ${correctAnswers} correct answers!`;
    } else {
        resultMessage = `Sorry ${fname} ${lname}, you failed with ${wrongAnswers} wrong answers.`;
    }

    let names = document.querySelector(".con");
    let namef = document.querySelector(".fail");

    if (correctAnswers >= wrongAnswers) {
        names.textContent = resultMessage;
    } else {
        namef.textContent = resultMessage; 
    }
} else {
    console.log("No user data found");
}
