// basit, yazı + ses (blob) aktaran WebSocket sunucusu
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 3000 });

wss.on('connection', (sock) => {
  console.log('Yeni kullanıcı bağlandı');

  sock.on('message', (msg) => {
    // Gelen veri string ise yazılı mesaj, değilse ses blob’udur
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(msg);
    });
  });
});

console.log('WebSocket sunucusu çalışıyor → ws://localhost:3000 (prod’da wss)');
