import "./RecreationalPostForm.css"
import React, { useState} from "react";
import axios from "axios";
import {convertToBase64, getUserId} from "../../../api/functions";
import {Link, useNavigate} from "react-router-dom";

function RecreationalPostForm({ id }) {
  const [calories, setCalories] = useState('')
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [base64, setBase64] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // para guardar el plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      calories: calories,
      distance: distance,
      duration: duration,
      description: description,
      images: base64.map(img => ({ base64Data: img })),
    }

    try {
      console.log(data)
      const result = await axios.post("http://localhost:8080/miperfil/recPost", data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
      console.log(result.data);
      console.log(data)
      console.log("¡Post creado con éxito!");
      navigate("/myProfile");
    } catch (error) {
      console.error("Error al guardar el post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMultipleImages = async (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    try {
      if ((base64.length + imageFiles.length) > 5) {
        alert("Solo se permiten hasta 5 imágenes.");
        return;
      }
      const base64Images = await Promise.all(
          imageFiles.map(file => convertToBase64(file))
      );
      setBase64(prev => [...prev, ...base64Images]);
    } catch (error) {
      console.error("Error al convertir imágenes:", error);
    }
  };

  const removeImage = (indexToRemove) => {
    setBase64(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
      <div className="form-container-modern">
        <div className="form-header-modern">
          <Link to={"/myProfile"} className="back-btn-modern">
            ← Back to Profile
          </Link>
          <h1 className="form-title-modern">🏃‍♂️ Create New Post</h1>
          <p className="form-subtitle-modern">Share your running experience with the community</p>
        </div>

        <div className="form-card-modern">
          <form onSubmit={handleSubmit} className="modern-form">

            {/* Stats Section */}
            <div className="form-section-modern">
              <h3 className="section-title-form">📊 Run Statistics</h3>
              <div className="stats-grid-modern">
                <div className="input-group-modern">
                  <label htmlFor="distance" className="input-label-modern">
                    🏃‍♂️ Distance
                  </label>
                  <div className="input-wrapper-modern">
                    <input
                        type="number"
                        id="distance"
                        className="input-modern"
                        placeholder="0.0"
                        onChange={(e) => setDistance(e.target.value)}
                        required
                    />
                    <span className="input-unit-modern">km</span>
                  </div>
                </div>

                <div className="input-group-modern">
                  <label htmlFor="duration" className="input-label-modern">
                    ⏱️ Duration
                  </label>
                  <div className="input-wrapper-modern">
                    <input
                        type="number"
                        id="duration"
                        className="input-modern"
                        placeholder="0"
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                    <span className="input-unit-modern">min</span>
                  </div>
                </div>

                <div className="input-group-modern">
                  <label htmlFor="calories" className="input-label-modern">
                    🔥 Calories
                  </label>
                  <div className="input-wrapper-modern">
                    <input
                        type="number"
                        id="calories"
                        className="input-modern"
                        placeholder="0"
                        onChange={(e) => setCalories(e.target.value)}
                    />
                    <span className="input-unit-modern">kcal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="form-section-modern">
              <h3 className="section-title-form">📸 Images</h3>
              <div className="image-upload-area-modern">
                <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    onChange={handleMultipleImages}
                    multiple
                    className="file-input-hidden"
                />
                <label htmlFor="images" className="file-upload-btn-modern">
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">
                    {base64.length === 0 ? "Upload Images" : "Add More Images"}
                  </span>
                  <span className="upload-subtext">
                    {base64.length}/5 images • PNG, JPG up to 10MB
                  </span>
                </label>
              </div>

              {base64.length > 0 && (
                  <div className="image-preview-grid-modern">
                    {base64.map((img, index) => (
                        <div key={index} className="image-preview-card-modern">
                          <img
                              src={img}
                              alt={`preview-${index}`}
                              className="preview-image-modern"
                          />
                          <button
                              type="button"
                              className="remove-image-btn-modern"
                              onClick={() => removeImage(index)}
                          >
                            ✕
                          </button>
                        </div>
                    ))}
                  </div>
              )}
            </div>

            {/* Description Section */}
            <div className="form-section-modern">
              <h3 className="section-title-form">📝 Description</h3>
              <div className="input-group-modern">
                <label htmlFor="description" className="input-label-modern">
                  Tell us about your run
                </label>
                <textarea
                    id="description"
                    className="textarea-modern"
                    placeholder="How was your run? Share your thoughts, feelings, or any interesting moments..."
                    maxLength={150}
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="character-count-modern">
                  {description.length}/150 characters
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="form-actions-modern">
              <Link to={"/myProfile"} className="btn-cancel-modern">
                Cancel
              </Link>
              <button
                  type="submit"
                  className="btn-submit-modern"
                  disabled={isLoading}
              >
                {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Creating...
                    </>
                ) : (
                    <>
                      <span>🚀</span>
                      Create Post
                    </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default RecreationalPostForm;