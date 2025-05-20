import ytdl from 'ytdl-core';
import ytsr from 'ytsr';
import fs from 'fs';
import path from 'path';

export async function play(message, client) {
    const remoteJid = message.key.remoteJid;
    const messageBody = (message.message?.extendedTextMessage?.text || message.message?.conversation || '').toLowerCase();

    try {
        const title = await getArg(messageBody);
        console.log(`Searching for title: ${title}`);

        const songUrl = await searchSongUrl(title);
        if (!songUrl) throw new Error("No song found with that title.");

        console.log(`Found song URL: ${songUrl}`);

        const filePath = await downloadAudio(songUrl);

        await client.sendMessage(remoteJid, {
            audio: { url: filePath },
            mimetype: 'audio/mp4',
            ptt: false,
        });

        fs.unlinkSync(filePath);

    } catch (error) {
        console.error("An error occurred:", error);
        await client.sendMessage(remoteJid, {
            text: `An error occurred while trying to play the music: ${error.message}`,
        });
    }
}

// Extract title from message
async function getArg(body) {
    const commandAndArgs = body.slice(1).trim();
    const parts = commandAndArgs.split(/\s+/);
    return parts.slice(1).join(' ');
}

// Search YouTube for Song URL
async function searchSongUrl(title) {
    const searchResults = await ytsr(title, { limit: 1 });
    const video = searchResults.items.find(item => item.type === 'video');
    return video?.url;
}

// Download Audio Only
async function downloadAudio(url) {
    const filePath = path.resolve('song.mp3');
    const stream = ytdl(url, { filter: 'audioonly' });

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        stream.pipe(file);

        file.on('finish', () => {
            console.log('✅ Audio downloaded successfully');
            resolve(filePath);
        });

        stream.on('error', reject);
        file.on('error', reject);
    });
}

export default play;