
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingPlanPost = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [plan, setPlan] = useState({
    dia1: '',
    dia2: '',
    dia3: '',
    dia4: '',
    dia5: '',
    dia6: '',
    dia7: ''
  });

  // Cargar datos del coach (nombre + foto)
  useEffect(() => {
    async function getCoachData() {
      try {
        const response = await axios.get(`http://localhost:8080/usuario/${userId}`);
        const data = response.data;
        setUsername(data.username || '');
        setProfilePicture(data.profile_picture || '');
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    }
    getCoachData();
  }, [userId]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // para guardar el plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:8080/planentrenamiento", {
            username: username,
            dia1: plan.dia1,
            dia2: plan.dia2,
            dia3: plan.dia3,
            dia4: plan.dia4,
            dia5: plan.dia5,
            dia6: plan.dia6,
            dia7: plan.dia7
        });
      alert("¡Plan creado con éxito!");
    } catch (error) {
      console.error("Error al guardar el plan:", error);
    }
  };

  return (
    <div className="plan-container">
      <div className="image">
        <img className="profile-picture"
          src={`data:image/jpeg;base64,${profilePicture}`}
          alt="Foto de perfil"
        />
        <h3>{username}</h3>
      </div>

    //cada vez que se usan los 3 puntos, se lo llama spread operator
    //es para no escribir todo 7 veces

      <form onSubmit={handleSubmit}>
        {[...Array(7)].map((_, i) => (
          <div key={i}>
            <label>Día {i + 1}</label>
            <input
              type="text"
              name={`dia${i + 1}`}
              value={plan[`dia${i + 1}`]}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: 10, padding: 8 }}
            />
            </div>
        ))}

        <button type="submit" >Guardar Plan</button>
      </form>
    </div>
  );
};

export default TrainingPlanPost;