const express = require('express')
const fs = require('fs');

const YoutubeSearch = require('yt-search');

const YoutubeToMp3Downloader = require("youtube-mp3-downloader");

const app = express()

const port = 5000

if(!fs.existsSync(`${__dirname}/Videos`)) {
    fs.mkdirSync(`${__dirname}/Videos`);
}

app.get('/search/:keywords/:currentPage', async (req, res) => {
    const keywords = req.params.keywords; 
    const currentPage = req.params.currentPage;

    const response = await YoutubeSearch(keywords);

    res.status(200).json(response.videos.slice(currentPage, currentPage + 10))
});

app.get('/video/:id', (req, res) => {
    const YD = new YoutubeToMp3Downloader({
        "ffmpegPath": "/usr/bin/ffmpeg",        // FFmpeg binary location
        "outputPath": "./Videos",               // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 1,                  // Download parallelism (default: 1)
        "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
        "allowWebm": false
    })

    YD.download(req.params.id);

    YD.on("finished", (err, video) => {
        res.status(200).json(video);

        if(fs.existsSync(`${__dirname}/Videos/${video.videoTitle}.mp3`)) {
            fs.unlinkSync(`${__dirname}/Videos/${video.videoTitle}.mp3`);
            console.log(`Deleted file: ${video.videoTitle}`);
        }

        // res.status(200).sendFile(`${__dirname}/Videos/${video.videoTitle}.mp3`, _ => {
        //     console.log(video);
        //     console.log(`Sent file: ${video.videoTitle}`);

        //     if(fs.existsSync(`${__dirname}/Videos/${video.videoTitle}.mp3`)) {
        //         fs.unlinkSync(`${__dirname}/Videos/${video.videoTitle}.mp3`);
        //         console.log(`Deleted file: ${video.videoTitle}`);
        //     }
        // });
    });

    YD.on("progress", progress => {
        console.log(JSON.stringify(progress));
    });

    YD.on("error", error => {
        res.status(500).json({
            message: "Couldn't download the file"
        })
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
