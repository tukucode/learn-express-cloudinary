import express from "express";
import multer from "multer";
import path from "path";

import { v2 as cloudinary } from "cloudinary";

// CONNECTION CLOUDINARY
cloudinary.config({
  cloud_name: "dhr1rmhcj",
  api_key: 499287747115648,
  api_secret: "nNRyxup-WEkhSXQ8T_ZmJCRrdBE",
  secure: true,
});

const port = 3001;
const app = express();
// const upload = multer({ dest: "public" });

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded());

const STORAGE = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "public");
  // },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const result = `img-${Date.now()}${ext}`;
    cb(null, result);
  },
});

const upload = multer({ storage: STORAGE });

app.get("/", upload.single("image"), async (req, res) => {
  const body = req.body;
  const file = req.file;

  const result = await cloudinary.uploader.upload(file.path);

  res.status(200).send({ body, file, result });
});

// URL IMAGE LOCAL
app.use("/image", express.static("./public"));

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
