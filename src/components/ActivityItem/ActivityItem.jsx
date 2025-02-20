import React, { useState } from 'react';
import SportSelector from '../SportSelector/SportSelector';
import SleepSelector from '../SleepSelector/SleepSelector';
import './ActivityItem.css';

const ActivityItem = ({ activity, completed, sportType, duration, onChange }) => {
    const [showSportSelector, setShowSportSelector] = useState(false);
    const [showSleepSelector, setShowSleepSelector] = useState(false);

    const handleClick = () => {
        if (activity.id === 'sleep') {
            setShowSleepSelector(true);
        } else if (activity.id.includes('sport')) {
            setShowSportSelector(true);
        } else {
            onChange(!completed);
        }
    };

    const formatSleepTime = (minutes) => {
        if (!minutes) return '';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `(${hours}h ${mins}m)`;
    };

    return (
        <>
            <div
                className={`activity ${completed ? 'completed' : ''}`}
                onClick={handleClick}
            >
                <div className="activity-content">
                    <span className="activity-name">{activity.name}</span>
                    {completed && (
                        activity.id === 'sleep' ? (
                            <span className="sleep-time">{formatSleepTime(duration)}</span>
                        ) : sportType && (
                            <span className="sport-type">({sportType})</span>
                        )
                    )}
                </div>
            </div>
            {showSportSelector && (
                <SportSelector
                    value={sportType}
                    duration={duration}
                    onChange={(sport, duration) => {
                        onChange(!!sport, sport, duration);
                        setShowSportSelector(false);
                    }}
                    onClose={() => setShowSportSelector(false)}
                />
            )}
            {showSleepSelector && (
                <SleepSelector
                    value={duration}
                    onChange={(duration) => {
                        onChange(!!duration, null, duration);
                        setShowSleepSelector(false);
                    }}
                    onClose={() => setShowSleepSelector(false)}
                />
            )}
        </>
    );
};

export default ActivityItem;
