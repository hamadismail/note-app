import express, { Application, Request, Response } from "express";
import { notesRoute } from "./app/controllers/notes.controller";
import { userRoutes } from "./app/controllers/user.controller";

const app: Application = express();
app.use(express.json());

app.use('/notes', notesRoute);
app.use('/user', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
