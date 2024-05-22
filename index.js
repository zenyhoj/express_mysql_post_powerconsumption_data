import express from "express";
import mysql from "mysql";

const app = express();
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "admin_production",
  password: "joe.bals1215~",
  database: "production",
});

conn.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return; // or throw err if you want to terminate the application
  }
  console.log("connected to db");

  app.post("/post", (req, res) => {
    req.body.forEach((el) => {
      const ps_id = el.ps_id;
      const date = el.date;
      const kw = el.kw;
      const total_cost = el.total_cost;
      const price_per_kw = el.price_per_kw;
      const newId = el.id;

      conn.query(
        "INSERT INTO power_consumption VALUES(?,?,?,?,?,?)",
        [newId, ps_id, date, kw, total_cost, price_per_kw],
        (err, result) => {
          if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error executing query");
          }
        }
      );
    });

    res.send("Power consumption data successfully posted");
  });

  app.listen(3000, (err) => {
    if (err) {
      console.error("Error starting server:", err);
      return; // or throw err if you want to terminate the application
    }
    console.log("listening on port 3000");
  });
});
