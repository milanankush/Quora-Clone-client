import React, { useEffect } from "react";
import QuoraBox from "./QuoraBox";
import "./css/Feed.css";
import Post from "./Post";
import axios from "axios";
import { useState } from "react";
function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`https://quora-cloned-server.herokuapp.com/api/questions`)
      .then((res) => {
        console.log(res.data.reverse());
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="feed">
      <QuoraBox />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

export default Feed;
