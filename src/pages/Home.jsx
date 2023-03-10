import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddAPost from "../components/AddAPost";
import {  verifyService } from "../services/auth.services";
import { getAllPostsService, likeAPost } from "../services/post.services";

function Home() {
  const [allPosts, setallPosts] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllPostsService();
      console.log(response.data);
      setallPosts(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const likingAPost = async (id) => {
    try {
      const response = await verifyService();
      const userId = response.data.userId;
      await likeAPost(id, userId);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  if (isFetching) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <h3>Logo</h3>
      {allPosts.map((eachPost) => {
        return (
          <div key={eachPost._id}>
            <p>
              <Link to={`/post/${eachPost._id}`}>{eachPost.content}</Link>
            </p>
            <p>
              by {eachPost.username} at {eachPost.time} with:
              {eachPost.totalLikes} likes
            </p>

            <button onClick={() => likingAPost(eachPost._id)}>Like</button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
