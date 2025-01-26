let names = document.querySelector(".timeUp");
let resultBtn = document.querySelector(".content button");
let users = JSON.parse(localStorage.getItem("users")) || [];
const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
const currentUser = users.find(user => user.email === currentUserEmail);

if (currentUser) {
    const fname = currentUser.firstName || 'First Name'; 
    const lname = currentUser.lastName || 'Last Name';  
    names.textContent=`sorry ${fname} ${lname} , timeout !`;
    
} else {
    console.log("No user data found");
}

// Result Button
resultBtn.addEventListener("click",() => { 
    location.replace("grade.html");
})
