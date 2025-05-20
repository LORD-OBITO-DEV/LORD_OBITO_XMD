async function bug(message, client, texts, num) {

    const remoteJid = message.key.remoteJid;

    await client.sendMessage(remoteJid, {

        image: { url: `${num}.png` },

        caption: `> ${texts}`,

        contextInfo: {

            externalAdReply: {

                title: "Join Our WhatsApp Channel",

                body: "𝗟𝗢𝗥𝗗 ༒ 𝗢𝗕𝗜𝗧𝗢",

                mediaType: 1, // Image preview

                thumbnailUrl: `https://whatsapp.com/channel/0029Vb65HSyHwXbEQbQjQV26`,

                renderLargerThumbnail: false,

                mediaUrl: `${num}.png`,

                sourceUrl: `${num}.png`
            }
        }
    });
}

export default bug;
