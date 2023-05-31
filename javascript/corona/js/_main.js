const coronaList = document.querySelector(".coronaList ul");
const ldsEllipsis=document.querySelector(".lds-ellipsis");

const removeItem=()=>{
    const items=document.querySelectorAll(".coronaList ul li");
    items.forEach((item,idx)=>{
        item.remove();
    });
}

const loadCoronaData = async(date)=>{
    removeItem();
    ldsEllipsis.classList.remove("off");
    const corona=await fetch(`http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=eBwx4AyCyPyjR5rnGNOAsCv1lJyES0fuXDfK2n1cjdzTlA6zEdy%2Bo17yxyFtSziyx78qqW0RXfL%2FIiB6UiRF6w%3D%3D&pageNo=1&numOfRows=500&apiType=JSON&std_day=${date}`);
    const response= await corona.json();
    const items= response.items;    //json에 있는 items 배열 담기
    const sortedItems=_.sortBy(items,["gubun"]);
    ldsEllipsis.classList.add("off");
    sortedItems.forEach((item,idx)=>{
        const li=document.createElement("li");
        const region=document.createElement("span");
        const incDec=document.createElement("span");
        region.textContent=item.gubun;
        incDec.textContent=item.incDec;
        region.classList.add("region");
        incDec.classList.add("incDec");
        li.append(region);
        li.append(incDec);
        coronaList.append(li);
    })
    gsap.from(".coronaList ul li",{scale:0,duration:0.5,stagger:0.02})
}

const datePicker = new Lightpick({
    field: document.querySelector(".date-picker"),
    format:'YYYY-MM-DD',
    onSelect: function(date){
        loadCoronaData(data.format("YYYY-MM-DD"));
    }
});
datePicker.setDate(new Date());
