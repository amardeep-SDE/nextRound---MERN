import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/connectDB.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "https://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],  
    credentials: true,
  };
  app.use(cors(corsOptions));
// app.get("/" , (req,res) => {
//     res.send("hello world");
// });

app.use("/api/v1/user", userRoute);
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
