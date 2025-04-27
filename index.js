const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', socket => {
    socket.on('message', message => {
        // Gelen mesajı herkese gönder
        server.clients.forEach(client => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

console.log('WebSocket Server çalışıyor Port: 3000');
