import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import { authRoutes, userRoutes } from "./routes/index.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";

import { categoryRoutes } from "./routes/category.routes.ts";
import { productRoutes } from "./routes/product.routes.ts";
import { variantRoutes } from "./routes/variant.routes.ts";
import { cartRoutes } from "./routes/cart.routes.ts";
import { orderRoutes } from "./routes/order.routes.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes); 
app.use("/api/products", productRoutes);
app.use("/api/variants", variantRoutes); 
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
