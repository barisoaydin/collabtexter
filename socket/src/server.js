const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let users = [];

wss.on('connection', function connection(ws) {
  let currentUser = null;

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);

    if (data.type === 'login') {
      currentUser = { id: users.length + 1, name: data.name };
      users.push(currentUser);
      broadcast({
        type: 'userList',
        users: users.map(user => user.name)
      });
    } else if (data.type === 'message') {
      broadcast({
        type: 'message',
        sender: currentUser.name,
        text: data.text
      });
    }
  });

  ws.on('close', function close() {
    if (currentUser) {
      users = users.filter(user => user.id !== currentUser.id);
      broadcast({
        type: 'userList',
        users: users.map(user => user.name)
      });
    }
  });
});

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
