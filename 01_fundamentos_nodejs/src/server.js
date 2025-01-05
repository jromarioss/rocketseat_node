import http from 'node:http';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/users') {
    return res.end("listagem de usuários")
  }

  if (method === 'POST' && url === '/users') {
    return res.end("criação de usuários")
  }

  return res.end("hello world again!");
});

server.listen(3333);