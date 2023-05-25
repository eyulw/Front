// console.log("연결테스트");
const computerList=document.querySelectorAll(".computer ul li");
const humanList=document.querySelectorAll(".human ul li");
const resultList=document.querySelector(".result ul");
// const appendItem=document.createElement("li");
// resultList.appendChild(appendItem);
// appendItem.classList.add("win");
// appendItem.textContent="W";
let computerChoice;

const appendItems=(className)=>{
    const appendItem=document.createElement("li");
    resultList.appendChild(appendItem);
    appendItem.classList.add(className);
    appendItem.textContent=className.substring(0,1);
}

const makeRandom = ()=>{
    computerList[0].style.display="none";
    computerList[1].style.display="none";
    computerList[2].style.display="none";
    computerChoice=Math.floor(Math.random()*3);
    computerList[computerChoice].style.display="block";
};
let count=0;
let gameIdx=0;
// item : 객체 , idx : 순서
humanList.forEach((item,idx)=>{
    item.addEventListener("click",()=>{
        count++;
        clearInterval(computerIdx);
        // setTimeout(함수,시간): 주어진시간에 한번만함
        if(count>=5){
            clearTimeout(gameIdx);
        }else{
            gameIdx=setTimeout(()=>{
                computerIdx=setInterval(makeRandom,50);
            },1000);
        }
        
        if(idx === computerChoice){
            console.log("draw");
            appendItems("draw");
        }else if(idx===0 && computerChoice===1){
            console.log("lose");
            appendItems("lose");
        }else if(idx===1 && computerChoice===2){
            console.log("lose");
            appendItems("lose");
        }else if(idx===2 && computerChoice===0){
            console.log("lose");
            appendItems("lose");
        }else{
            console.log("win");
            appendItems("win");
        }
    });
});

// setInterval <-> clearInterval
let computerIdx=setInterval(makeRandom,50); //0.5초마다 makeRandom 호출
makeRandom();
