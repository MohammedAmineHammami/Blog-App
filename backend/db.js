import mysql from "mysql";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog",
});

connection.getConnection((err) => {
  if (err) return console.log(err);
  console.log("database is connected!");
});

export default connection;
