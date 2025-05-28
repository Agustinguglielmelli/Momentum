import React, { useState, useEffect, useCallback } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ColorSelector from './ColorSelector';

function CustomizableProgressBar({
                                     userId,
                                     fetchData,
                                     initialTarget = 100,
                                     label = "Progress",
                                     unit = "",
                                     customColor = "#007bff",
                                     onRemove,
                                     onEdit,
                                     hideControls = false
                                 }) {
    const [currentValue, setCurrentValue] = useState(0);
    const [targetValue, setTargetValue] = useState(initialTarget);
    const [color, setColor] = useState(customColor);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProgress = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetchData();
            setCurrentValue(response.data);
            setError(null);
        } catch (err) {
            setError("Error loading progress");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchData]);

    useEffect(() => {
        // Initial load
        fetchProgress();

        // Periodic refresh
        const interval = setInterval(fetchProgress, 30000);

        // Refresh when tab becomes visible
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchProgress();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [fetchProgress]);

    const calculatePercentage = () => {
        if (targetValue <= 0) return 0;
        return Math.min(100, Math.round((currentValue / targetValue) * 100));
    };

    return (
        <div style={{
            maxWidth: "400px",
            margin: "20px auto",
            position: 'relative',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px'
        }}>
            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                <button
                    onClick={onEdit}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginRight: '10px',
                        color: '#6c757d'
                    }}
                    title="Editar"
                >
                    ✏️
                </button>
                <button
                    onClick={onRemove}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        color: '#dc3545'
                    }}
                    title="Eliminar"
                >
                    ×
                </button>
            </div>

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

            {isLoading ? (
                <div className="text-center my-2">
                    <small>Loading progress...</small>
                </div>
            ) : (
                <div className="mt-2">
                    {currentValue} {unit} de {targetValue} {unit} completados
                </div>
            )}

            {!hideControls && (
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
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default CustomizableProgressBar;