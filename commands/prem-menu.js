
export async function prem(message, client) {

    const remoteJid = message.key.remoteJid;

    const today = new Date();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const currentDay = daysOfWeek[today.getDay()];

    const currentDate = today.getDate();

    const currentMonth = today.getMonth() + 1; 

    const currentYear = today.getFullYear();

    const owner = "𓂀 👑𝙻𝚘𝚛𝚍_𝙾𝚋𝚒𝚝𝚘-𝙳𝚎𝚟👑𓂀";

    const username = message.pushName || "Unknown";

    const t = ` 
╭─────────────────╮
     👑𝙻𝙾𝚁𝙳 𝙾𝙱𝙸𝚃𝙾👑 
╰─────────────────╯
╭─────────────────╮
│ Prefix : .
│ User : ${username}  
│ Day : ${currentDay}
│ Date : ${currentDate}/${currentMonth}/${currentYear} 
│ Version : 3
│ Plugins : 2
│ Type : X-MD 
╰─────────────────╯

╭────[ PREMIUM CMDS ]─────╮
│      
│ ⬢ connect 243xxxxx
│ ⬢ reconnect 243xxxxx            
│ ⬢ disconnect 243xxxxx        
╰─────────────────╯        

made by 👑𝙻𝚘𝚛𝚍_𝙾𝚋𝚒𝚝𝚘-𝚍𝚎𝚟👑
    `
;

    await client.sendMessage(remoteJid, {

        image: { url: "menu.jpg" },

        caption: t,

        contextInfo: {

            participant: '0@s.whatsapp.net',

            remoteJid: 'status@broadcast',

            quotedMessage: { conversation:"𝗟𝗢𝗥𝗗 ༒ 𝗢𝗕𝗜𝗧𝗢"}, 

            isForwarded: true,
        },


    });
}   

export default prem;
