/*
const menu01=document.querySelector(".master-piece .menu li:nth-child(1)");
const menu02=document.querySelector(".master-piece .menu li:nth-child(2)");
const menu03=document.querySelector(".master-piece .menu li:nth-child(3)");

//click이란 이벤트를 듣고 function수행
// function -> 익명함수 : 사용자가 이벤트를 발생시켰을때 나중에 호출된다.:callback함수
menu01.addEventListener("click",function(){
    alert("menu01을 눌렀습니다.");
})

//클릭을 하기도전에 callFunc()실행됨.
//기명함수를 사용할때는 괄호를 없애고 callFunc로 써야함
menu02.addEventListener("click",callFunc);
menu03.addEventListener("click",function(){
    alert("menu03을 눌렀습니다.");
})
function callFunc(){
    console.log("함수를 실행합니다.");
}

callFunc();
*/

const menu = document.querySelectorAll(".master-piece .menu li");
// 진짜 배열은 아님. 그러므로 배열의 메서드는 쓸 수 없음.
// console.log(menu);
for(let i=0; i<menu.length; i++){
    menu[i].addEventListener("click",function(){
        alert(i+"번째 입니다.");
    });
}

// 자바스크립트배열 -> 배열이니까 배열 함수사용가능
// const fruits=["apple","melon","peach"];
// fruits.push("");

const header= document.querySelector(".header");
const gnbList = document.querySelectorAll(".gnb .list >li");
gnbList.forEach(function(item,idx){
    item.addEventListener("mouseenter",function(){
        header.classList.add("on");
    });
    item.addEventListener("mouseleave",function(){
        header.classList.remove("on");
    });
})