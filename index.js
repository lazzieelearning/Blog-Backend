import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import connectDB from './Database/Config.js';
import userRoute from "./Routers/userRouter.js"
import authRoute from "./Routers/authRoute.js"
dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());
//middleware and default error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
connectDB();
app.get('/', (req, res) => {
    res.send('Welcome to the API')
})
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port `);
});