import db from "../db.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, email, img } = req.body;
  const q = "SELECT * FROM users WHERE username=? OR email=?";
  db.query(q, [username, email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(409).json("User already exist!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const q =
      "INSERT INTO users (`username`,`email`,`password`,`img`) VALUES (?,?,?,?)";
    db.query(q, [username, email, hash, img], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json("User already register with successfully.");
    });
  });
};

export const login = async (req, res) => {
  const { username } = req.body;
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    const isCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isCorrect) {
      return res.status(401).json("email or password is invalid!");
    }
    const token = Jwt.sign({ id: data[0].id }, "jwtKey");
    const { password, ...other } = data[0];
    res
      .cookie("access-token", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};

export const logOut = async (req, res) => {
  res
    .clearCookie("access-token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("you logOut!");
};
