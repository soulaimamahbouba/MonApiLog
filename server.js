const express = require("express");
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API du Blog - Serveur Modulaire Operationnel (SoC)"
    });
});

app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Serveur modulaire en ecoute sur http://localhost:${PORT}`);
});