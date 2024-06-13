import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const handleSinglePost = (id) => {
    navigate(`single/post/${id}`);
  };

  const fetchAllPosts = async (location) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/posts/all${location.search}`
      );
      console.log(location.search, res.data);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts(location);
  }, [location]);
  return (
    <div className="homeContenair">
      {posts &&
        posts.length > 0 &&
        posts.map((el, i) => {
          return (
            <div className={i % 2 === 0 ? "evenPost" : "oddPost"} key={i}>
              <img className="postImg" src={el.img} alt={el.title} />
              <div className="postText">
                <h1 style={{ width: "400px" }}>{el.title}</h1>

                <p className="postDesc">{el.desc.slice(0, 250)}...</p>
                <button
                  className="homePostBtn"
                  onClick={() => handleSinglePost(el.id)}
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
