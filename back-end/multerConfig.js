const multer = require("multer");
const path = require("path");
const mime = require("mime");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // store files into a directory named 'uploads'
    cb(null, path.join(__dirname, "./public/uploads/"));
  },
  filename: function (req, file, cb) {
    // rename the files to include the current time and date + proper extension
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + mime.extension(file.mimetype)
    );
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
