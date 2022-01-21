import multer from "multer";
import { __files, __images } from "../app.js";
import { v4 } from "uuid";
import path from "path";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file") {
      cb(null, __files);
    } else {
      cb(null, __images);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${v4()}${ext}`;
    cb(null, filename)
  }
})