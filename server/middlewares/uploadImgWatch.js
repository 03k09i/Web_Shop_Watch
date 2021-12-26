const multer = require("multer");
const upLoadImgMainAndList = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images`);
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  });

  const upload = multer({
    storage,
  });
  return upload.array("PhotosList", 6);
};

module.exports = {
  upLoadImgMainAndList,
};
