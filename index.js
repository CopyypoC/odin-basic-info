import express from "express";
import path from "node:path";

const app = express();
const PORT = 8080;
const __dirname = import.meta.dirname;

function handleRoute(res, path) {
  res.sendFile(path, (err) => {
    if (err) {
      res.sendStatus(500);
    }
  });
}

app.get("/", (req, res) => {
  handleRoute(res, path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  handleRoute(res, path.join(__dirname, "about.html"));
});

app.get("/contact-me", (req, res) => {
  handleRoute(res, path.join(__dirname, "contact-me.html"));
});

// 404 Error Handler
app.use((req, res) => {
  handleRoute(res, path.join(__dirname, "404.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Error: ", err);
  } else {
    console.log("Server listening on port " + PORT);
  }
});
