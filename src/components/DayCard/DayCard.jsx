import React from 'react';
import ActivityItem from '../ActivityItem/ActivityItem';
import './DayCard.css';

const activities = [
    { id: 'sleep', name: 'Sleep' },
    { id: 'read', name: 'Read 10 pages' },
    { id: 'code', name: 'Code 30 minutes' },
    { id: 'sport1', name: 'First workout' },
    { id: 'sport2', name: 'Second workout' },
    { id: 'noSugar', name: 'No Sugar' }
];

const DayCard = ({ day, progress, onProgressUpdate }) => {
    const isAllCompleted = progress &&
        activities.every(activity => progress[activity.id]?.completed);

    return (
        <div className={`day-card ${isAllCompleted ? 'day-completed' : ''}`}>
            <h3>Day {day}</h3>
            {activities.map(activity => (
                <ActivityItem
                    key={activity.id}
                    activity={activity}
                    completed={progress[activity.id]?.completed}
                    sportType={progress[activity.id]?.sportType}
                    duration={progress[activity.id]?.duration}
                    onChange={(completed, sportType, duration) => {
                        onProgressUpdate({
                            ...progress,
                            [activity.id]: {
                                completed,
                                sportType,
                                duration
                            }
                        });
                    }}
                />
            ))}
        </div>
    );
};

export default DayCard;
