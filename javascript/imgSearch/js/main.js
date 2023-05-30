// // ajax (asynchronous javascript and xml) 비동기식~ 
// console.log("01");
// console.log("02");
// setTimeout(()=>{
// console.log("03");
// },1000);    
// //비동기적으로 작동
// // setTimeout
// // setInterval
// // fetch()
// console.log("04");
const thumbsList=document.querySelector(".thumbs-box ul");
const search=document.querySelector(".search");

search.addEventListener("keyup",(e)=>{
    if(e.key==="Enter" || e.keycode === 13){
        const searchWord=search.value;
        searchImg(searchWord);
    }
});

// promise : 약속 이행되면 fullfield, 이행되지 않으면 rejected 

// const searchImg=(searchWord)=>{
//     const aa=fetch(`https://dapi.kakao.com/v2/search/image?query=${searchWord}`,{
//     headers: {
//         Authorization: "KakaoAK 4ac1a35d910fec9ab3a05156e13ec8bc",
//       },
// }).then((response)=>{
//     // console.log(response.json());
//     return response.json();
// }).then((data)=>{
//     // console.log(data);
//     const imgList=data.documents;
//     imgList.forEach((item,idx) => {
//        const li= document.createElement("li");
//        const img=document.createElement("img");
//        img.src=item.thumbnail_url;
//        li.append(img);
//        thumbsList.append(li);
//     });
// });
// console.log(aa);
// }

const removeItem=()=>{
    const imgItem=document.querySelectorAll(".thumbs-box ul li");
    imgItem.forEach((item,idx)=>{
        item.remove();
    })
}

const searchImg= async (searchWord)=>{
    // 기존 li 태그 없애기
    removeItem();
    const imgResponse= await fetch(`https://dapi.kakao.com/v2/search/vclip?query=${searchWord}&size=30`,{
    headers: {
        Authorization: "KakaoAK 4ac1a35d910fec9ab3a05156e13ec8bc",
      },
    });
    const imgJson=await imgResponse.json();
    const imgList=imgJson.documents;
    imgList.forEach((item,idx) => {
       const li= document.createElement("li");
       const img=document.createElement("img");
       const a=document.createElement("a");
       img.src=item.thumbnail;
       a.href=item.url;
       a.setAttribute("data-fancybox","gallery");
       a.append(img);
       li.append(a);
       thumbsList.append(li);
    });
    gsap.from(".thumbsList li",{scale:0, duration:1,stagger:0.02});
    Fancybox.bind("[data-fancybox]", {
        // Your options go here
      });
};