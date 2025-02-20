import React, { useState } from 'react';
import './SportSelector.css';

const sportTypes = [
    'Walking',
    'Running',
    'Cycling',
    'Gym'
];

const SportSelector = ({ value, duration, onChange, onClose }) => {
    const [selectedSport, setSelectedSport] = useState(value);
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const handleSubmit = () => {
        if (selectedSport && (minutes || seconds)) {
            const totalSeconds = (Number(minutes) * 60) + Number(seconds);
            onChange(selectedSport, totalSeconds);
        }
    };

    return (
        <div className="sport-selector-overlay" onClick={onClose}>
            <div className="sport-selector" onClick={e => e.stopPropagation()}>
                <h4>Select workout type</h4>
                {sportTypes.map(sport => (
                    <button
                        key={sport}
                        className={`sport-option ${selectedSport === sport ? 'selected' : ''}`}
                        onClick={() => setSelectedSport(sport)}
                    >
                        {sport}
                    </button>
                ))}
                <div className="time-selector">
                    <label>Duration:</label>
                    <div className="time-inputs">
                        <div className="time-input-group">
                            <input
                                type="number"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                placeholder="0"
                                min="0"
                            />
                            <span>minutes</span>
                        </div>
                        <div className="time-input-group">
                            <input
                                type="number"
                                value={seconds}
                                onChange={(e) => setSeconds(Math.min(59, Number(e.target.value)))}
                                placeholder="0"
                                min="0"
                                max="59"
                            />
                            <span>seconds</span>
                        </div>
                    </div>
                </div>
                <div className="selector-footer">
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={!selectedSport || (!minutes && !seconds)}
                    >
                        Save
                    </button>
                    <button
                        className="clear-button"
                        onClick={() => {
                            onChange(null);
                            onClose();
                        }}
                    >
                        Clear Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SportSelector;
