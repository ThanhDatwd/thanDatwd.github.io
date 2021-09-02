

function renderMv(){
     ArraySinger=[
        {
            id:1,
            name:"Đình Dũng",
            image:'https://avatar-nct.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048.jpg'
        },
        {
            id:2,
            name:"Le Bảo bình",
            image:'https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg'
        },
        {
            id:3,
            name:"Sơn Tùng M-tp",
            image:'https://nld.mediacdn.vn/thumb_w/684/2020/7/6/kb2csyow-15940028416672339086.jpeg'
        },
    ],
    // Tạo mảng  chứ  cac bài hát 
     ArrayMv=[
        {
            id:1,
            singerId:1,
            nameMv:"Anh thương em còn non dại",
            posterMv:"https://data.chiasenhac.com/data/cover/128/127508.jpg",
            linkMv:"https://www.youtube.com/embed/fvDA0tr7xP8"
        },
        {
            id:2,
            singerId:1,
            nameMv:"tình Anh",
            posterMv:"https://data.chiasenhac.com/data/cover/122/121059.jpg",
            linkMv:"https://www.youtube.com/embed/xDp3h2DyWzo"
        },
        {
            id:3,
            singerId:1,
            nameMv:"Sai lầm Của anh",
            posterMv:"https://data.chiasenhac.com/data/cover/111/110865.jpg",
            linkMv:"https://www.youtube.com/embed/yn028QF2FPs"
        },
        {
            id:4,
            singerId:2,
            nameMv:"Sai Cách Yêu",
            posterMv:"https://photo-zmp3.zadn.vn/banner/5/7/e/c/57ec421802dc9cff0d7719f681d6945b.jpg",
            linkMv:"https://www.youtube.com/embed/6IX9kq4Ovzc"
        },
        {
            id:5,
            singerId:2,
            nameMv:"Anh Không Níu  kéo",
            posterMv:"https://photo-zmp3.zadn.vn/banner/5/7/e/c/57ec421802dc9cff0d7719f681d6945b.jpg",
            linkMv:"https://www.youtube.com/embed/6IX9kq4Ovzc"
        },
        {
            id:6,
            singerId:2,
            nameMv:"Níu Duyên",
            posterMv:"https://photo-zmp3.zadn.vn/banner/5/7/e/c/57ec421802dc9cff0d7719f681d6945b.jpg",
            linkMv:"https://www.youtube.com/embed/6IX9kq4Ovzc"
        },
        {
            id:7,
            singerId:3,
            nameMv:"Muộn Rồi Mà sao còn",
            posterMv:"https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261_300.jpg",
            linkMv:"https://www.youtube.com/embed/xypzmu5mMPY"
        },
        {
            id:8,
            singerId:3,
            nameMv:"Có  chắc Yêu là đây",
            posterMv:"https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261_300.jpg",
            linkMv:"https://www.youtube.com/embed/xypzmu5mMPY"
        },
    ]
    // render mv ra homepage
   
    
    function getMv(){
        return new Promise(function(resovle){
            // để mô phỏng inter net bị chậm ta dùng settimeout
               resovle(ArrayMv)
        })
    }
    function getSingerById(parameterSingerIds){
        return new Promise(function(resovle){
                var result =ArraySinger.filter(function(singer){
                    return parameterSingerIds.includes(singer.id)
                });
                resovle(result)
        })
    }
    getMv()
            .then(function(ArrayMv){
               const singerIds= ArrayMv.map(function(mv){
                    return mv.singerId
                })
                return getSingerById(singerIds)
                        .then(function(singers){
                            return {
                                ArraySinger:singers,
                                ArrayMv:ArrayMv

                            }
                        })
            })
            .then(function(data){
                const listMvHomePage=document.querySelector("#mv-popular")
                let listMv=""
                data.ArrayMv.forEach(function(mv){
                    var singer=data.ArraySinger.find(function(singer){
                        return singer.id==mv.singerId
                    });
                    listMv+=`
                            <a href="./mv.html?id=${mv.id}" class="swiper-slide">
                                <div class="card__mvHot">
                                    <div class="card__mvHot-img">
                                        <img class="mvHot-img" src="${mv.posterMv}" alt="">
                                    </div>
                                    <div class="card__mvHot-info">
                                        <img class="img__singer" style="width:40px;height:40px;border-radius: 50%;" src="${singer.image}" alt="">
                                        <div class="abc">
                                            <h3 class="mv-name">${mv.nameMv}</h3>
                                            <span class="mv-singerName" >${singer.name}</span>
                                        </div>  
                                    </div>
                                </div>
                            </a> `
                });
                if(listMvHomePage)listMvHomePage.innerHTML=listMv
                // render mv khi user click vào mv bên trang homepage
                const currentLink = window.location.href;
                const url = new URL(currentLink);
                const id = url.searchParams.get('id');
                if(id){
                    const $ = document.querySelector.bind(document);
                    const $$ = document.querySelectorAll.bind(document);

                    const mvShow=$('.iframe__mv')
                    let getCurrentMv=ArrayMv.find(obj=>obj.id==id)
                    let getCurrentSinger=ArraySinger.find(obj=>obj.id==getCurrentMv.singerId)
                    console.log(getCurrentSinger)
                    
                    // render hình ảnh và tên bài hát ở đầu trang
                    const headerImgMv=$(".header__info-mv img")
                    const headerNameMv=$("#headerNameMv")
                    const headerNameSinger=$("#headerNameSinger")
                    headerImgMv.src=getCurrentSinger.image
                    headerNameMv.innerHTML=getCurrentMv.nameMv
                    headerNameSinger.innerHTML=getCurrentSinger.name
            
                    // render mv  vào trong mv.html
                    mvShow.src=getCurrentMv.linkMv
                    console.log(mvShow)
                    // render danh  dách recommend 
                    const recommendList=$(".mv__recommend-listMv")
                    const singerId=getCurrentMv.singerId 
                     
                    const listRecommend=ArrayMv.filter(function(mvRecommend){
                         return  singerId==mvRecommend.singerId
                        // console.log(mvRecommend.singerId)
                    })
                    console.log(listRecommend)
                           
                    const recommend=listRecommend.map((mv,index)=>{
                        return `<a>
                                    <div class="recommend__mv-card" data-index="${index}">
                                        <img src="${mv.posterMv}" alt="">
                                        <div class="recommend-card__info" >
                                        <img src="${getCurrentSinger.image}" alt="">
                                        <div class="card__info-text">
                                             <h4 >${mv.nameMv}</h4>
                                            <span>${getCurrentSinger.name}</span>
                                        </div>   
                                    </div>
                                    </div>
                                </a>  `
                    })
                    if(recommendList) recommendList.innerHTML= recommend.join('')
                    
                    const playMv={
                        handleEvent:function(){
                            const recommendList=$(".mv__recommend-listMv")
                            recommendList.onclick=function(e){
                                console.log(listRecommend[1])
                               const mvNode= e.target.closest(".recommend__mv-card")
                               const idMvNode=Number(mvNode.dataset.index)
                               console.log(idMvNode)
                                 const getCurrentMv= listRecommend[idMvNode]
                                //  truyền dữ liêu khi click vào bài hat trong recommend
                                 headerNameMv.innerHTML=getCurrentMv.nameMv
                                 headerNameSinger.innerHTML=getCurrentSinger.name
                                 mvShow.src=getCurrentMv.linkMv
            
                            }
                        },
                        start:function(){
                            this.handleEvent()
                            
                        }
                    }
                    playMv.start()
                }
            })
            

}
renderMv()