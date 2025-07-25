import http from "node:http";
import fs, { read } from "node:fs";
import path from "node:path";

const port = 8080;
const __dirname = import.meta.dirname;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const indexPath = path.join(__dirname, "index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
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
// Create server
// If req url matches, return html file
// Else, return 404 error file
// Server listen on 8080 port
