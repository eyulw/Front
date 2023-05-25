// 1. computer li 3개중에 하나만 보이게 하기
// 2. human li에 이벤트 걸기
// 3. computer li를 무작위로 나오게 setInterval 만들기
// 4. human li 클릭했을때 멈추게하기 clearInterval
// 5. 승패 확인하기

const computerList=document.querySelectorAll(".computer ul li");
const humanList=document.querySelectorAll(".human ul li");
const resultList=document.querySelector(".result ul");
const cover=document.querySelector(".cover");

const addClass=(className)=>{
    const li=document.createElement("li");
    li.classList.add(className);
    li.textContent=className.substring(0,1);
    resultList.appendChild(li);
}

let computerChoice;
const makeRandom=()=>{
    computerList[0].style.display="none";
    computerList[1].style.display="none";
    computerList[2].style.display="none";
    computerChoice = Math.floor(Math.random()*3);
    computerList[computerChoice].style.display="block";
}
let st = setInterval(makeRandom,50);

let count=0;
let gameIdx=0;
humanList.forEach((item,idx) => {
    item.addEventListener("click",()=>{
        count++;
        clearInterval(st);
        if(count>=5){
            clearTimeout(gameIdx);
            cover.style.display="block";
        }else{
            gameIdx=setTimeout(()=>{
                st= setInterval(makeRandom,50);
            },2000);
        }
        if(idx===computerChoice){
            console.log("draw");
            addClass("draw");
        } else if(idx===0 && computerChoice===2){
            console.log("win");
            addClass("win");
        } else if(idx===1 && computerChoice===0){
            console.log("win");
            addClass("win");
        } else if(idx===2 && computerChoice===1){
            console.log("win");
            addClass("win");
        } else{
            console.log("lose")
            addClass("lose");
        }
    })
});