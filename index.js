// Basit yazı + ses forwarding WebSocket sunucusu
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const wss  = new WebSocket.Server({ port: PORT });

wss.on('connection', sock => {
  console.log('Yeni kullanıcı bağlandı');

  sock.on('message', data => {
    // string mi (yazı) yoksa binary mi (ses)?
    let isText = typeof data === 'string';
    if (!isText && Buffer.isBuffer(data)) {
      // Buffer’ı yazıya çevirip JSON mu diye bak
      try {
        JSON.parse(data.toString());
        isText = true;
        data   = data.toString();        // string’e çevir
      } catch { /* binary ses blob’u */ }
    }

    // herkese aynen ilet
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) c.send(data, { binary: !isText });
    });
  });
});

console.log(`WS sunucu ${PORT} portunda çalışıyor`);
