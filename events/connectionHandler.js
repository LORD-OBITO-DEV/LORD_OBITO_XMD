
function handleConnectionUpdate(update, reconnect) {

    const { connection, lastDisconnect } = update;

    if (connection === 'close') {

        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

        if (shouldReconnect) reconnect();

    } else if (connection === 'open') {
        
        console.log('Connection opened.');
    }
}

module.exports = handleConnectionUpdate;
