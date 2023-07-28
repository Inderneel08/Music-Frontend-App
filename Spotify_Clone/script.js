var songs = [
    {songName:"Warryio - Mortals[NCS Release]", musicPath:"/Externals/Spotify_Clone/songs/1.mp3", music_image:"/Externals/Spotify_Clone/covers/1.jpg"},
    {songName:"Cielo-Huma-Huma", musicPath:"/Externals/Spotify_Clone/songs/2.mp3", music_image:"/Externals/Spotify_Clone/covers/2.jpg"},
    {songName:"DEAF KEV - Invincible[NCS Release]", musicPath:"/Externals/Spotify_Clone/songs/3.mp3", music_image:"/Externals/Spotify_Clone/covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart[NCS Release]", musicPath:"/Externals/Spotify_Clone/songs/4.mp3", music_image:"/Externals/Spotify_Clone/covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning-NCS-Release", musicPath:"/Externals/Spotify_Clone/songs/5.mp3", music_image:"/Externals/Spotify_Clone/covers/5.jpg"},
    {songName:"Rabba - Salam-e-Ishq", musicPath:"/Externals/Spotify_Clone/songs/6.mp3", music_image:"/Externals/Spotify_Clone/covers/6.jpg"},
    {songName:"Sakhiyaan - Salam-e-Ishq", musicPath:"/Externals/Spotify_Clone/songs/7.mp3", music_image:"/Externals/Spotify_Clone/covers/7.jpg"},
    {songName:"Bhula Dena - Salam-e-Ishq", musicPath:"/Externals/Spotify_Clone/songs/8.mp3", music_image:"/Externals/Spotify_Clone/covers/8.jpg"},
    {songName:"Tumhari Kasam - Salam-e-Ishq", musicPath:"/Externals/Spotify_Clone/songs/9.mp3", music_image:"/Externals/Spotify_Clone/covers/9.jpg"},
    {songName:"Na Janna - Salam-e-Ishq", musicPath:"/Externals/Spotify_Clone/songs/10.mp3",music_image:"/Externals/Spotify_Clone/covers/10.jpg"}
]

var songList=Array.from(document.getElementsByClassName('song'));
var playList=Array.from(document.getElementsByClassName('playIcon'));
var audio = new Audio(songs[0].musicPath);
var previous_song=0;
var audioList = new Array();
var song_time=Array.from(document.getElementsByClassName('song_length'));

// Function to change the song.
function to_change()
{
    audio.src=songs[previous_song].musicPath;
}

// Function to start the song.
function start_song()
{
    audio.play();
    playList[previous_song].src="/Externals/Stop.jpg";
}

// Function to stop the song.
function stop_song()
{
    audio.pause();
    playList[previous_song].src="/Externals/Play.jpg";
}


// Function for setting songName,musicimage and for the playIcon.
songList.forEach((element,i)=>{
    element.getElementsByClassName('song_name')[0].innerHTML=songs[i].songName;
    element.getElementsByTagName('img')[0].src=songs[i].music_image;
    element.getElementsByTagName('img')[1].src="/Externals/Play.jpg";
    audioList.push(new Audio(songs[i].musicPath));
});

// Function for setting audio duration using javascript.
audioList.forEach((audio, index) => {
    
    audio.addEventListener('loadedmetadata', () => {
      var duration = audio.duration;

      const minutes=Math.floor(duration/60);

      const seconds=Math.floor(duration-(minutes*60));

      song_time[index].childNodes[0].data="0"+minutes+":"+seconds;
    });
    
});

// Function for clicking on image and starting audio.
playList.forEach((element,i)=>{
    element.addEventListener('click',()=>{
        if(previous_song==i){
            if(audio.paused||audio.currentTime<=0){
                start_song();
            }
            else{
                stop_song();
            }
        }
        else{
            if(audio.paused||audio.currentTime<=0){
                audio.currentTime=0;
                previous_song=i;
                audio.src=songs[i].musicPath;
                start_song();
            }
            else{
                stop_song();
                audio.currentTime=0;
                previous_song=i;
                audio.src=songs[i].musicPath;
                start_song();
            }
        }
    });
});



audio.addEventListener('ended',()=>{
    playList[previous_song].src="/Externals/Play.jpg";
    audio.currentTime=0;
    document.getElementById('gif').style.opacity=0;

    if(previous_song==songs.length-1){
        previous_song=0;
    }
    else{
        previous_song=previous_song+1;
    }

    to_change();
    setTimeout(start_song,5000);
});

audio.onplaying=function() {
    document.getElementById('gif').style.opacity=1;
}

audio.onpause=function(){
    document.getElementById('gif').style.opacity=0;
}





