// Minimal local server for running the WebGL build over HTTP.
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp' };

http.createServer((request, response) => {
  const clean = request.url.split('?')[0] === '/' ? '/index.html' : request.url.split('?')[0];
  const file = path.resolve(root, `.${clean}`);
  if (!file.startsWith(root)) { response.writeHead(403); return response.end('Forbidden'); }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404); return response.end('Not found'); }
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    response.end(data);
  });
}).listen(4173, '127.0.0.1', () => console.log('Shine Your Eye running at http://127.0.0.1:4173'));
