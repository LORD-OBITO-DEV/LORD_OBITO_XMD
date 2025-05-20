
import { Sticker, StickerTypes } from "wa-sticker-formatter";

import { downloadMediaMessage } from "@whiskeysockets/baileys";

import fs from "fs";

import path from "path";

export async function take(message, client) {

    try {

        const remoteJid = message.key.remoteJid;

        const messageBody = message.message?.extendedTextMessage?.text || message.message?.conversation || '';

        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        const commandAndArgs = messageBody.slice(1).trim(); // Remove prefix and trim

        const parts = commandAndArgs.split(/\s+/);

        let username;

        let text;

        const args = parts.slice(1); // Extract arguments

        if (args.length <= 0) {

            username = message.pushName || "Unknown"; // Get sender's name

            text = message.pushName || "Unknown";
            
        } else {

            username = args[0];

            text = ""
        }

        if (!quotedMessage || !quotedMessage.stickerMessage) {

            return client.sendMessage(remoteJid, { text: "❌ Reply to a sticker to modify it!" });
        }

        // Download the original sticker
        const stickerBuffer = await downloadMediaMessage({ message: quotedMessage }, "buffer");

        if (!stickerBuffer) {

            return client.sendMessage(remoteJid, { text: "❌ Failed to download sticker!" });
        }

        // Save temporary sticker file
        const tempStickerPath = path.resolve("./temp_sticker.webp");

        fs.writeFileSync(tempStickerPath, stickerBuffer);

        // Detect if the sticker is animated
        const isAnimated = quotedMessage.stickerMessage.isAnimated || false;

        // Modify metadata with the user's name
        const sticker = new Sticker(tempStickerPath, {

            pack: `${username}`,  // Custom pack name

            author: `${text}`,   // User's name as author

            type: isAnimated ? StickerTypes.FULL : StickerTypes.DEFAULT, // Preserve animation

            quality: 90, // Adjust quality

            animated: isAnimated, // Important for animated stickers

            background: "#FFFFFF", // Background color (only for full stickers)
        });

        // Convert sticker to Baileys-compatible object
        const stickerMessage = await sticker.toMessage();

        // Send sticker
        await client.sendMessage(remoteJid, stickerMessage);

        // Cleanup
        fs.unlinkSync(tempStickerPath);

        console.log(`✅ Sticker sent successfully with ${username}'s metadata!`);

    } catch (error) {

        console.error("❌ Error:", error);
        
        await client.sendMessage(message.key.remoteJid, { text: "⚠️ Error modifying sticker." });
    }
}

export default take;
