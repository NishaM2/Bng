import express from "express";
import { config } from "./config.js";

const app = express();
const PORT = config.PORT;

app.get("/health", (_req, res) => {
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
