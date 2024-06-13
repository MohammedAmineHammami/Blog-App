import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContextProvider";

function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const fetchSinglePost = async (location) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/posts/single/${location}`
      );
      setPost(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/delete/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSinglePost(location);
  }, [location]);

  return (
    <div className="singlePost">
      <div className="singlePostDetails">
        <img className="singlePostImg" src={post.img} alt={post.title} />
        <div className="singlePostContent">
          <img className="userImg" src={post.userImg} alt="me" />
          <div className="singlePostMeta">
            <b>{post.username}</b>
            <span>{moment(post.date).fromNow()}</span>
          </div>
          {currentUser.id === post.id && (
            <div className="icons">
              <MdEditDocument
                onClick={() => navigate(`/post/write?id=${location}`)}
                className="icon"
                size={25}
              />
              <FaTrash
                className="icon"
                onClick={() => handleDelete(parseInt(location))}
                color="#D22128"
                size={22}
              />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p className="singlePostDesc">{post.desc}</p>
      </div>
      <SideMenu category={post.cat} singlePostId={location} />
    </div>
  );
}

export default SinglePost;
