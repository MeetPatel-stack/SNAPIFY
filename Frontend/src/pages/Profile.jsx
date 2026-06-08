import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { postApi } from "../api/postApi";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getUserPosts(id);

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // temporary handler
  const handleEdit = (post) => {
    console.log("Edit:", post);
  };

  const handleDelete = (postId) => {
    console.log("Delete:", postId);
  };

  return (
    <div className="max-w-md mx-auto pb-20">
      {/* PROFILE HEADER */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-2xl font-bold">@{user.username}</h2>

            <p className="text-gray-600">{user.email}</p>

            <div className="flex gap-4 mt-2 text-sm">
              <span>
                <strong>{posts.length}</strong> Posts
              </span>

              <span>
                <strong>0</strong> Followers
              </span>

              <span>
                <strong>0</strong> Following
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div className="p-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border rounded-lg mb-6 overflow-hidden"
          >
            {/* USERNAME */}
            <div className="p-3 font-semibold border-b">
              @{post.user.username}
            </div>

            {/* CAPTION */}
            <div className="p-3">{post.caption}</div>

            {/* IMAGE */}
            <img
              src={post.image}
              alt={post.caption}
              className="w-full cursor-pointer"
              onClick={() => navigate(`/post/${post._id}`)}
            />

            {/* FOOTER */}
            <div className="relative p-3 flex justify-between items-center">
              <div className="flex gap-4">
                <span>❤️ {post.likes.length}</span>

                <span>💬 {post.comments.length}</span>
              </div>

              {/* THREE DOT BUTTON */}
              <button
                onClick={() =>
                  setOpenMenu(openMenu === post._id ? null : post._id)
                }
                className="text-xl"
              >
                ⋮
              </button>

              {/* DROPDOWN */}
              {openMenu === post._id && (
                <div className="absolute right-3 top-10 bg-white border rounded shadow-md z-10">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>

                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}
