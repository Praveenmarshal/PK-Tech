const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../frontend");
const port = Number(process.env.PORT || 8000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".glsl": "text/plain; charset=utf-8"
};

http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split("?")[0] === "/" ? "/index.html" : req.url.split("?")[0]);
  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`PK Tech static server: http://127.0.0.1:${port}/index.html`);
});

