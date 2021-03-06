import express from "express";
import path from "path";
import { cardRoutes, effectRoutes } from "./routes";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/", cardRoutes);
app.use("/", effectRoutes);

const staticFilesPath = path.join(__dirname, "..", "dist");
app.use(express.static(staticFilesPath));

const htmlPath = path.join(staticFilesPath, "index.html");
app.get("/*", (_req, res) => {
  res.sendFile(htmlPath);
});

app.listen(PORT, () => {
  console.debug(`Server started at http://localhost:${PORT}/`);
});
