const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', socket => {
    console.log("Yeni kullanıcı bağlandı!");

    socket.on('message', message => {
        if (typeof message === "string") {
            const data = JSON.parse(message);
            if (data.type === "text") {
                // Yazılı mesajsa
                server.clients.forEach(client => {
                    if (client !== socket && client.readyState === WebSocket.OPEN) {
                        client.send(`${data.message}`);
                    }
                });
            }
        } else {
            // Ses verisiyse
            server.clients.forEach(client => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
    });
});

console.log("WebSocket sunucusu 3000 portunda çalışıyor!");
