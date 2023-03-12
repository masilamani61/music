let now_playing=document.querySelector('.nowplaying')
let track_art=document.querySelector('.track-art')
let trackname=document.querySelector('.Trackname');
let trackartist=document.querySelector('.trackartist')

let randombtn=document.querySelector('.random-track')
let prevbtn=document.querySelector('.prev-track')
let pausebtn=document.querySelector('.pause-track')
let forwardbtn=document.querySelector('.forward-track')
let repeatbtn=document.querySelector('.repeat-track')
let seekslider=document.querySelector('.seekslider')
let volumeslider=document.querySelector('.volumeslider')
let currtime=document.querySelector('.current-time')
let totalduration=document.querySelector('.duration')
let cur_track=document.createElement('audio')

let trackindex=0
let isplaying=false
let israndom=false
let updatetimer;
const music_list =[
    {
        name:"Kadhal-Anukal",
        music:'musics/Kadhal Anukkal (masstamilan.in).mp3',
        artist:'ar-rahman'
    },
    {
        name:"Munbe-Vaa",
        music:"musics/Munbe Vaa En Vaa - Masstamilan.In-.mp3",
        artist:"ar-rahman",
        image:"images/munbe va.jpg"
    }
    ,
    {
        name:"puthiya-manidha",
        music:"musics/Puthiya Manidha (masstamilan.in).mp3",
        artist:'ar-rahman',
        image:''
    }
    


]
let url1=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVi20v4biDpMpQ8L-2F-p39qzOL_8PReXpg&usqp=CAU"
      , "https://i.pinimg.com/originals/ce/bc/65/cebc65383e0ddbf107090986f2211e98.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ2NVYzVrXZnNESNCodsVBpdzOqV9-35yRag&usqp=CAU"
]
loadtrack(trackindex);
function loadtrack(trackindex){
    clearInterval(updatetimer)
    reset();
    cur_track.src=music_list[trackindex].music;
    cur_track.load()
    trackname.textContent=music_list[trackindex].name;
    trackartist.textContent=music_list[trackindex].artist;
    track_art.style.backgroundImage="url("+url1[trackindex]+")";
    
    updatetimer=setInterval(setupdate,1000)
    cur_track.addEventListener('ended',nextTrack);

}
function reset(){
    currtime.textContent="00:00"
}
function randomtrack(){
    trackindex=Math.floor(Math.random()*3);
    
    loadtrack(trackindex)
    playtrack()
}
function nextTrack(){
    trackindex=trackindex+1
    if (trackindex>music_list.length-1){
        trackindex=0
    }
    loadtrack(trackindex)
    playtrack()
}
function prevtrack(){
    trackindex=trackindex-1;
    if (trackindex<0){
        trackindex=music_list.length-1;
    }
    loadtrack(trackindex)
    playtrack()
}
function repeatrack(){
    loadtrack(trackindex)
    playtrack()
}














function playpausetrack(){
    isplaying? pausetrack():playtrack();
}
function playtrack(){
    cur_track.play()
    pausebtn.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>'
    isplaying=true

}
function pausetrack(){
    cur_track.pause()
    pausebtn.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>'
    isplaying=false
}

function seekto(){
    let seekto=cur_track.duration*(seekslider.value/100)
    cur_track.currentTime=seekto
}
function volumeto(){
    cur_track.volume=volumeslider.value/100;
}
function setupdate(){
    let seekposition=0;
    if (!isNaN(cur_track.duration)){
        seekposition=cur_track.currentTime*(100/cur_track.duration)
        seekslider.value=seekposition
        let currminutes=Math.floor(cur_track.currentTime/60)
        let currseconds=Math.floor(cur_track.currentTime-currminutes*60);
        let durationmin=Math.floor(cur_track.duration/60)
        let durationsec=Math.floor(cur_track.duration-durationmin*60)
        if (currseconds<10){
            currseconds="0"+currseconds
        }
        if (currminutes<10){
            currminutes="0"+currminutes
        }
        if (durationsec<10){
            durationsec="0"+durationsec
        }
        if (durationmin<10){
            durationmin="0"+durationmin
        }



        currtime.textContent=currminutes+':'+currseconds;
        totalduration.textContent=durationmin+':'+durationsec;
    }
}
