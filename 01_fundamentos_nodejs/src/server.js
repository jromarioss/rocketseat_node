import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({ id: 1, name: 'José', email: "jose@email.com" })
    return res.end("Crando usuário!")
  }
});

server.listen(3333);