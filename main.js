
    // phần code thanh menu
        let toggle=document.querySelector('#toggle')
        let toggleRs=document.querySelector('#toggleRs')
        let sidebar=document.querySelector('.sidebar')
        let search=document.querySelector('.bx-search')
        toggle.onclick=function(){
            sidebar.classList.toggle('active')
        }
        toggleRs.onclick=function(){
            sidebar.style.display=''
            sidebar.classList.toggle('active')
            console.log('nhận giá trj')
        }
        search.onclick=function(){
            sidebar.classList.toggle('active')
        }
    //   phần  code render và ứng dụn
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    
    const cdThumb = $(".cd-thumb");
    const songName=$(".song-thumb h3")
    const singerName=$(".song-thumb span")
    const audio = $("#audioHome");
    const audioAlbum = $("#audioAlbum");
    const playBtn = $(".btn-toggle-play");
    const progress = $("#progress");
    const currrenttime=$(".seekTime")
    const durationTime=$('.durationTime')
    const prevBtn = $(".btn-prev");
    const nextBtn = $(".btn-next");
    const randomBtn = $(".btn-random");
    const repeatBtn = $(".btn-repeat");  
    const playlistHome = $(".playlistHome");
   //
   const albumBtn=$(".section__album-btn")
   const background =$(".profide__background")
   const app = {
       
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [ 
        {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "./alanwalker.mp3",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
        name: "Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "./alanwalker.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
            "./alanwalker.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "./alanwalker.mp3",
        image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "./alanwalker.mp3",
        image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
            "./alanwalker.mp3",
        image:
            "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "./alanwalker.mp3",
        image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
        handleRender:function(){
            const htmls=this.songs.map(function(song,index){
                return ` <div class="song ${index==app.currentIndex ? 'active':''}" data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="song__detail">
                            <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                            </div>
                            <p class="duration"></p>
                            <div class="option">
                                <i class='bx bxs-microphone-alt'></i>
                                <i class='bx bx-heart' ></i>
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>    
                    </div> `
            })
            playlistHome.innerHTML=htmls.join('')
            
        },
        definePropertise:function(){
            Object.defineProperty(this,'currentSong',{
            get:function(){
                return this.songs[this.currentIndex]
            }
        })
        },
        handleEvent:function(){
            const _this=this
            // xử lí animate đĩa quay
            const cdThumbAnimate=cdThumb.animate([
                {transform:'rotate(360deg)'}
            ],
            {
                duration:10000,
                iterations:Infinity
            })
            cdThumbAnimate.pause()
                
            
            // xử lý khi user play bài hát 
            playBtn.onclick=function(){
                if(_this.isPlaying){
                    audio.pause()
                }
                else{
                    audio.play()
                }
                audio.onplay=function(){
                    _this.isPlaying=true
                    cdThumbAnimate.play()
                }
                audio.onpause=function(){
                    _this.isPlaying=false
                    cdThumbAnimate.pause()
                }
                // 
                audio.ontimeupdate=function(){
                durationTime.innerHTML=Number((audio.duration)/60).toFixed(2)
                currrenttime.innerHTML=Number((audio.currentTime)/60).toFixed(2)
                progress.value =audio.currentTime/audio.duration*100
                    
                }
            }
            // xử lý khi người dùng muốn tua thời gian
            progress.oninput=function(){
                seekTime=audio.duration/100*progress.value
                audio.currentTime=seekTime
            }
            // xử lý khi next bài hát
            nextBtn.onclick=function(){
                if(_this.isRandom){
                    _this.randomSong()
                }
                else{
                    _this.nextSong()
                }
                _this.handleRender()
                audio.play()
                _this.isPlaying=true
            }
            //  xử lí  khi prev bài  hát 
            prevBtn.onclick=function(){
                _this.prevSong()
                _this.handleRender()
                audio.play()
            _this.isPlaying=true

            }
            randomBtn.onclick=function(){
            _this.isRandom=!_this.isRandom
            if(_this.isRandom){
                randomBtn.classList.add('active')
            }
            else{
                randomBtn.classList.remove('active')
            }
            }
            // xử lí khi  user muốn nghe lại bài hát
            repeatBtn.onclick=function(){
                _this.isRepeat=!_this.isRepeat
                if(_this.isRepeat){
                repeatBtn.classList.add('active')
            }
            else{
                repeatBtn.classList.remove('active')
            }
            }
            // Xử lí khi kết  thúc bài hát
            audio.onended=function(){
                if(_this.isRepeat){
                    audio.play()
                }
                else{
                    nextBtn.click()
                }
            }
            // xử lý khi user muốn chọn bài hát từ thẻ song
            playlist.onclick=function(e){
                songNode=e.target.closest('.song:not(.active)')
                if(songNode||e.target.closest('.option')){
                    _this.currentIndex=Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.handleRender()
                    audio.play()
                    _this.isPlaying=true
                    console.log(_this.isPlaying)
                }
            }

            },
            loadCurrentSong:function(){
            songName.textContent=this.currentSong.name
            singerName.textContent=this.currentSong.singer
            cdThumb.style.backgroundImage=`URL(${this.currentSong.image})`       
            audio.src=this.currentSong.path
            },
            nextSong:function(){
                this.currentIndex++
                if(this.currentIndex>=this.songs.length){
                    this.currentIndex=0
                }
                console.log(this.currentIndex)
                this.loadCurrentSong()
            },
            prevSong:function(){
                this.currentIndex--
                if(this.currentIndex<0){
                    this.currentIndex=this.songs.length-1
                }
                this.loadCurrentSong()

            },
            randomSong:function(){
                let newIndex
                do{
                    newIndex=Math.round(Math.random()*this.songs.length)
                }while(newIndex==this.currentIndex)
                this.currentIndex=newIndex
                this.loadCurrentSong()
            },
            start:function(){
                this.definePropertise()
                this.handleRender()
                this.handleEvent() 
                this.loadCurrentSong()
            }

        }
function renderAlbum(){
    const listAlbums=[
        {
            id:1,
            name:'Bài hát yêu thích',
            background:'https://i.pinimg.com/564x/cc/ac/17/ccac179de9ea4cb62c1f0dbdb782220c.jpg',
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
            listSong:[
                {
                    name: "Big City boi",
                    singer: "Binz",
                    path: "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK",
                    image:
                        "https://i.pinimg.com/236x/98/7a/0a/987a0ab28d1469eba75dad7de73e5d68.jpg"
                    },
                    {
                    name: "Nơi Này Có Anh",
                    singer: "Sơn tùng m-pt",
                    path: "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK",
                    image: "https://i.pinimg.com/236x/f3/d0/38/f3d038b43dd0aa6ac48f307a5bb8f707.jpg"
                    },
                    {
                    name: "Sai Cách Yêu",
                    singer: "Lê Bải Bình",
                    path:
                        "https://drive.google.com/uc?export=download&id=1pEFm9TqHfvDPwufYvkZRQFP0hb35rjlA",
                    image: "https://lyricvn.com/wp-content/uploads/2021/07/517ca58e0bb720d2e469e96259ef2bdd.jpg"
                    },
                    {
                    name: "Chiều Thu Họa bóng nàng",
                    singer: "ĐatKaa",
                    path: "https://drive.google.com/uc?export=download&id=1VwvIM9cZRqWblk4uRPaMyRHMS90mDQXu",
                    image:
                        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/0/4/7/c047c4e29dbeda34deacbe2d8dbb71dc.jpg"
                    },
                    {
                    name: "Từ em mà ra",
                    singer: "Lil z-poet if Đức Anh",
                    path: "https://drive.google.com/uc?export=download&id=1efqM3WTgNURL1a79Jhe-q7gIpS7K8nr-",
                    image:
                        "https://data.chiasenhac.com/data/cover/125/124230.jpg"
                    }, 
                    {
                    name: "Yêu từ đâu mà ra",
                    singer: "Lil zpoet",
                    path:
                        "https://drive.google.com/uc?export=download&id=1CkF7uUTNzyp74zxX_nJKNM8QdqDX92t_",
                    image:
                        "https://data.chiasenhac.com/data/cover/118/117963.jpg"
                    },
                    {
                    name: "Anh Đã quen với cô đơn",
                    singer: "Soobin Hoàng Sơn",
                    path:
                        "https://drive.google.com/uc?export=download&id=1y5vp4nAc6P5-c4n3Fdnzv5BeCUIXpKks",
                    image:
                        "https://data.chiasenhac.com/data/cover/70/69712.jpg"
                    },
                    {
                    name: "Anh ơi anh ơi em nào có tội",
                    singer: "Thương Võ",
                    path:
                        "https://drive.google.com/uc?export=download&id=1FOQRli7lvIgWi17ERWf0OvtztPaZhtAE",
                    image:
                        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
                    },
                    {
                    name: "Càng Lớn Càng Cô Đơn",
                    singer: "Jaykii",
                    path:
                        "https://drive.google.com/uc?export=download&id=1GyyAWuj5JRNJe8JqZJjPrwapwWxtlEZu",
                    image:
                        "https://data.chiasenhac.com/data/cover/141/140728.jpg"
                    },
                    {
                    name: "Vách Ngọc Ngà",
                    singer: "Anh Rồng",
                    path:
                        "https://drive.google.com/uc?export=download&id=1zr5LbT8Tvo50H02azw63ZRTxZO-vsZz6",
                    image:
                        "https://data.chiasenhac.com/data/cover/138/137827.jpg"
                    },
                    {
                    name: "Tình Yêu Khủng Long",
                    singer: "@Fay Cute Official",
                    path:
                        "https://drive.google.com/uc?export=download&id=1NSMpIfuGMri8XAq2t1eky59non5y8EpX",
                    image:
                        "https://data.chiasenhac.com/data/cover/134/133692.jpg"
                    },
                    {
                    name: "Cô ấy nói",
                    singer: "Ngô Anh Đạt x Freak D",
                    path:
                        "https://drive.google.com/uc?export=download&id=1t0wprXCIFJX8_Ab8yeDIjcrijgDBVm-d",
                    image:
                        "https://data.chiasenhac.com/data/cover/142/141556.jpg"
                    }
                
            ]
        },
        {
            id:2,
            name:'Nhạc trẻ gây nghiện',
            background:'https://i.pinimg.com/236x/69/91/e6/6991e6aff513af8b6ee7e704decb86f7.jpg',
            image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
            listSong:[
                {
                name: "Tu Phir Se Aana",
                singer: "Raftaar x Salim Merchant x Karma",
                path: "./alanwalker.mp3",
                image:
                    "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
                },
                {
                name: "Pow Get Down",
                singer: "Raftaar x Fortnite",
                path: "./alanwalker.mp3",
                image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
                },
                {
                name: "Naachne Ka Shaunq",
                singer: "Raftaar x Brobha V",
                path:
                    "./alanwalker.mp3",
                image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
                },
                {
                name: "Mantoiyat",
                singer: "Raftaar x Nawazuddin Siddiqui",
                path: "./alanwalker.mp3",
                image:
                    "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
                },
                {
                name: "Aage Chal",
                singer: "Raftaar",
                path: "./alanwalker.mp3",
                image:
                    "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
                },
                {
                name: "Damn",
                singer: "Raftaar x kr$na",
                path:
                    "./alanwalker.mp3",
                image:
                    "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
                },
                {
                name: "Feeling You",
                singer: "Raftaar x Harjas",
                path: "./alanwalker.mp3",
                image:
                    "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
                }
            ]
        },
        {
            id:3, 
            name:'Đỉnh cao trending',
            background:'https://i.pinimg.com/564x/f8/78/4e/f8784efe5f54219b08849647366cf14b.jpg',
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
            listSong:[
                {
                    name: "Big City boi",
                    singer: "Binz",
                    path: "./alanwalker.mp3",
                    image:
                        "https://i.pinimg.com/236x/98/7a/0a/987a0ab28d1469eba75dad7de73e5d68.jpg"
                    },
                    {
                    name: "Nơi Này Có Anh",
                    singer: "Sơn tùng m-pt",
                    path: "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK",
                    image: "https://i.pinimg.com/236x/f3/d0/38/f3d038b43dd0aa6ac48f307a5bb8f707.jpg"
                    },
                    {
                    name: "Sai Cách Yêu",
                    singer: "Đen vâu",
                    path:
                        "https://drive.google.com/uc?export=download&id=1pEFm9TqHfvDPwufYvkZRQFP0hb35rjlA",
                    image: "https://i.pinimg.com/564x/b9/d6/84/b9d6843ed6210015aa2045edb8b27389.jpg"
                    },
                    {
                    name: "Chiều Thu Họa bóng nàng",
                    singer: "ĐatKaa",
                    path: "https://drive.google.com/uc?export=download&id=1VwvIM9cZRqWblk4uRPaMyRHMS90mDQXu",
                    image:
                        "https://i.pinimg.com/564x/42/4d/9a/424d9a4d3f6613e4bf48ac1ae14887d8.jpg"
                    },
                    {
                    name: "Từ em mà ra",
                    singer: "Lil z-poet if Đức Anh",
                    path: "https://drive.google.com/uc?export=download&id=1efqM3WTgNURL1a79Jhe-q7gIpS7K8nr-",
                    image:
                        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
                    }, 
                    {
                    name: "Yêu từ đâu mà ra",
                    singer: "Lil zpoet",
                    path:
                        "https://drive.google.com/uc?export=download&id=1CkF7uUTNzyp74zxX_nJKNM8QdqDX92t_",
                    image:
                        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
                    },
            ]
        },
        {
            id:4,
            name:'Cùng nhau đẩu xa covid',
            background:'https://i.pinimg.com/236x/b7/66/5c/b7665c6f30dd8919ded854dc7adc32a0.jpg',
            image: "http://phunukontum.org.vn/wp-content/uploads/2020/04/kc.jpg",
            listSong:[
                {
                    name: "Big City boi",
                    singer: "Binz",
                    path: "./alanwalker.mp3",
                    image:
                        "https://i.pinimg.com/236x/98/7a/0a/987a0ab28d1469eba75dad7de73e5d68.jpg"
                    },
                    {
                    name: "Nơi Này Có Anh",
                    singer: "Sơn tùng m-pt",
                    path: "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK",
                    image: "https://i.pinimg.com/236x/f3/d0/38/f3d038b43dd0aa6ac48f307a5bb8f707.jpg"
                    },
                    {
                    name: "Sai Cách Yêu",
                    singer: "Đen vâu",
                    path:
                        "https://drive.google.com/uc?export=download&id=1pEFm9TqHfvDPwufYvkZRQFP0hb35rjlA",
                    image: "https://i.pinimg.com/564x/b9/d6/84/b9d6843ed6210015aa2045edb8b27389.jpg"
                    },
                    {
                    name: "Chiều Thu Họa bóng nàng",
                    singer: "ĐatKaa",
                    path: "https://drive.google.com/uc?export=download&id=1VwvIM9cZRqWblk4uRPaMyRHMS90mDQXu",
                    image:
                        "https://i.pinimg.com/564x/42/4d/9a/424d9a4d3f6613e4bf48ac1ae14887d8.jpg"
                    },
                    {
                    name: "Từ em mà ra",
                    singer: "Lil z-poet if Đức Anh",
                    path: "https://drive.google.com/uc?export=download&id=1efqM3WTgNURL1a79Jhe-q7gIpS7K8nr-",
                    image:
                        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
                    }, 
                    {
                    name: "Yêu từ đâu mà ra",
                    singer: "Lil zpoet",
                    path:
                        "https://drive.google.com/uc?export=download&id=1CkF7uUTNzyp74zxX_nJKNM8QdqDX92t_",
                    image:
                        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
                    },
            ]
        },
        {
            id:5,
            name:'Rap việt theo năm tháng',
            background:'https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg',
            image: "https://i.pinimg.com/236x/29/43/3c/29433c9c0d754ea1d72a5c3c2934f234.jpg",
            listSong:[
                {
                    name: "Big City boi",
                    singer: "Binz",
                    path: "./alanwalker.mp3",
                    image:
                        "https://i.pinimg.com/236x/98/7a/0a/987a0ab28d1469eba75dad7de73e5d68.jpg"
                    },
                    {
                    name: "Nơi Này Có Anh",
                    singer: "Sơn tùng m-pt",
                    path: "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK",
                    image: "https://i.pinimg.com/236x/f3/d0/38/f3d038b43dd0aa6ac48f307a5bb8f707.jpg"
                    },
                    {
                    name: "Sai Cách Yêu",
                    singer: "Đen vâu",
                    path:
                        "https://drive.google.com/uc?export=download&id=1pEFm9TqHfvDPwufYvkZRQFP0hb35rjlA",
                    image: "https://i.pinimg.com/564x/b9/d6/84/b9d6843ed6210015aa2045edb8b27389.jpg"
                    },
                    {
                    name: "Chiều Thu Họa bóng nàng",
                    singer: "ĐatKaa",
                    path: "https://drive.google.com/uc?export=download&id=1VwvIM9cZRqWblk4uRPaMyRHMS90mDQXu",
                    image:
                        "https://i.pinimg.com/564x/42/4d/9a/424d9a4d3f6613e4bf48ac1ae14887d8.jpg"
                    },
                    {
                    name: "Từ em mà ra",
                    singer: "Lil z-poet if Đức Anh",
                    path: "https://drive.google.com/uc?export=download&id=1efqM3WTgNURL1a79Jhe-q7gIpS7K8nr-",
                    image:
                        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
                    }, 
                    {
                    name: "Yêu từ đâu mà ra",
                    singer: "Lil zpoet",
                    path:
                        "https://drive.google.com/uc?export=download&id=1CkF7uUTNzyp74zxX_nJKNM8QdqDX92t_",
                    image:
                        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
                    },
            ]
        },
        {
            id:6,
            name:'Rap việt theo năm tháng',
            background:'https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg',
            image: "https://i.pinimg.com/236x/29/43/3c/29433c9c0d754ea1d72a5c3c2934f234.jpg",
            listSong:[
                {
                    name: "Big City boi",
                    singer: "Binz",
                    path: "./alanwalker.mp3",
                    image:
                        "https://i.pinimg.com/236x/98/7a/0a/987a0ab28d1469eba75dad7de73e5d68.jpg"
                    },
                    {
                    name: "Nơi Này Có Anh",
                    singer: "Sơn tùng m-pt",
                    path: "https://drive.google.com/uc?export=download&id=1a-yzLOeLpC7in_Oq2J_iDqCWSH7JashK",
                    image: "https://i.pinimg.com/236x/f3/d0/38/f3d038b43dd0aa6ac48f307a5bb8f707.jpg"
                    },
                    {
                    name: "Sai Cách Yêu",
                    singer: "Đen vâu",
                    path:
                        "https://drive.google.com/uc?export=download&id=1pEFm9TqHfvDPwufYvkZRQFP0hb35rjlA",
                    image: "https://i.pinimg.com/564x/b9/d6/84/b9d6843ed6210015aa2045edb8b27389.jpg"
                    },
                    {
                    name: "Chiều Thu Họa bóng nàng",
                    singer: "ĐatKaa",
                    path: "https://drive.google.com/uc?export=download&id=1VwvIM9cZRqWblk4uRPaMyRHMS90mDQXu",
                    image:
                        "https://i.pinimg.com/564x/42/4d/9a/424d9a4d3f6613e4bf48ac1ae14887d8.jpg"
                    },
                    {
                    name: "Từ em mà ra",
                    singer: "Lil z-poet if Đức Anh",
                    path: "https://drive.google.com/uc?export=download&id=1efqM3WTgNURL1a79Jhe-q7gIpS7K8nr-",
                    image:
                        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
                    }, 
                    {
                    name: "Yêu từ đâu mà ra",
                    singer: "Lil zpoet",
                    path:
                        "https://drive.google.com/uc?export=download&id=1CkF7uUTNzyp74zxX_nJKNM8QdqDX92t_",
                    image:
                        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
                    },
            ]
        }

    ]
    // Render Danh sách album trong homepage
    const albumlist=$(".swiper-wrapper")
    let albums=""
    for(getAlbum of listAlbums){
        albums+=` <a href="./Album.html?id=${getAlbum.id}"  class="swiper-slide">
                    <div class="card__album">
                        <div class="card__album-img">
                            <img class="album-img" src="${getAlbum.image}" alt="">
                        </div>
                        <div class="card__album-name">
                            <span class="album-name">${getAlbum.name}</span>
                        </div>
                    </div>
                </a>`
    }
     albumlist.innerHTML=albums
    // get id Album
    const currentIndex=0
    const currentLink = window.location.href;
    const url = new URL(currentLink);
    const id = url.searchParams.get('id');
    console.log(url)
    const albumContent=$('.section__album-content')
    console.log(albumContent)
     
     if(id){
         // render poster
         const posterAlbum=$(".album-profide__poster img")
         const titleAlbum=$(".album-profide__title")
         let getCurrentAlbum=listAlbums.find(obj=>obj.id==id)
         background.src=getCurrentAlbum.background
         posterAlbum.src=getCurrentAlbum.image
         titleAlbum.innerHTML=getCurrentAlbum.name
         // render playlist
         const playlistAlbum=$("#playlist__album")
             const playlistSong=getCurrentAlbum.listSong.map(function(song,index){
                 return `<div class="song ${index==currentIndex ? 'active':''}" data-index="${index}">
                            <div class="thumb" style="background-image: url('${song.image}')">
                            </div>
                            <div class="song__detail">
                                <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                                </div>
                                <p class="duration"></p>
                                <div class="option">
                                    <i class='bx bxs-microphone-alt'></i>
                                    <i class='bx bx-heart' ></i>
                                    <i class="fas fa-ellipsis-h"></i>
                                </div>
                            </div>    
                        </div>`
             })      
               playlistAlbum.innerHTML=playlistSong.join('')
            const playAudio={
                songIndex:0,
                isPlaying: false,
                isRandom: false,
                isRepeat: false,
                definePropertise:function(){
                    Object.defineProperty(this,'currentSong',{
                    get:function(){
                        return getCurrentAlbum.listSong[this.songIndex]
                    }
                })
                },
                handleEvent:function(){
                    const _this=this
                    // xử lí animate đĩa quay
                    const posterAnimate=posterAlbum.animate([
                      {transform:'rotate(360deg)'}
                    ],
                    {
                        duration:10000,
                        iterations:Infinity
                    }
        
                    )
                    posterAnimate.pause()
                    const cdThumbAnimate=cdThumb.animate([
                        {transform:'rotate(360deg)'},
                    ],
                    {
                        duration:10000,
                        iterations:Infinity
                    })
                    cdThumbAnimate.pause()
                        
                    
                    // xử lý khi user play bài hát 
                    playBtn.onclick=function(){
                        if(_this.isPlaying){
                            audioAlbum.pause()
                        }
                        else{
                            audioAlbum.play()
                        }
                     
                        // 
                      
                    }
                    audioAlbum.ontimeupdate=function(){
                        durationTime.innerHTML=Number((audioAlbum.duration)/60).toFixed(2)
                        currrenttime.innerHTML=Number((audioAlbum.currentTime)/60).toFixed(2)
                        progress.value =audioAlbum.currentTime/audioAlbum.duration*100
                    }
                    audioAlbum.onplay=function(){
                            _this.isPlaying=true
                            playBtn.classList.add('playing')
                            albumBtn.classList.add('playing')
                            posterAnimate.play()
                            posterAlbum.style.borderRadius='50%' 
                            posterAlbum.style.transform='rotate(0deg)'  
                            cdThumbAnimate.play()
                            
                        }
                    audioAlbum.onpause=function(){
                        _this.isPlaying=false
                        playBtn.classList.remove('playing')
                        albumBtn.classList.remove('playing')
                        posterAnimate.pause()
                        posterAlbum.style.borderRadius='12px'
                        posterAlbum.style.transform='rotate(360deg)'
                        cdThumbAnimate.pause()
                    }
                    // xử lý khi người dùng muốn tua thời gian
                    progress.oninput=function(){
                        seekTime=audioAlbum.duration/100*progress.value
                        audioAlbum.currentTime=seekTime
                    }
                    // xử lý khi next bài hát
                    nextBtn.onclick=function(){
                        if(_this.isRandom){
                            _this.randomSong()
                        }
                        else{
                            _this.nextSong()
                        }
                        audioAlbum.play()
                        _this.isPlaying=true
                    }
                    //  xử lí  khi prev bài  hát 
                    prevBtn.onclick=function(){
                        _this.prevSong()
                         audioAlbum.play()
                       _this.isPlaying=true
        
                    }
                    randomBtn.onclick=function(){
                    _this.isRandom=!_this.isRandom
                    if(_this.isRandom){
                        randomBtn.classList.add('active')
                    }
                    else{
                        randomBtn.classList.remove('active')
                    }
                    }
                    // xử lí khi  user muốn nghe lại bài hát
                    repeatBtn.onclick=function(){
                        _this.isRepeat=!_this.isRepeat
                        if(_this.isRepeat){
                        repeatBtn.classList.add('active')
                    }
                    else{
                        repeatBtn.classList.remove('active')
                    }
                    }
                    // Xử lí khi kết  thúc bài hát
                    audioAlbum.onended=function(){
                        if(_this.isRepeat){
                            audioAlbum.play()
                        }
                        else{
                            nextBtn.click()
                        }
                    }
                    // xử lý khi user muốn chọn bài hát từ thẻ song
                    playlistAlbum.onclick=function(e){ 
                        $('.song.active').classList.remove("active")      
                       const songNode=e.target.closest('.song:not(.active)')
                        if(songNode||e.target.closest('.option')){
                            songNode.classList.add('active')
                            _this.songIndex=Number(songNode.dataset.index)
                            _this.loadCurrentSong()
                            audioAlbum.play()
                            _this.isPlaying=true
                        }
                        
                    }
                },
                loadCurrentSong:function(){
                    const _this=this
                    $('.song.active').classList.remove("active")  
                    $$(".song")[_this.songIndex].classList.add('active')
                    songName.textContent=this.currentSong.name
                    singerName.textContent=this.currentSong.singer
                    cdThumb.style.backgroundImage=`URL(${this.currentSong.image})`
                    audioAlbum.src=this.currentSong.path
                },
                nextSong:function(){
                this.songIndex++
                if(this.songIndex>=getCurrentAlbum.listSong.length){
                    this.songIndex=0
                }
                this.loadCurrentSong()
                },
        
                prevSong:function(){
                    this.songIndex--
                    if(this.songIndex<0){
                        this.songIndex=getCurrentAlbum.listSong.length-1
                    }
                    this.loadCurrentSong()
        
                },
                randomSong:function(){
                    let newIndex
                    do{
                        newIndex=Math.round(Math.random()*getCurrentAlbum.listSong.length)
                    }while(newIndex==this.songIndexf)
                    this.songIndex=newIndex
                    this.loadCurrentSong()
                },
                start:function(){
                    this.definePropertise()
                    this.loadCurrentSong()
                    this. handleEvent()
                    // audioAlbumAlbum.play()
                  
                }
            }
            playAudio.start()
     }
     else {
        
       app.start()
         console.log(playlistHome)     
     }
}
renderAlbum()
 