const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const ip = require("ip");
const cors = require("cors");
connectDb();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/myRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server ${process.pid} listening @ http://${ip.address()}:${
      process.env.PORT
    }`
  );
  console.log(`Server running on port ${port}`);
});
