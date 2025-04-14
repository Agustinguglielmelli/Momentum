
import { useState, useEffect } from "react";
import axios from "axios";

function RecreationalPost({ id }) {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [description, setDescription] = useState("");
  const [postingPicture, setPostingPicture] = useState("");

  useEffect(() => {
    async function getPostData() {
      try {
        const response = await axios.get(`http://localhost:8080/miperfil/${id}`);
        const data = response.data;
        setUsername(data.username || "");
        setProfilePic(data.profilePicture || "");
        setDescription(data.description || "");
        setPostingPicture(data.postingPicture || "");
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    }

    getPostData();
  }, [id]);

  return (
    <div className="postContainer">
      <div className="header">
        <img src={profilePic} alt="Profile" className="profilePic"/>
        <span
            className="username">{username}</span>
      </div>
      <img src={postingPicture} alt="Post" className="postImage" />
      <p className="description">{description}</p>
    </div>
  );
}

export default RecreationalPost;