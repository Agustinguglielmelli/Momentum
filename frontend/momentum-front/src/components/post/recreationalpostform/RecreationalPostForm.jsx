import "./RecreationalPosFormt.css"
import React, { useState} from "react";
import axios from "axios";
import {convertToBase64, getUserId} from "../../../api/functions";
import {Link, useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

function RecreationalPostForm({ id }) {


  const [calories, setCalories] = useState('')
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [base64, setBase64] = useState([]);

  const navigate = useNavigate();
  // para guardar el plan
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      navigate("/home")
    } catch (error) {
      console.error("Error al guardar el post:", error);
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
      setBase64(prev => [...prev, ...base64Images]); // va haciendo el preview de todas en vez de sobreescribir y hacerlo de a una
    } catch (error) {
      console.error("Error al convertir imágenes:", error);
    }
  };

  return (
      <div>
        <Link to={"/myProfile"} className="btn btn-primary">Back</Link>
        <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
          <h1> Create Post </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Distance (kms): </label>
              <input type="text"
                     className="form-control"
                     onChange={(e) => setDistance(e.target.value)}
                     required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="frequency" className="form-label">Duration (minutes): </label>
              <input type="text"
                     className="form-control"
                     onChange={(e) => setDuration(e.target.value)}
                     required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Calories: </label>
              <input type="text"
                     className="form-control"
                     onChange={(e) => setCalories(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Images: </label>
              <input type="file" id="profilePicture" name="profilePicture" required
                     accept="image/*" onChange={handleMultipleImages}/>
              {base64.length > 0 && (
                  <div>
                    <p>Preview:</p>
                    {base64.map((img, index) => (
                        <img key={index} src={img} alt={`preview-${index}`}
                             style={{ maxWidth: '200px', marginRight: '10px' }} />
                    ))}
                  </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description: </label>
              <textarea type="text"
                        style={{resize: "none"}}
                        rows="5"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit">Create post</button>
          </form>
        </div>
      </div>
  );
}

export default RecreationalPostForm;