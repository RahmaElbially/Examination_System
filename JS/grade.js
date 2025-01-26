//  let names =document.querySelector(".con")
//  let namef =document.querySelector(".fail")
//  let fname=localStorage.getItem("firstName")
//  let lname=localStorage.getItem("lastName")
// // console.log(name);
// names.textContent=`Congratlations ${fname} ${lname}`
// namef.textContent=`sorry you are failed ${fname} ${lname}`
/////////////////////////////////////////////////////////////////////
// let image = document.querySelector(".success img");
// let names = document.querySelector(".con");
// let namef = document.querySelector(".fail");

// let users = JSON.parse(localStorage.getItem("users")) || [];
// const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
// const currentUser = users.find(user => user.email === currentUserEmail);

// if (currentUser) {
//     const fname = currentUser.firstName || 'First Name'; 
//     const lname = currentUser.lastName || 'Last Name';  
//     const correctdAnswers = currentUser.correctAnswers || 0; 
//     const inCorrectdAnswers = currentUser.incorrectAnswers || 0;   
//     /////////new////////
//     const successRate=(correctdAnswers/10)*100
//     const failRate=(correctdAnswers/10)*100

//     let resultMessage = '';
//     if (correctdAnswers >= inCorrectdAnswers) {
//         resultMessage = `Congratulations ${fname} ${lname}, you passed with ${successRate}% correct answers!`;
//         names.textContent = resultMessage;
//         image.src = "../Images/Success_factors.gif"; 
//     } else {
//         resultMessage = `Sorry ${fname} ${lname}, you failed with ${failRate}% wrong answers.`;
//         namef.textContent = resultMessage;
//         image.src = "../Images/Worried.gif"; 
//     }
// } else {
//     console.log("No user data found");
// }


// let circleContainer = document.querySelector(".circle-container");
//         let percentageText = document.querySelector(".percentage-text")
//         let input = document.querySelector("input");

//         input.addEventListener("blur", () => {
//             let percentage = parseInt(input.value);

//             // تأكد أن القيمة بين 0 و 100
//             if (isNaN(percentage) || percentage < 0 || percentage > 100) {
//                 alert("Please enter a valid percentage between 0 and 100");
//                 return;
//             }
//         let currentPercentage = parseFloat(getComputedStyle(circleContainer).getPropertyValue("--percentage")) || 0;
//             let step = 1; // الزيادة لكل خطوة
//             let interval = 10; // سرعة التحديث بالميلي ثانية
//             let animation = setInterval(() => {
//                 if (currentPercentage < percentage) {
//                     currentPercentage += step;
//                 } else if (currentPercentage > percentage) {
//                     currentPercentage -= step;
//                 } else {
//                     clearInterval(animation);
//                 }
//                 circleContainer.style.setProperty("--percentage", currentPercentage);
//                 percentageText.textContent =`${Math.round(currentPercentage)}%` ;
//             }, interval);
//         });

async function fetchData(){
    const response=await fetch("questions.json")
    const data =await response.json();
    console.log(data.questions.length);
      
    const lengthOfData=data.questions.length

    let circleContainer = document.querySelector(".circle-container");
    let percentageText = document.querySelector(".percentage-text");
    let image = document.querySelector(".success img");
    let names = document.querySelector(".con");
    let namef = document.querySelector(".fail");
    let res=document.querySelector(".res")
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
    const currentUser = users.find(user => user.email === currentUserEmail);
    
    if (currentUser) {
       const fname = currentUser.firstName || 'First Name'; 
       const lname = currentUser.lastName || 'Last Name';  
       const correctAnswers = currentUser.correctAnswers || 0; 
       const incorrectAnswers = currentUser.incorrectAnswers || 0;   
    
       ///////// نسبة النجاح والفشل /////////
       const successRate = (correctAnswers / lengthOfData) * 100;
    //    const failRate = (incorrectAnswers / lengthOfData) * 100;
    
       let resultMessage = '';
       let resultMessage2= '';
       let percentageToAnimate = 0; // المتغير لتحديد النسبة التي سيتم عرضها
    
       if (correctAnswers >= incorrectAnswers) {
           resultMessage = `Congratulations ${fname} ${lname},`;
           resultMessage2=` you passed with ${correctAnswers} correct answers!`
           names.textContent = resultMessage;
           res.textContent=resultMessage2;
           image.src = "../Images/Success_factors.gif"; 
           percentageToAnimate = successRate; // استخدم نسبة النجاح
       } else {
           resultMessage = `Sorry ${fname} ${lname},`;
           resultMessage2=` you failed with ${incorrectAnswers} wrong answers.`
           namef.textContent = resultMessage;
           res.textContent=resultMessage2;
           image.src = "../Images/Worried.gif"; 
           percentageToAnimate = successRate; // استخدم نسبة الفشل
       }
    
       // تحديث الدائرة بالنسبة المحسوبة تلقائيًا
       animatePercentage(percentageToAnimate);
    } else {
       console.log("No user data found");
    }
    
    /////////// وظيفة لتحديث الدائرة ديناميكيًا ///////////
    function animatePercentage(targetPercentage) {
       let currentPercentage = parseFloat(getComputedStyle(circleContainer).getPropertyValue("--percentage")) || 0;
       let step = 1; // الزيادة لكل خطوة
       let interval = 10; // سرعة التحديث بالميلي ثانية
    
       let animation = setInterval(() => {
           if (currentPercentage < targetPercentage) {
               currentPercentage += step;
           } else if (currentPercentage > targetPercentage) {
               currentPercentage -= step;
           } else {
               clearInterval(animation);
           }
           circleContainer.style.setProperty("--percentage", currentPercentage);
           percentageText.textContent = `${Math.round(currentPercentage)}%`;
       }, interval);
    }
    console.log();
}
fetchData()