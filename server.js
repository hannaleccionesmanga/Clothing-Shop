const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./backend/config/db");

const app = express();

app.use(cors());
app.use(express.json());

const dashboardRoutes = require("./backend/routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("Clothing Shop API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
