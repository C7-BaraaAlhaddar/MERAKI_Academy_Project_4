const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./models/db");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//
const userRouter = require("./routes/user");
const roleRouter = require("./routes/role");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

//
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
