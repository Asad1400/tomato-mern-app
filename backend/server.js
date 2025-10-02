import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/dbConfig.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoute.js"

const app = express();
const PORT = process.env.PORT || 4000
connectDB()

app.use(express.json());
app.use(cors());

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
    console.log("API Working");
    res.json({ message: "API Working" })
})

app.listen(4000, () => {
    console.log(`Server running on http://localhost:4000`)
})