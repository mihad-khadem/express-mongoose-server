import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./app/config";

// Application
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  // Send a JSON response with a property named "data" containing the value of 'a'
  res.json({ data: a });
});

export default app;
