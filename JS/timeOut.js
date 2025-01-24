let names =document.querySelector(".timeUp")
let fname=localStorage.getItem("firstName")
let lname=localStorage.getItem("lastName")
// console.log(name);
names.textContent=`sorry ${fname} ${lname} , timeout!!!`