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
                                     hideControls = false,
                                     isCompleted = false
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
        const percentage = Math.min(100, Math.round((currentValue / targetValue) * 100));
        return isCompleted ? 100 : percentage;
    };


    return (
        <div style={{
            maxWidth: "400px",
            margin: "20px auto",
            position: 'relative',
            border: isCompleted ? '2px solid #28a745' : '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: isCompleted ? '#f8fff9' : 'white'
        }}>
            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                {!isCompleted && (
                    <button onClick={onEdit} /* ... estilos existentes */>
                        ✏️
                    </button>
                )}
                <button onClick={onRemove} /* ... estilos existentes */>
                    ×
                </button>
            </div>

            <h4>
                {label}
                {isCompleted && <span style={{ color: '#28a745', marginLeft: '8px' }}>✅</span>}
            </h4>

            <ProgressBar
                animated={!isCompleted}
                now={calculatePercentage()}
                label={`${calculatePercentage()}%`}
                style={{ backgroundColor: "#e9ecef" }}
            >
                <ProgressBar
                    now={calculatePercentage()}
                    style={{ backgroundColor: isCompleted ? '#28a745' : color }}
                />
            </ProgressBar>

            {isLoading ? (
                <div className="text-center my-2">
                    <small>Loading progress...</small>
                </div>
            ) : (
                <div className="mt-2">
                    <strong>{currentValue}</strong> {unit} de <strong>{targetValue}</strong> {unit}
                    {isCompleted ? (
                        <span style={{ color: '#28a745', marginLeft: '8px' }}>
                            - ¡Completado! 🎉
                        </span>
                    ) : (
                        " completados"
                    )}
                </div>
            )}

            {/* El resto del componente permanece igual */}
        </div>
    );
}

export default CustomizableProgressBar;