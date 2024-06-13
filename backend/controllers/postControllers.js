import db from "../db.js";

export const getPosts = async (req, res) => {
  const category = req.query.cat;
  const id = req.query.id;
  const q = category
    ? "SELECT * FROM posts WHERE cat=? "
    : "SELECT * FROM posts";

  db.query(q, [category, id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const getPost = async (req, res) => {
  const q =
    "SELECT u.id, u.username , u.email ,u.password , u.img As userImg , p.img,p.title ,p.desc,p.date,p.cat  FROM users u JOIN  posts p ON u.id=p.uid WHERE p.id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const updatePost = async (req, res) => {
  const id = req.query.id;
  const { title, desc, img, date, cat } = req.body;

  const q =
    "UPDATE posts SET title=?,`desc`=?,img=? , `date`=?, cat=? WHERE id=?";
  const values = [title, desc, img, date, cat];
  db.query(q, [...values, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json("post updated");
  });
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM posts WHERE id=?";
  db.query(q, id, (err, result) => {
    if (err) return res.status(200).json(err);
    res.status(200).json("post was deleted!");
  });
};

export const addPost = async (req, res) => {
  const { id, uid, title, img, desc, date, cat } = req.body;
  const q = "INSERT INTO posts (id,uid,title,img,`desc`,`date`,cat) VALUES(?)";
  db.query(q, [[id, uid, title, img, desc, date, cat]], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json("new post added!");
  });
};
