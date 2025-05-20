
import configManager from '../utils/manageConfigs.js';

import bug from '../commands/bug.js'

function isEmoji(str) {

    const emojiRegex = /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})$/u;

    return emojiRegex.test(str);
}

async function setprefix(message, client) {

    const number = client.user.id.split(':')[0];

    try {

        const remoteJid = message.key?.remoteJid;

        if (!remoteJid) {

            throw new Error("Message JID is undefined.");
        }

        const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || '';

        const commandAndArgs = messageBody.slice(1).trim();

        const parts = commandAndArgs.split(/\s+/);

        const args = parts.slice(1);

        if (args.length > 0) {

            const prefix = args;

            if (!configManager.config.users[number]) configManager.config.users[number] = {};

            configManager.config.users[number].prefix = prefix;

            configManager.save()

            await bug(message, client, "prefix changed successfully", 3);

        } else if (args.length <= 0) {

            const prefix = args;

            if (!configManager.config.users[number]) configManager.config.users[number] = {};

            configManager.config.users[number].prefix = prefix;

            configManager.save()

            await bug(message, client, "prefix changed successfully", 3);

        } else{

            await bug(message, client, "prefix was not changed successfully", 3); 

            throw new Error('Specify the prefix.');

        }
        

    } catch (error) {

        await client.sendMessage(message.key.remoteJid, { text: `An error occurred while trying to modify the prefixt: ${error.message}` });
    }
}

async function setreaction(message, client) {

    const number = client.user.id.split(':')[0];

    try {

        const remoteJid = message.key?.remoteJid;

        if (!remoteJid) {

            throw new Error("Message JID is undefined.");
        }

        const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || '';

        const commandAndArgs = messageBody.slice(1).trim();

        const parts = commandAndArgs.split(/\s+/);

        const args = parts.slice(1);

        if ((args.length > 0) && isEmoji(args)) {

            const reaction = args[0];

            if (!configManager.config.users[number]) configManager.config.users[number] = {};

            configManager.config.users[number].reaction = reaction;

            configManager.save()

            await bug(message, client, "reaction changed successfully", 3);

        }  else{

            await bug(message, client, "reaction was not changed successfully", 3); 

            throw new Error('Specify the emoji.');

        }
        

    } catch (error) {

        await client.sendMessage(message.key.remoteJid, { text: `An error occurred while trying to modify the reaction emoji: ${error.message}` });
    }
}

export default { setreaction, setprefix };