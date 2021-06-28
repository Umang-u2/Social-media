const multer = require('multer');

//To upload the image file from a buffer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'photo')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

multer({ storage });

module.exports = multer();