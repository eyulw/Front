const gnbList = document.querySelectorAll(".gnb .list > li");
const header = document.querySelector(".header");
gnbList.forEach((item,idx)=>{
    item.addEventListener("mouseenter",()=>{
        header.classList.add("on");
    });
});
header.addEventListener("mouseleave",()=>{
    header.classList.remove("on");
});

new Swiper(".media .mask",{
    // li크기 자체가 줄어듦. 한번에 4개 볼수 있는만큼.
    // "auto"쓰면 크기 내가 정해줘야함
    slidesPerView:"auto",
    centeredSlides: true,
    // 슬라이드 사이 여백
    spaceBetween:20, 
    loop: true,
});