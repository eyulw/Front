const header=document.querySelector(".header")
window.addEventListener("scroll",()=>{
    const scrollY=window.scrollY;
    console.log(scrollY);
    if(scrollY>1000){
        header.classList.add("on");
    }else{
        header.classList.remove("on");
    }
});

new Swiper(".main-visual .mask",{
    slidesPerView:1,
})