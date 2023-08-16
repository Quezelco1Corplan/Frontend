const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "register",
});

app.post("/register", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const contact = req.body.contact;
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 13);

  con.query(
    "INSERT INTO users (firstname, lastname, contact, email, password) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, contact, email, hash],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        req.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    }
  );
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password.toString();

  con.query(
    "SELECT * FROM users WHERE email = ?",
    [email, password],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) {
              return res.json("Error");
            }
          });
          res.send(result);
        } else {
          res.send({ message: "WRONG USERNAME OR PASSWORD!" });
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running backend server");
});
