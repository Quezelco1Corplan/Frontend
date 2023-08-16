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
  // const firstname = req.body.firstname;
  // const lastname = req.body.lastname;
  // const contact = req.body.contact;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 13);
  // user.push({
  //     password: hash
  // })

  // con.query("INSERT INTO users (firstname, lastname, contact, status, email, password) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, contact, email, password],
  //     (err, result) => {
  //         if (result){
  //             res.send(result);
  //         }else{
  //             req.send({ message: "ENTER CORRECT ASKED DETAILS!" })
  //         }
  //     }
  // )

  con.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, hash],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "ENTER CORRECT ASKED DETAILS!" });
      }
    }
  );
});

app.post("/login", async (req, res) => {
  // const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password.toString();
  // const user = users.find(u => u.username === username);
  // if(!user){
  //     res.send("wrong username");
  //     return;
  // }
  // const isValid = await bcrypt.compare(password, username.password);
  // if(!isValid){
  //     res.send("wrong password");
  //     return;
  // }
  con.query(
    "SELECT * FROM users WHERE username = ?",
    [username, password],
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
