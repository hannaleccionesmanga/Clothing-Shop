const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/*
    ROUTES
*/
const dashboardRoutes = require("./routes/dashboardRoutes");

/*
    USE ROUTES
*/
app.use("/api/dashboard", dashboardRoutes);

/*
    HOME ROUTE
*/
app.get("/", (req, res) => {
    res.send("Clothing Shop API Running");
});

/*
    SERVER
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
