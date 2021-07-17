const musicContainer = document.querySelector('.music-container')
const musicInfo = document.querySelector('.music-info')
const title = document.querySelector('#title')
const subTitle = document.querySelector('#sub-title')
const favBtn = document.querySelector('#favourite')
const progressContainer = document.querySelector('.progress-container')
const progress = document.querySelector('.progress')
const audio = document.querySelector('#audio')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const cover = document.querySelector('#cover')
const preLoader = document.querySelector('#preloader')


//Song Title
const songs = ['scared', 'traitor', 'emily']
const artists = ['Jeremy Zucker','Olivia Rodrigo','Jeremy Zucker']

//Keep track of songs
let songIndex=0
let artistIndex = 0

//Load song into thr DOM
loadSong(songs[songIndex])
loadArtist(artists[artistIndex])

//Update song into details
function loadSong(song){
    subTitle.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function loadArtist(artist){
    title.innerText = artist
}

function addIcon(){
    musicInfo.classList.add('fav')
}
function delIcon(){
    musicInfo.classList.remove('fav')
}

function playsong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}
//Song Name and Song change
function prevSong(){

    musicInfo.classList.remove('fav')
    songIndex--

    if(songIndex<0){
        songIndex = songs.length-1
    }

    loadSong(songs[songIndex])

    playsong()
}

function nextSong(){

    musicInfo.classList.remove('fav')
    songIndex++

    if(songIndex>songs.length-1){
        songIndex=0
    }

    loadSong(songs[songIndex])

    playsong()
}

//Artist Name Change
function prevArtist(){
    artistIndex--

    if(artistIndex<0){
        artistIndex = artists.length-1
    }

    loadArtist(artists[artistIndex])

    playsong()
}

function nextArtist(){
    artistIndex++

    if(artistIndex>artists.length-1){
        artistIndex=0
    }

    loadArtist(artists[artistIndex])

    playsong()
}

//Progress bar progress

function updateProgress(e){
    const{duration,currentTime}=e.srcElement
    const progressPercent=(currentTime/duration)*100

    progress.style.width =`${progressPercent}%`
}
function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width)*duration
}

//Event Listeners
favBtn.addEventListener('click',()=>{
    const isFav = musicInfo.classList.contains('fav')

    if(isFav){
        delIcon()
    }
    else{
        addIcon()
    }
})

playBtn.addEventListener('click', ()=>{
    const isPlay = musicContainer.classList.contains('play')

    if(isPlay){
        pauseSong()
    }
    else{
        playsong()
    }
})

//Add song events with buttons
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
prevBtn.addEventListener('click',prevArtist)
nextBtn.addEventListener('click',nextArtist)

//Change artist and song when 'ended;
audio.addEventListener('ended', nextSong)
audio.addEventListener('ended', nextArtist)

//Update the progress bar according to song progression
audio.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener('click',setProgress)

//Add preloader for the app
window.addEventListener('load',()=>{
    preLoader.style.display = "none"
})
