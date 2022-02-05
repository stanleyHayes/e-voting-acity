import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import expressUserAgent from "express-useragent";
import connectDB from "./db/db.js";
import morgan from "morgan";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(expressUserAgent());
app.use(morgan.dev('dev'));

app.listen(process.env.PORT, () => {
    console.log(`Server connected on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
