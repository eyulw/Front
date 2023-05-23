Splitting();
const header=document.querySelector(".header");
// header.classList.add("on");
//사용자가 scroll을 해서 스크롤의 높이가 0보다 커지면 on을 단다.

// e : 사용자가 일으키는 이벤트 객체를 매개변수로 받을수 있음.
window.addEventListener("scroll",()=>{
    const scrollY=window.scrollY;
    if(scrollY>0){
        header.classList.add("on");
    }else{
        header.classList.remove("on");
    }
});

gsap.from(".main-visual .slogan .char", { y: 100 , opacity:0, ease: "power3", duration:1, delay:1, stagger:0.05});

new Swiper(".banner .mask",{
    slidesPerView:"auto",
    spaceBetween:30, 
    loop: true,
    navigation:{
        prevEl:".banner .mask .btn-prev",
        nextEl:".banner .mask .btn-next",
    },
    pagination:{
        el:".banner .mask .pagination",
        clickable:true,
    }
});

new Swiper(".partner .brand",{
    slidesPerView:"auto",
    speed:1000,
    loop: true,
    loopedSlides:5,
    autoplay:{
        delay:10,
        disableOnInteraction:false,
    }
});