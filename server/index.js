const express = require("express");
const fs = require("fs");
const path = require('path');
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
const Grid = require("gridfs-stream");
require ('dotenv').config ();

const { HelpCategory, Option } = require("./schema"); // Importing schema
const {dbConnection, conn} = require('./db-connection')

const app = express();

// Constant variables
const PORT = process.env.SERVER_PORT;

// Project Environment 
const NODE_ENV = process.env.NODE_ENV || 'DEV'; 

app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

// Static file declaration
app.use('/static', express.static(path.join(`${__dirname}/../client/build/static`)));
app.use('/images', express.static(path.join(`${__dirname}/../client/build/images`)));
app.use('/favicon/favicon.ico', (req, res) => {
  const favicon = fs.readFileSync(path.join(__dirname, '/../client/build/favicon/favicon.ico'));
  return res.send(favicon);
});
app.use('/images', express.static(path.join(`${__dirname}/../client/build/favicon`)));

// Initialize GridFS
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("GridFS initialized");
});


// Multer Storage for File Uploads
const storage = new GridFsStorage({
  url: process.env.DB_CONNECTION_STRING,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

// app.get("/category/:category", async (req, res) => {
//     try {
//       console.log("Requested Category:", req.params.category);
  
//       // Try to find the requested category
//       let category = await HelpCategory.findOne({ category: req.params.category });
  
//       // If category is not found, fetch the default category response
//       if (!category) {
//         category = await HelpCategory.findOne({ category: "default" });
  
//         if (!category) {
//           return res.status(404).json({ message: "No default response found in the database." });
//         }
//       }
  
//       // Fetch associated options
//       const options = await Option.find({ optionId: { $in: category.options } });
  
//       res.json({ category: category.category, text: category.text, options });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

app.get("/category/:category", async (req, res) => {
  try {
      console.log("Requested Category:", req.params.category);

      // Convert the category to lowercase
      const requestedCategory = req.params.category.toLowerCase();

      // Try to find the requested category
      let category = await HelpCategory.findOne({ category: requestedCategory });

      // If category is not found, fetch the default category response
      if (!category) {
          category = await HelpCategory.findOne({ category: "default" });

          if (!category) {
              return res.status(404).json({ message: "No default response found in the database." });
          }
      }

      // Fetch associated options
      // const options = await Option.find({ optionId: { $in: category.options } });
      const options = await Option.find({  });

      res.json({ category: category.category, text: category.text, options });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/** 
 * 📌 Get Specific Option Details with File Metadata
 */
app.get("/option/:optionId", async (req, res) => {
  try {
    // Fetch the option details
    const option = await Option.findOne({ optionId: req.params.optionId });
    if (!option) return res.status(404).json({ message: "Option not found" });
    
    let fileMetadata = null;

    // If the option has an associated file, fetch its metadata
    if (option.fileId) {
      const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(option.fileId) });
      if (file) {
        fileMetadata = {
          filename: file.filename,
          contentType: file.contentType,
          length: file.length,
          uploadDate: file.uploadDate,
          url: `/files/${file.filename}` // File download URL
        };
      }
    }

    res.json({ 
      option,
      file: fileMetadata // Attach file metadata if available
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/** 
 * 📌 Upload File & Store Reference in Option Schema 
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File upload failed" });

    const newOption = new Option({
      optionId: req.body.optionId,
      label: req.body.label,
      type: "download",
      url: `/files/${req.file.filename}`,
      fileId: new mongoose.Types.ObjectId(req.file.id.toString())
    });

    await newOption.save();
    res.json({ message: "File uploaded successfully", file: req.file });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/** 
 * 📌 Download File by Filename 
 */
app.get("/files/:filename", async (req, res) => {
  try {
    console.log(req.params);
    
    const file = await gfs.files.findOne({ filename: req.params.filename });
    
    if (!file) return res.status(404).json({ message: "File not found" });

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads", // Make sure the bucket name matches your GridFS collection
    });

    const readStream = bucket.openDownloadStreamByName(file.filename);
    
    res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.setHeader("Content-Type", file.contentType);

    readStream.pipe(res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

/** 
 * 📌 Get File Metadata by ID 
 */
app.get("/file/:id", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).json({ message: "File not found" });

    res.json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** 
 * 📌 Delete File from GridFS 
 */
app.delete("/option/:optionId", async (req, res) => {
  try {
    const option = await Option.findOne({ optionId: req.params.optionId });

    if(option) {
      await Option.deleteOne({optionId:option.optionId});
      await gfs.files.deleteOne({ _id: new mongoose.Types.ObjectId(option) });
      return res.json({ message: "File deleted successfully" });
    }
    return res.json({message:"Option not exists"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DIT Environment
if (['DIT', 'PROD'].includes(NODE_ENV)) { 
  const indexHTMLContent = fs.readFileSync(path.join(`${__dirname}/../client/build/index.html`), 'utf-8');
  app.all('*', (req, res) => {
    res.send(indexHTMLContent);
  });
}

dbConnection().then((message) => { 
    
    app.listen(3001, () => {
      process.stdout.write(`${message}.\nServer Running at : ${3001} \n`);
    });
  }).catch((err) => {
    process.stdout.write(`${err}`);
  });