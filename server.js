const express = require('express')
const fs = require('fs');

const YoutubeSearch = require('yt-search');

const YoutubeToMp3Downloader = require("youtube-mp3-downloader");

const app = express()

const port = 5000

if(!fs.existsSync(`${__dirname}/Videos`)) {
    fs.mkdirSync(`${__dirname}/Videos`);
}

const YD = new YoutubeToMp3Downloader({
    "ffmpegPath": "/usr/bin/ffmpeg",        // FFmpeg binary location
    "outputPath": "./Videos",               // Output file location (default: the home directory)
    "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
    "queueParallelism": 2,                  // Download parallelism (default: 1)
    "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
    "allowWebm": false
})

app.get('/search/:keywords/:currentPage', async (req, res) => {
    const keywords = req.params.keywords; 
    const currentPage = req.params.currentPage;

    const response = await YoutubeSearch(keywords);

    res.status(200).json(response.videos.slice(currentPage, currentPage + 10))
});

app.get('/', (req, res) => {
    YD.download("bR6lbN40-Ho");

    YD.on("finished", (err, video) => {
        console.log(JSON.stringify(video));

        res.status(200).sendFile(`${__dirname}/Videos/${video.videoTitle}.mp3`, (err) => {
            if(err) {
                res.status(500).json({
                    message: "Couldn't send file"
                });
            } else {
                console.log(`Sent file: ${video.videoTitle}`);

                try {
                    fs.unlinkSync(`${__dirname}/Videos/${video.videoTitle}.mp3`);
                    console.log(`Deleted file: ${video.videoTitle}`);
                } catch(err) {
                    console.log(`Couldn't unlink ${video.videoTitle}`);
                    console.log(err);
                }
            }
        });
    });

    YD.on("progress", progress => {
        console.log(JSON.stringify(progress));
    });

    YD.on("error", error => {
        res.status(500).json({
            message: "Couldn't download the file"
        })
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});