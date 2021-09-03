const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "select * from nota";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  const sqlInsert = "INSERT INTO nota (title,body) VALUES (?,?)";
  db.query(sqlInsert, [title, body], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM nota WHERE id_nota = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const body = req.body.body;
  console.log(id, title, body);
  const sqlUpdate = `UPDATE nota SET title = ?, body= ? WHERE id_nota = ?`;
  db.query(sqlUpdate, [title, body, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log(`running on http://localhost:3001/api/get`);
});
