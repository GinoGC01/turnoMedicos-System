import app from "./app.js";
import { GOOGLE_JSON_KEY } from "./config.js";
import { connectDB } from "./config/db.js";


connectDB();
app.listen(3000);
console.log("server on port:", 3000);
