const header=document.querySelector(".header")
window.addEventListener("scroll",()=>{
    const scrollY=window.scrollY;
    console.log(scrollY);
    if(scrollY>900 && scrollY<3800){
        header.classList.add("on");
    }else{
        header.classList.remove("on");
    }
});

new Swiper(".main-visual .mask",{
    slidesPerView:1,
    loop:true,
    pagination:{
        el:".main-visual .mask .pagination",
        clickable:true,
    }
})

new Swiper(".activity .mask",{
    slidesPerView:3,
    spaceBetween:20,
    loop:true,
})

const menuList=["Housing","Architecture","Infrastructure","Leisure"];

new Swiper(".project .mask", {
    pagination: {
      el: ".project .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + menuList[index] + "</span>";
      },
    },
  });