 let names =document.querySelector(".con")
 let namef =document.querySelector(".fail")
 let fname=localStorage.getItem("firstName")
 let lname=localStorage.getItem("lastName")
// console.log(name);
names.textContent=`Congratlations ${fname} ${lname}`
namef.textContent=`sorry you are failed ${fname} ${lname}`