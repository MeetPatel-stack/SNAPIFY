import { useState } from "react";
import { postApi } from "../api/postApi";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();

    formData.append("file", image);

    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    return data.secure_url;
  };
  const handleSubmit = async (e) => {
    if (!image) {
      alert("Please select an image");
      return;
    }
    e.preventDefault();

    try {
      const imageUrl = await uploadImageToCloudinary();

      await postApi.createPost({
        caption,
        image: imageUrl,
      });

      setCaption("");
      setImage(null);

      navigate("/feed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <section className="form-panel">
        <div className="form-panel-header">
          <div>
            <h2>Share a new memory</h2>
            <p>Add an image URL and a short caption to brighten your feed.</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="caption">
            Caption
          </label>
          <textarea
            id="caption"
            rows="4"
            placeholder="Write something captivating..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="textarea-field"
          />

          <label className="form-label" htmlFor="image">
            Select Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="input-field"
            required
          />

          <button type="submit" className="button-primary">
            Post to Feed
          </button>
        </form>
      </section>
    </div>
  );
}
