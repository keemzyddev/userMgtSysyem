const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

//static folder
app.use(express.static("public"));

//body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//template engine
const handlebars = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

//create connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
});

//connect to db
pool.getConnection((err, connection) => {
  if (err) throw err; //not connected
  console.log("connected!");
});

const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
