import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import moment from "moment";

function WritePost() {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "x4nndd6u");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dtxxcyidt/upload",
      formData
    );
    setFile(response?.data?.secure_url);
  };

  const handlePost = async () => {
    try {
      await axios.post("http://localhost:3000/api/posts/add/", {
        title: title,
        img: file,
        desc: value.replace(/[<p></p>]/g, ""),
        cat: cat,
        uid: currentUser.id,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (location) => {
    try {
      await axios.put(
        `http://localhost:3000/api/posts/update${location.search}`,
        {
          title: title,
          img: file,
          desc: value.replace(/[<p></p>]/g, ""),
          cat: cat,
          uid: currentUser.id,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="writePost">
      <div className="postTextContent">
        <input
          className="writeTitle"
          type="text"
          placeholder="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill
          className="reactQuill"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="sideMenuContent">
        <img className="sideMenuWriteImg" src={file} alt="" />
        <input type="file" onChange={handleFileChange} />

        <div className="writeSideMenu">
          <div className="writeCat">
            <span>
              <input
                type="radio"
                id="art"
                onChange={(e) => setCat(e.target.value)}
                value="art"
                checked={cat === "art"}
              />
              <label htmlFor="art">Art</label>
            </span>

            <span>
              <input
                type="radio"
                id="science"
                onChange={(e) => setCat(e.target.value)}
                value="science"
                checked={cat === "science"}
              />
              <label htmlFor="science">Science</label>
            </span>

            <span>
              <input
                type="radio"
                id="technologie"
                onChange={(e) => setCat(e.target.value)}
                value="technologie"
                checked={cat === "technologie"}
              />
              <label htmlFor="technologie">Technologie</label>
            </span>

            <span>
              <input
                type="radio"
                id="food"
                onChange={(e) => setCat(e.target.value)}
                value="food"
                checked={cat === "food"}
              />
              <label htmlFor="food">Food</label>
            </span>
            <span>
              <input
                type="radio"
                id="cinema"
                onChange={(e) => setCat(e.target.value)}
                value="cinema"
                checked={cat === "cinema"}
              />
              <label htmlFor="cinema">Cinema</label>
            </span>
          </div>
          <div className="writeSideMenuBtns">
            <button className="sideMenuBtn" onClick={handlePost}>
              Post
            </button>
            <button
              className="sideMenuBtn"
              onClick={() => handleUpdate(location)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WritePost;
