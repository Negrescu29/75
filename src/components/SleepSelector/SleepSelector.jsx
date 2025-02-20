import React, { useState } from 'react';
import './SleepSelector.css';

const SleepSelector = ({ value, onChange, onClose }) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    const handleSubmit = () => {
        if (hours || minutes) {
            const totalMinutes = (Number(hours) * 60) + Number(minutes);
            onChange(totalMinutes);
        }
    };

    return (
        <div className="sleep-selector-overlay" onClick={onClose}>
            <div className="sleep-selector" onClick={e => e.stopPropagation()}>
                <h4>Enter Sleep Duration</h4>
                <div className="time-inputs">
                    <div className="time-input-group">
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="0"
                            min="0"
                        />
                        <span>hours</span>
                    </div>
                    <div className="time-input-group">
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(Math.min(59, Number(e.target.value)))}
                            placeholder="0"
                            min="0"
                            max="59"
                        />
                        <span>minutes</span>
                    </div>
                </div>
                <div className="selector-footer">
                    <button
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={!hours && !minutes}
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
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SleepSelector;
