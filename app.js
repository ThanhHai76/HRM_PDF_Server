const express = require("express");
const app = express();
const pdfRouter = require("./routes/pdfRoutes");
const imageRouter = require("./routes/imageRoutes");
const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");

var path = require("path");
var bodyParser = require("body-parser");
app.use(cors());

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//middleware
app.use(express.json());

const mongoURI = process.env.MONGODB_URL_SERVER;

mongoose.set("strictQuery", false);
//configure mongoose
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/pdf', pdfRouter); 
app.use('/api/image', imageRouter); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;