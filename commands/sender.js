async function sender(message, client, texts) {

    const remoteJid = message.key.remoteJid;

    await client.sendMessage(remoteJid, {

        text: `> _*${texts}*_`,

    });
}

//243897997535@s.whatsapp.net

export default sender;
