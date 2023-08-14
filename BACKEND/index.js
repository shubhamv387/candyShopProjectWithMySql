const bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");

const sequelize = require("./utils/database");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const errorController = require("./controller/404");
const candyRouter = require("./router/candy");

app.use(candyRouter);

app.use(errorController.get404);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () =>
      console.log("server is running on http://localhost:3000/")
    );
  })
  .catch((err) => console.log(err));
