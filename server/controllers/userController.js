const mysql = require("mysql");

//create connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
});

//view users
exports.view = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);
    //use the connection
    connection.query("SELECT * FROM user ", (err, rows) => {
      //release connection
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        res.status(500).send("Server Error!");
      }
    });
  });
};

//find users by search
exports.find = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);

    let searchData = req.body.search;

    //use the connection
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? ",
      ["%" + searchData + "%", "%" + searchData + "%"],
      (err, rows) => {
        //release connection
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          res.status(500).send("Server Error!");
        }
      }
    );
  });
};

//add new user
exports.form = (req, res) => {
  res.render("adduser");
};

//create new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);

    let searchData = req.body.search;

    //use the connection
    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, alert) => {
        //release connection
        connection.release();
        if (!err) {
          res.render("adduser", { alert: "User added Successfully" });
        } else {
          res.status(500).send("Server Error!");
          console.log(err);
        }
      }
    );
  });
};

//edit user
exports.edit = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);
    //use the connection

    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //release connection
        connection.release();
        if (!err) {
          res.render("edituser", { rows });
        } else {
          res.status(500).send("Server Error!");
        }
      }
    );
  });
};

//update user
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);
    //use the connection

    connection.query(
      "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?  WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        //release connection
        connection.release();
        if (!err) {
          // pool.getConnection((err, connection) => {
          //   if (err) throw err; //not connected
          //   console.log(`connected as ID ${connection.threadId}`);
          //   //use the connection

          //   connection.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
          //     //release connection
          //     connection.release();
          //     if (!err) {
          //       res.render("edituser", { rows, alert: "successful"  });
          //     } else {
          //       //res.status(500).send('Server Error!')
          //     }
          //     //console.log("the data in the table: \n", rows);
          //   });
          // });
          res.redirect("/");
        } else {
          res.status(500).send("Server Error!");
        }
      }
    );
  });
};

//delete user
exports.delete = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);
    //use the connection

    connection.query(
      "DELETE FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //release connection
        connection.release();
        if (!err) {
          res.redirect("/");
        } else {
          res.status(500).send("Server Error!");
        }
      }
    );
  });
};

//view all users
exports.viewuser = (req, res) => {
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) throw err; //not connected
    console.log(`connected as ID ${connection.threadId}`);
    //use the connection
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        //release connection
        connection.release();
        if (!err) {
          res.render("viewuser", { rows });
        } else {
          res.status(500).send("Server Error!");
        }
      }
    );
  });
};
