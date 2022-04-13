console.log("Welcome to MUZIRA");

// Initiallize the variables

let songIndex = 0;
let audioElement = new Audio('rise.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Rise - Katy Perry", filePath: "rise.mp3", coverPath: "rise.png"},
    {songName: "Dark Horse - Katy Perry", filePath: "dark.mp3", coverPath: "dark.png"},
    {songName: "Unconditionally - Katy Perry", filePath: "unconditionally.mp3", coverPath: "unconditionally.png"},
    {songName: "Harleys In Hawaii - Katy Perry", filePath: "hawaii.mp3", coverPath: "hawaii.png"},
    {songName: "Roar - Katy Perry", filePath: "roar.mp3", coverPath: "roar.png"},
    {songName: "Attention - Charlie Puth", filePath: "Attention.mpeg", coverPath: "Attention.png"},
    {songName: "See You Again - Charlie Puth", filePath: "See.mpeg", coverPath: "See.png"},
    {songName: "How Long - Charlie Puth", filePath: "Long.mpeg", coverPath: "Long.png"},
    
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();

// Handle play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    // Update progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.add('fa-circle-play');
            element.classList.remove('fa-circle-pause');
        })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[index].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7)
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src=songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
    {
        songIndex=7;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})