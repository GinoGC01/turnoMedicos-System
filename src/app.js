import express from "express";
import morgan from "morgan";
import turnosRoutes from "./routes/turnos.routes.js";
import consultoriosRoutes from "./routes/consultorios.routes.js";
import userRouter from "./routes/users.routes.js";
import { CORS } from "./middlewares/cors.js";


const app = express();
app.use(morgan("dev"));
app.use(CORS())
app.use(express.json());
app.use("/api", turnosRoutes);
app.use("/api", consultoriosRoutes);
app.use("/api", userRouter)

export default app;
