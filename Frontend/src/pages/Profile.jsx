import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { postApi } from '../api/postApi';
import BottomNav from '../components/BottomNav';

export default function Profile() {

  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {

      const response =
        await postApi.getUserPosts(id);

      setPosts(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto pb-20">

      <div className="p-4 border-b">

        <h2 className="text-2xl font-bold">
          @{user.username}
        </h2>

        <p>{user.email}</p>

        <p>
          Posts: {posts.length}
        </p>

      </div>

      {posts.map(post => (
        <div
          key={post._id}
          className="border-b p-4"
        >

          <img
            src={post.image}
            alt={post.caption}
            className="w-full rounded"
          />

          <p className="mt-2">
            {post.caption}
          </p>

        </div>
      ))}

      <BottomNav />

    </div>
  );
}