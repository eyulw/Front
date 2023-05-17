let myName="김민하";
myName=10;
myName="김";
const pi=3.14;
var num=10;
// pi=5.67 상수 변경 불가능;
for(let i=0;i<5;i++){
    console.log("hello.js");
}
// let은 블록scope, var는 함수scope
console.log(myName);
console.log(10+10);
console.log(100-10);
console.log(10*10);
console.log(10%3);

function add(a,b){
    return a+b;
}

const result = add(10,20);
console.log(result);