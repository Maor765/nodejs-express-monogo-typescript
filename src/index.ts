import express, { Request, Response } from 'express'
import mongoose from "mongoose";
import router from "./routes/employeeRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const apiKey = process.env.MONOGO_URI; // Retrieve the environment variable
console.log("API Key:", apiKey); // Use the environment variable as needed
const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());

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

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use("/", router);


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
