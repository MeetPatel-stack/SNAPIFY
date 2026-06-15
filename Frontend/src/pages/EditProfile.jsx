import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import { userApi } from "../api/userApi";

export default function EditProfile() {
  const navigate = useNavigate();

  const { user, login } = useContext(AuthContext);

  const [bio, setBio] = useState(user.bio || "");

  const [image, setImage] = useState(null);

  const uploadImageToCloudinary = async () => {
    if (!image) {
      return user.profilePic;
    }

    const formData = new FormData();

    formData.append("file", image);

    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profilePic = await uploadImageToCloudinary();

      const response = await userApi.updateProfile({
        bio,
        profilePic,
      });

      login({
        ...user,
        bio: response.data.bio,
        profilePic: response.data.profilePic,
      });

      navigate(`/profile/${user._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <section className="form-panel">
        <div className="form-panel-header">
          <div>
            <h2>Edit Profile</h2>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <label className="form-label">Profile Picture</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="input-field"
          />

          <label className="form-label">Bio</label>

          <textarea
            rows="4"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea-field"
          />

          <button type="submit" className="button-primary">
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
}
