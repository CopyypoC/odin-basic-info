import http from "node:http";
import fs, { read } from "node:fs";
import path from "node:path";

const port = 8080;
const __dirname = import.meta.dirname;
const notFoundPath = path.join(__dirname, "404.html");
const routes = {
  "/": path.join(__dirname, "index.html"),
  "/about": path.join(__dirname, "about.html"),
  "/contact-me": path.join(__dirname, "contact-me.html"),
};

const server = http.createServer((req, res) => {
  const filePath = routes[req.url];
  if (filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("500 Internal Server Error");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(data);
    });
  } else {
    fs.readFile(notFoundPath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("500 Internal Server Error");
      }

      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end(data);
    });
  }
});

server.listen(port, (err) => {
  if (err) {
    console.log("Server Error: ", err);
  } else {
    console.log("Server listening on port " + port);
  }
});
