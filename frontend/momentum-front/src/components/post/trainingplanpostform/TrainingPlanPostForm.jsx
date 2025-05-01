
import React, { useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const TrainingPlanPostForm = () => {
  const navigate = useNavigate()
  const [plan, setPlan] = useState({
    dia1: '',
    dia2: '',
    dia3: '',
    dia4: '',
    dia5: '',
    dia6: '',
    dia7: ''
  });
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleFrequencyChange = (e) => { // para lo del renderizado de dias
    const value = e.target.value;
    setFrequency(value);

    const freqNum = parseInt(value);
    if (!isNaN(freqNum) && freqNum >= 1 && freqNum <= 7) {
      setPlan(prevPlan => {
        const newPlan = { ...prevPlan };
        for (let i = freqNum + 1; i <= 7; i++) {
          newPlan[`dia${i}`] = ''; // Limpiar días que ya no se usan
        }
        return newPlan;
      });
    }
  };
  
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
    const data = {
      title: title,
      frequency: frequency,
      duration: duration,
      description: description,
      dia1: plan.dia1,
      dia2: plan.dia2,
      dia3: plan.dia3,
      dia4: plan.dia4,
      dia5: plan.dia5,
      dia6: plan.dia6,
      dia7: plan.dia7
    }
    try {
        const result = await axios.post("http://localhost:8080/miperfil/trainingPlan", data,
            {
              headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }});
      console.log("¡Plan creado con éxito!");
      console.log(result)
      navigate("/miperfil")
    } catch (error) {
      console.error("Error al guardar el plan:", error);
    }
  };

  return (
    <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">
   {/* cada vez que se usan los 3 puntos, se lo llama spread operator
    es para no escribir to.do 7 veces */}
      <h1> Create Training Plan </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title: </label>
          <input type="text"
                 maxLength={20}
                 className="form-control"
                 onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="frequency" className="form-label">Frequency (days per week): </label>
          <input type="text"
                        maxLength={1}
                        className="form-control"
                        value={frequency}
                        onChange={handleFrequencyChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration: </label>
          <input type="text"
                 maxLength={30}
                 className="form-control"
                 onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        {[...Array(7)].map((_, i) => {
          const freqNum = parseInt(frequency); // convertimos frequency a número
          if (isNaN(freqNum) || freqNum < 1 || freqNum > 7 || i >= freqNum) {
            return null; // No renderiza días que estén fuera del límite
          }
          return (
              <div key={i} className="mb-3">
                <label htmlFor={`dia${i + 1}`} className="form-label">Day {i + 1}</label>
                <input
                    type="text"
                    maxLength={150}
                    name={`dia${i + 1}`}
                    value={plan[`dia${i + 1}`]}
                    onChange={handleChange}
                    className="form-control"
                />
              </div>
          );
        })}

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description: </label>
          <textarea type="text"
                    maxLength={150}
                    style= {{resize: "none"}}
                    rows = "5"
                 className="form-control"
                 onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create plan</button>
      </form>
    </div>
  );
};

export default TrainingPlanPostForm;