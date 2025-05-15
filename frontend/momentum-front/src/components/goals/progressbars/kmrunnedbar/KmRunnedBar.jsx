
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios'; // o tu librería preferida para llamadas HTTP

function UserProgressBar({ userId, targetKm }) {
    const [currentKm, setCurrentKm] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para calcular el porcentaje completado
    const calculatePercentage = () => {
        if (targetKm <= 0) return 0;
        return Math.min(100, Math.round((currentKm / targetKm) * 100));
    };

    // Función para obtener los km actuales del usuario
    const fetchUserProgress = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/users/${userId}/progress`);
            setCurrentKm(response.data.kmRun);
            setError(null);
        } catch (err) {
            setError('Error al cargar el progreso');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Efecto para cargar datos iniciales y configurar actualizaciones periódicas
    useEffect(() => {
        fetchUserProgress();

        // Opcional: Configurar actualización periódica (cada 30 segundos)
        const intervalId = setInterval(fetchUserProgress, 30000);

        return () => clearInterval(intervalId);
    }, [userId]);

    if (loading) return <div>Cargando progreso...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h4>Progreso de Kilómetros</h4>
            <ProgressBar
                animated
                now={calculatePercentage()}
                label={`${calculatePercentage()}%`}
            />
            <div className="mt-2">
                {currentKm} km de {targetKm} km completados
            </div>
        </div>
    );
}

export default UserProgressBar;