const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://127.0.0.1:27017/Project_4")
  .then(() => {
    console.log("DB READY");
  })
  .catch((err) => {
    console.log(err);
  });
