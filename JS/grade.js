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