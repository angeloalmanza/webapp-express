const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callbackFn) => {
        callbackFn(null, "public/images")
    },
    filename: (req, file, callbackFn) => {
        const originalFileName = file.originalname;
        const uniqueName = `${Date.now()}-${originalFileName}`;
        callbackFn(null, uniqueName);
    }
})

const upload = multer({ storage });

module.exports = upload;