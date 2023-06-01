const container = document.querySelector(".map");
const options={
    center: new kakao.maps.LatLng(37.5666805, 126.9784147),
    level:13,
};

const map = new kakao.maps.Map(container,options);

const clusterer=new kakao.maps.MarkerClusterer({
    map:map,
    averageCenter:true,
    minLevel:10
});

const content = ``;
const overlay = new kakao.maps.CustomOverlay({
    content:content,
})

const campingPlace = async(place)=>{
    clusterer.clear();
    const camping = await fetch(`https://apis.data.go.kr/B551011/GoCamping/searchList?numOfRows=100&MobileOS=ETC&MobileApp=AppTest&serviceKey=eBwx4AyCyPyjR5rnGNOAsCv1lJyES0fuXDfK2n1cjdzTlA6zEdy%2Bo17yxyFtSziyx78qqW0RXfL%2FIiB6UiRF6w%3D%3D&_type=json&keyword=${place}`);
    const response = await camping.json();
    console.log(response);
    const campingList = response.response.body.items.item;
    console.log(campingList);
    const markers=[];
    campingList.forEach((item,idx)=>{
        const marker = new kakao.maps.Marker({
            map:map,
            position:new kakao.maps.LatLng(item.mapY,item.mapX),
        });
        kakao.maps.event.addListener(marker,'click',
        function(){
            overlay.setMap(map);
            overlay.setPosition(marker.getPosition());
            overlay.setContent(
                `<div class="wrap">
                <div class="info">
                    <div class="title">
                        ${item.facltNm}
                        <div class="close" onclick="closeOverlay()" title="닫기"></div>
                    </div>
                    <div class="body">
                        <div class="desc">
                            <div class="ellipsis">${item.addr1}</div>
                            <div class="type ellipsis">tel : ${item.tel}</div>
                            <div><a href=${item.homepage} target="_blank" class="link">홈페이지</a></div>
                        </div>
                    </div>
                </div>
            </div>`
            );
            map.setCenter(marker.getPosition());
        });
        markers.push(marker);
    });
    clusterer.addMarkers(markers);
}

const search = document.querySelector(".search");
search.addEventListener("keyup",(e)=>{
    if(e.key==="Enter"||e.keycode===13){
        campingPlace(search.value);
    }
})

function closeOverlay(){
    overlay.setMap(null);
}