const ldsEllipsis=document.querySelector(".lds-ellipsis");

const loadCoronaData=async(date)=>{
    ldsEllipsis.classList.remove("off");
    const corona = await fetch(`http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=eBwx4AyCyPyjR5rnGNOAsCv1lJyES0fuXDfK2n1cjdzTlA6zEdy%2Bo17yxyFtSziyx78qqW0RXfL%2FIiB6UiRF6w%3D%3D&pageNo=1&numOfRows=500&apiType=JSON&std_day=${date}`);
    const response= await corona.json();
    const items = response.items;
    const sortedItems=_.sortBy(items,["gubun"]);
    ldsEllipsis.classList.add("off");
    const cities=[];
    const values=[];
    sortedItems.forEach((item,idx)=>{
        cities.push(item.gubun);
        values.push(item.incDec);
    });
    makeChart(cities,values);
};

const datePicker = new Lightpick({ field: document.querySelector(".date-picker"),format:"YYYY-MM-DD",
onSelect:(date)=>{
    loadCoronaData(date.format("YYYY-MM-DD"));
} });

datePicker.setDate(new Date());

let myChart = null;
const makeChart=(cities,values)=>{
    const ctx = document.querySelector(".chart");
    if(myChart!=null) myChart.destroy();
    myChart=new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cities,
          datasets: [{
            label: '시도별 확진자 수',
            data: values,
            borderWidth: 1,
            backgroundColor: ["#FFF5E4", "#FFE3E1","#FFD1D1","#FF9494"],
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });    
}