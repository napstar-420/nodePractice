var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer((req, res) => {
  // converting address to readable object
  const address = url.parse(req.url, true);
  // declaring filename
  let fileName = '';
  // if user at root return index else desired file 
  if(req.url === '/'){
    fileName = './index.html';
  } else {
    fileName = '.' + address.pathname + '.html';
  };
  fs.readFile(fileName, (err, data) => {
    if(err) {
      fs.readFile('./404.html', (err, data) => {
        res.writeHead(404, {'Content-type': 'text/html'});
        if(err) return res.end('somethings wrong');
        res.write(data);
        return res.end();
      })
    }
    res.writeHead(200, {'Content-type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);