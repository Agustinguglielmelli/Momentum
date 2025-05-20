
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ColorSelector from './ColorSelector'; // Asegurate que la ruta sea correcta según tu estructura
import 'react-colorful/dist/index.css';

function CustomizableProgressBar({ userId, fetchData, initialTarget = 100, label = "Progreso", unit = "" }) {
    const [currentValue, setCurrentValue] = useState(0);
    const [targetValue, setTargetValue] = useState(initialTarget);
    const [color, setColor] = useState("#007bff");
    const [error, setError] = useState(null);

    const fetchProgress = async () => {
        try {
            const response = await fetchData(userId);
            setCurrentValue(response.data);
            setError(null);
        } catch (err) {
            setError("Error al cargar el progreso");
            console.error(err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchProgress();
        };
        loadData();
    }, [userId]);

    const calculatePercentage = () => {
        if (targetValue <= 0) return 0;
        return Math.min(100, Math.round((currentValue / targetValue) * 100));
    };

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto" }}>
            <h4>{label}</h4>

            <ProgressBar
                animated
                now={calculatePercentage()}
                label={`${calculatePercentage()}%`}
                style={{ backgroundColor: "#e9ecef" }}
            >
                <ProgressBar
                    now={calculatePercentage()}
                    style={{ backgroundColor: color }}
                />
            </ProgressBar>

            <div className="mt-2">
                {currentValue} {unit} de {targetValue} {unit} completados
            </div>

            <div className="mt-4">
                <label>
                    🎯 Meta:
                    <input
                        type="number"
                        value={targetValue}
                        onChange={(e) => setTargetValue(Number(e.target.value))}
                        className="form-control"
                        min="0"
                    />
                </label>
                <ColorSelector color={color} onChange={setColor} />
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default CustomizableProgressBar;
