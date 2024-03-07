import express, { Request, Response } from 'express'
import mongoose from "mongoose";
import router from "./routes/employeeRoutes";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const apiKey = process.env.MONOGO_URI; // Retrieve the environment variable
console.log("API Key:", apiKey); // Use the environment variable as needed
const app = express();
app.use(express.json());

const MONOGO_URL = "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", false);

mongoose
  .connect(apiKey, {
    dbName: "node-typescript-app",
  })
  .then((r: any) => {
    // console.log(`database connected ${stringify(r)}`);
    console.log(`database connected: ${r.connections[0].host}`);
  })
  .catch((error: any) => {
    console.log(error);
    process.exit(1);
  });

app.get("/", (req: Request, res: Response) => {
  try {
    res.json({
      msg: "It's workin'!",
    });
  } catch (x) {
    console.error(x);
    res.json({ error: x });
  }
});

app.use("/", router);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
