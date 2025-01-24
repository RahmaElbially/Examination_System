let time =document.querySelector(".time").textContent
console.log(time);
let timeArr=time.split(":").map(Number)
let [minutes , seconds]=timeArr
 const intervalId=setInterval(function(){
     if(seconds===0){
        if(minutes===1){
            clearInterval(intervalId);
            document.querySelector(".time").textContent="Time up"
            location.replace("timeOut.html")
            return;
        }
        minutes-=1
        seconds=60
     }
     seconds-=1;

     let formateTime=`${String(minutes).padStart(2,0)}:${String(seconds).padStart(2,0)}`
     document.querySelector(".time").textContent=formateTime
    console.log(formateTime);
},1000)