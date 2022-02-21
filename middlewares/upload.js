const path = require('path');
const multer = require('multer');

const tmpDir = path.join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
  limits: { fileSize: 100 },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
