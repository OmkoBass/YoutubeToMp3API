# YoutubeToMp3API

## API for seraching and converting youtube videos to mp3

## You will need ffmpeg for this, install it and point to it's path

### Endpoints:

- ## Search Youtube Videos

### /search/Stairway to Heaven/2
#### Response
```
    {
        "type": "video",
        "videoId": "xbhCPt6PZIU",
        "url": "https://youtube.com/watch?v=xbhCPt6PZIU",
        "title": "Led Zeppelin -  Stairway to Heaven Live",
        "description": "That is our best offer for watching Fonseca y Willie Colón - Idilio : https://goo.gl/JY722A Elvis Presley - Suspicious Minds Live in ...",
        "image": "https://i.ytimg.com/vi/xbhCPt6PZIU/hq720.jpg",
        "thumbnail": "https://i.ytimg.com/vi/xbhCPt6PZIU/hq720.jpg",
        "seconds": 640,
        "timestamp": "10:40",
        "duration": {
            "seconds": 640,
            "timestamp": "10:40"
        },
        "ago": "2 years ago",
        "views": 66629122,
        "author": {
            "name": "OLD TAPES",
            "url": "https://youtube.com/channel/UCBOFKormSGezYGz6Ng_jlpg"
        }
    },
```

- ## Download and convert Youtube Video
#### Response
The actual .mp3 file of the video
