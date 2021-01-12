const express = require("express");
const path = require("path");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const app = express();
app.use("/", routes);

const staticFilesPath = path.join(__dirname, "..", "dist");
app.use(express.static(staticFilesPath));

const htmlPath = path.join(staticFilesPath, "index.html");
app.get("/*", (_req, res) => {
  res.sendFile(htmlPath);
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
