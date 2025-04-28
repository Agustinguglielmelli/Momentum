
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import { getUserRole } from '../../../api/functions';
import Button from "../../button/Button";

const EventPostForm = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startAtPlace, setStartAtPlace] = useState('');
  const [endAtPlace, setEndAtPlace] = useState('');
  const [kmToRun, setKmToRun] = useState('');
  const [description, setDescription] = useState('');
  

  // para guardar el evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      date: date,
      startAtPlace: startAtPlace,
      endAtPlace: endAtPlace,
      kmToRun: kmToRun,
      description: description
    }
    try {
        const result = await axios.post("http://localhost:8080/events", data,
            {
              headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }});
      console.log("¡Evento creado con éxito!");
      console.log(result)
      navigate("/events")
    } catch (error) {
      console.error("Error al guardar el evento:", error);
    }
  };
  const [userRole, setUserRole] = useState(null);
  
      useEffect(() => {
          const role = getUserRole();
          setUserRole(role);
      }, []);
  

  return (
    <div className="w-50 mx-auto border p-5 shadow bg-body-secondary border-light-secondary rounded-lg">

      <h1> Create Event </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title: </label>
          <input type="text"
                 required
                 className="form-control"
                 onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date: </label>
          <input type="date"
                 required
                  className="form-control"
                  onChange={(e) => setDate(e.target.value)}
          />
  
        </div>

        <div className="mb-3">
          <label htmlFor="startAtPlace" className="form-label">Start At Place: </label>
          <input type="text"
                 required
                 className="form-control"
                 onChange={(e) => setStartAtPlace(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endAtPlace" className="form-label">End At Place: </label>
          <input type="text"
                 required
                 className="form-control"
                 onChange={(e) => setEndAtPlace(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="kmToRun" className="form-label">KM To Run: </label>
          <input type="text"
                 required
                 className="form-control"
                 onChange={(e) => setKmToRun(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description: </label>
          <textarea type="text"
                    style= {{resize: "none"}}
                    rows = "5"
                 className="form-control"
                    required
                 onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {userRole === "COACH" && (
          <Button className="btn-primary" type="submit" text="Create event" ></Button>
        )}

      </form>
    </div>
  );
};

export default EventPostForm;