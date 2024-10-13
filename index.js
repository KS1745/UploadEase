//app create
const express = require("express");
const app = express();

require("dotenv").config();

//Find PORT
const PORT = process.env.PORT || 3000;

//Add Middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//connect with DB
const db = require("./config/database");
db.connect();

//connect with cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//Mount API Route
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

//Activate Server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
