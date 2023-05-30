/*
const myPromise=new Promise((resolve,reject)=>{
    setTimeout(function(){
        // resolve("success");
        reject("fail");
    },1000);
});
myPromise.then(function(msg){
    console.log(msg);
}).catch(function(msg){
    console.log(msg);
}).finally(function(){
    // 무조건 출력
    console.log("무조건 출력");
    console.log(myPromise);
})
*/

// async : 함수 앞에 쓰는 키워드
// await : 단독으로 못 씀. async 함수에서만 쓸 수 있음
// const user = {
//     id : "eyulw",
//     name :"김민하",
// };

// function fetchUser(){
//     const url="https://jsonplaceholder.typicode.com/users/1";
//     return fetch(url).then((response)=>response.json());
// }

// console.log(fetchUser());

// //비동기적 실행을 동기적으로 바꾼다.
// async function checkName(){
//     const user = await fetchUser();
//     // fetchUser가 비동기식이고 if문이 동기식이라서 비동기적 실행을 동기적 실행으로 바꿔야함.
//     if(user.id===1){
//         console.log(user.name);
//     }
// }
// checkName();

// fetch("https://jsonplaceholder.typicode.com/posts/1")
// .then((response)=>response.json())
// .then((data)=> data.userId)
// .then((userId)=>{
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//     .then((response)=>response.json())
//     .then((user)=>console.log(user.name));
// });

async function fetchUserName(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await response.json();
    const userId= post.userId;
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user =await userResponse.json();
    return user.name;
}
fetchUserName(1).then((name)=>console.log(name));