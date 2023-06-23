const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const hobbyRoutes = require("./routes/hobbies");

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hobbies", hobbyRoutes);

const port = process.env.PORT || 8080
const connection = require('./db');
connection();

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))