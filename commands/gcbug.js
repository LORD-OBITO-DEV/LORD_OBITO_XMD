
import t from '../bugs/t.js'

export async function test(message, client) {

    const remoteJid = message.key.remoteJid;

    // Send the latency result back to the user


    for (let i = 0; i < 20; i++) {

        await client.sendMessage(remoteJid,  {

            text: `${t.repeat(5)}`,

        });
    }
}

//243897997535𝚊@s.whatsapp.net

export default test;
