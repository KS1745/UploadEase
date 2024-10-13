const mongoose = require("mongoose");
const transporter = require("../config/transporter");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    //send mail
    let info = await transporter.sendMail({
      from: `Kartikay`,
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `<h2>Hello</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}a></p>`,
    });

    console.log("Info", info);
  } catch (error) {
    console.log(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
