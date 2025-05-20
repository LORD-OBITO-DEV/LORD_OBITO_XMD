import { downloadMediaMessage } from '@whiskeysockets/baileys'

export async function pp(message, client) {

    try {

        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage

        const targetMsg = quoted?.imageMessage || message.message.imageMessage

        if (!targetMsg) {

            return await client.sendMessage(message.key.remoteJid, {

                text: 'Reply or send an image with the command to set as profile picture.'
            })
        }

        const buffer = await downloadMediaMessage({ message: quoted, client }, "buffer");

        await client.updateProfilePicture(client.user.id, buffer)

        await client.sendMessage(message.key.remoteJid, {

            text: '✅ Profile picture updated successfully!'
        })

    } catch (err) {

        console.log(err)

        await client.sendMessage(message.key.remoteJid, {
            text: '❌ Failed to update profile picture.'
        })
    }
}


export default pp;