const express = require("express");
const app = express();
const pdfRouter = require("./routes/pdfRoutes");
const dotenv = require('dotenv');
dotenv.config();

const cors = require("cors");

var path = require("path");
var bodyParser = require("body-parser");
app.use(cors());

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//middleware
app.use(express.json());

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/pdf', pdfRouter); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;