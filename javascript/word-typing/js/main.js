// 1. 주어진 단어를 하나 만들고 배열에다 값 넣고 하나 골라서 뿌리기
const firstWords=["강아지","소나기","기상청","청소부","부잣집"];
const firstWord=firstWords[Math.floor(Math.random()*firstWords.length)];
const wordList=document.querySelector(".word-list ul");
const word=document.querySelector(".word");
const wordArray=[]; // 배열은 참조값을 가지기때문에 const로 정의하고 값 push가능
const appendWord=(inputWord)=>{
    const li=document.createElement("li");
    li.textContent=inputWord;
    wordList.append(li);
    wordArray.push(word.value);
}

const fault =()=>{
    word.value="";
    gsap.from(".input-box",{x:100,duration:0.5,ease:"elastic.out(1, 0.1)"});
}

appendWord(firstWord);
wordArray.push(firstWord);

// 2. word에 글자를 입력하고 enter쳤을때 마지막 단어의 마지막 글자랑 입력한 단어의 첫글자가 같은지 따져야함.
word.addEventListener("keyup",(e)=>{
    console.log("키보드를 눌렀다 뗐을때 발생하는 이벤트");
    console.log(e);
    if(e.key==="Enter" || e.keycode === 13){
        if(word.value.length!=3){
            fault();
            return;
        }
        const lastWord=document.querySelector(".word-list ul li:last-child").textContent;
        const lastChar=lastWord.substring(2);
        if(word.value.substring(0,1)!==lastChar){
            fault();
            return;   
        }
        if(wordArray.includes(word.value)){
            fault();
            return;
        }
        
        fetch(`https://opendict.korean.go.kr/api/search?key=9189C5F64F9CFD8B50177F9019D6DA58&q=${word.value}&req_type=json`)
        .then((response)=>response.json()).then((data)=>{
            if(data.channel.total<=0){
                fault();
                word.value="";
            }
            else{
                appendWord(word.value);
                word.value=""; 
            }
        });
    }
})

// const checkDic=(question)=>{
//     fetch(`https://opendict.korean.go.kr/api/search?key=9189C5F64F9CFD8B50177F9019D6DA58&q=${question}&req_type=json`)
// .then((response)=>{
//     return response.json();
// }).then((data)=>{
//     console.log(data.channel.total);
//     return data.channel.total;
// })}

// ajax
// fetch("https://opendict.korean.go.kr/api/search?key=9189C5F64F9CFD8B50177F9019D6DA58&q=기레기&req_type=json")
// .then((response)=>{
//     // console.log(response);
//     return response.json();
// }).then((data)=>{
//     console.log(data);
// })

// 위에거 간단버전
// fetch("https://opendict.korean.go.kr/api/search?key=9189C5F64F9CFD8B50177F9019D6DA58&q=기러기&req_type=json")
// .then((response)=>response.json()).then((data)=>{
//     console.log(data);
// })