import axios from "axios";
import React, { useEffect, useState } from "react";

function SideMenu({ category, singlePostId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/posts/all?cat=${category}`
      );
      setPosts(res.data);

      try {
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);
  return (
    <div className="sideMenu">
      <b className="sideMenuTitle">Other posts you may like</b>
      {posts &&
        posts.length > 0 &&
        posts
          .filter((el) => el.id !== parseInt(singlePostId))
          .map((el, i) => {
            return (
              <div className="sideMenuPost" key={i}>
                <img className="sideMenuImg" src={el.img} alt={el.title} />
                <h2>{el.title}</h2>

                <p>{el.desc}</p>
                <button className="sideMenuBtn">ReadMore</button>
              </div>
            );
          })}
    </div>
  );
}

export default SideMenu;
