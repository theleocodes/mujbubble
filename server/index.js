// importing files

import express from "express";
import dotenv from "dotenv";

import Connection from "./database/db.js";
// calling dotenv file
dotenv.config();
// defining fuctions to call then later
const app = express();
const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
Connection(username, password);
