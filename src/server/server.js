const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(express.static("dist"));

router.use("/", (req, res, next) => {
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(router);


app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}`));