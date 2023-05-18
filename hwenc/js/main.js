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
// for(let i=0; i<menu.length; i++){
//     menu[i].addEventListener("click",function(){
//         alert(i+"번째 입니다.");
//     });
// }

const contentsList=document.querySelectorAll(".master-piece .contents li");

//화살표 함수 fat arrow function (자바의 lamda)
//익명함수만 가능
menu.forEach((item,idx)=>{
    item.addEventListener("mouseenter",()=>{
        // console.log(idx+"번째 입니다.")
        // nth-child는 1부터 시작
        contentsList.forEach((item02,idx02)=>{
            item02.classList.remove("on");
        })
        const target=document.querySelector(`.master-piece .contents li:nth-child(${idx + 1})`);
        target.classList.add("on");
    });
    item.addEventListener("mouseleave",()=>{
        contentsList.forEach((item02,idx02)=>{
            item02.classList.remove("on");
        })
    })
});

//js에서는 함수가 일급객체.
//함수를 변수에 할당할 수 있다.
//다른 함수를 인자(argument)로 전달 받을 수 있다.
//다른 함수의 결과로서 리턴 가능하다.

bb();   //호출가능

function bb(){
    console.log("함수 선언식입니다.");
}

const aa= ()=>{
    console.log("함수 표현식입니다.");
};
aa();   //const aa보다 위에서 호출 못함

const sum=(a,b)=> a+b;  //return 키워드생략가능, 한줄은 {}생략가능.
console.log(100,100);

const double = num => num*2; //매개변수 하나만 있으면 ()생략가능.

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

const mainSwiper = new Swiper(".main-visual .mask", {
    speed:1000,
    loop:true,
    effect:"fade",
    navigation: {
        nextEl: '.main-visual .btns .btn-next',
        prevEl: '.main-visual .btns .btn-prev',
    },
    pagination: {
        el: '.main-visual .pagination',
        type: 'fraction',
    },
});

const swiper = new Swiper(".social .mask", {
    speed:1000,
    slidesPerView:4,
    spaceBetween:25,
    loop:true,
    // loopedSlides:20,
    navigation: {
        nextEl: '.social .btns .btn-next',
        prevEl: '.social .btns .btn-prev',
    },
    pagination: {
        el: '.social .pagination .inner',
        type: 'progressbar',
    },
    // centeredSlides:true
});