import express from "express";
import morgan from "morgan";
import turnosRoutes from "./routes/turnos.routes.js";
import consultoriosRoutes from "./routes/consultorios.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", turnosRoutes);
app.use("/api", consultoriosRoutes);

export default app;
