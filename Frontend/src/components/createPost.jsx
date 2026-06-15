import { useState } from "react";
import { postApi } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const uploadMediaToCloudinary = async () => {
    const formData = new FormData();

    formData.append("file", media);

    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const resourceType = media.type.startsWith("video") ? "video" : "image";

    // const response = await fetch(
    //   `https://api.cloudinary.com/v1_1/${
    //     import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    //   }/${resourceType}/upload`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   },
    // );

    // const data = await response.json();
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/${resourceType}/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          setUploadProgress(percent);
        },
      },
    );

    return response.data.secure_url;
  };
  const handleSubmit = async (e) => {
    if (!media) {
      alert("Please select an image");
      return;
    }
    e.preventDefault();

    try {
      setUploading(true);
      setUploadProgress(0);
      const mediaUrl = await uploadMediaToCloudinary();

      const mediaType = media.type.startsWith("video") ? "video" : "image";

      await postApi.createPost({
        caption,
        media: mediaUrl,
        mediaType,
      });

      setCaption("");
      setMedia(null);

      navigate("/feed");
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
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
            accept="image/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
            className="input-field"
            required
          />
          {uploading && (
            <div className="upload-progress-wrapper">
              <div className="upload-progress-bar">
                <div
                  className="upload-progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              <p className="upload-progress-text">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          {/* <button type="submit" className="button-primary" disabled={uploading}>
            {uploading ? `Uploading ${uploadProgress}%` : "Post to Feed"}
          </button> */}
          <button type="submit" className="button-primary" disabled={uploading}>
            {uploading ? "Uploading..." : "Post to Feed"}
          </button>
        </form>
      </section>
    </div>
  );
}
