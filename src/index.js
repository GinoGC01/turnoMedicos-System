import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv'

connectDB();
dotenv.config()
app.listen(3000);

console.log("server on port:", 3000);
