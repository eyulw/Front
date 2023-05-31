// jQuery : select, manipulation, ajax 잘함

const coronaList=document.querySelector(".coronaList ul");
const ldsEllipsis=document.querySelector(".lds-ellipsis");

const removeItem=()=>{
    const items=document.querySelectorAll(".coronaList ul li");
    items.forEach((item,idx)=>{
        item.remove();
    });
};
const loadCoronaData=async(date)=>{
    removeItem();
    ldsEllipsis.classList.remove("off");
    const corona = await fetch(`http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=eBwx4AyCyPyjR5rnGNOAsCv1lJyES0fuXDfK2n1cjdzTlA6zEdy%2Bo17yxyFtSziyx78qqW0RXfL%2FIiB6UiRF6w%3D%3D&pageNo=1&numOfRows=500&apiType=JSON&std_day=${date}`);
    const response= await corona.json();
    const items = response.items;
    // lodash _.sortBy함수는 새로운 배열을 만듦. 참조 X
    const sortedItems=_.sortBy(items,["gubun"]);
    // items.sort((a,b)=>{
    //     if(a.gubun > b.gubun) return 1;
    //     if(a.gubun === b.gubun) return 0;
    //     if(a.gubun < b.gubun) return -1;
    // });
    ldsEllipsis.classList.add("off");
    sortedItems.forEach((item,idx)=>{
        console.log(item.gubun+"==="+item.incDec);
        const li=document.createElement("li");
        const region=document.createElement("span");
        region.classList.add("region");
        const incDec=document.createElement("span");
        incDec.classList.add("incDec");
        region.textContent=item.gubun;
        incDec.textContent=item.incDec;
        li.append(region);
        li.append(incDec);
        coronaList.append(li);
    })
    gsap.from(".coronaList ul li",{scale:0,duration:0.5, stagger:0.02})
};

const datePicker = new Lightpick({ field: document.querySelector(".date-picker"),format:"YYYY-MM-DD",
onSelect:(date)=>{
    loadCoronaData(date.format("YYYY-MM-DD"));
} });

datePicker.setDate(new Date());

// js에서 sort 함수 쓸 때는 비교함수를 넣어주는게 좋다.
// const chars = ["a","z","f","c","b"];
// const bb=["a","carrot","banana","apple"];
// const cc=["다","나","가","라"];
// const aa=bb.toSorted();
// console.log(aa);
// console.log(bb.sort());
// console.log(chars.toSorted());
// console.log(bb.toSorted());
// sort((a,b)=> a - b);

/*

const person={name:"AAA",age:30};
const person2=person;  //얕은복사 shallow copy (주소참조)
const person3={ ...person }
//깊은복사 spread operator (새로운 객체)
// 배열 또는 객체의 원본을 훼손하지 않고 복사해갈때 많이 사용한다.
// sort() 는 원본 변경시킴, _.sortBy()는 원본변경X

*/