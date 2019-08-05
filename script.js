const express = require('express');
const cp = require('child_process');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mp4tom3u8', (req, res) => {
    const ffmpegRes = cp.spawnSync('ffmpeg', 
        ['-i', 'input.mp4', 
        '-profile:v', 'baseline', 
        '-level', '3.0', 
        '-start_number', '0',
        '-hls_time', '10', 
        '-hls_list_size', '0',
        '-f', 'hls', 
        'temp/output.m3u8']);

    console.log('ffmpeg result', ffmpegRes);
    res.json('ok');
});
app.use(express.static('./temp'));

app.listen(3000, () => console.log('localhost:3000'));
