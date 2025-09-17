const express = require("express");
const taskRouter = require("./routes/task");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });
const app = express();

main().catch((error) => console.log("Erreur DB: ", error));
async function main() {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_DB_ADMIN_USER}:${process.env.MONGO_DB_ADMIN_PWD}@task.bnatt7b.mongodb.net/?retryWrites=true&w=majority&appName=task`
    )
    .then(() => console.log("Connection à MongoDB réussie"))
    .catch((error) => console.log("Connection à MongoDB échouée", error));
}

app.use(express.json());
app.use("/api/task", taskRouter);
app.use("/api/auth", authRouter);

module.exports = app;
