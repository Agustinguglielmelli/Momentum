
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';

const ColorSelector = ({ color, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div style={{ marginBottom: '1rem' }}>
            <button
                onClick={() => setShowPicker(!showPicker)}
                style={{
                    padding: '8px 12px',
                    backgroundColor: color,
                    color: 'rgba(26,104,205,0.51)',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Seleccionar color
            </button>

            {showPicker && (
                <div style={{ marginTop: '10px' }}>
                    <HexColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
export default ColorSelector;