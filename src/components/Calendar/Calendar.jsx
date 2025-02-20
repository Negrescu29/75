// src/components/Calendar/Calendar.jsx
import React, { useState, useEffect } from 'react';
import DayCard from '../DayCard/DayCard';
import { loadProgress, saveProgress } from '../../utils/storage';
import './Calendar.css';

const Calendar = () => {
    const [progress, setProgress] = useState({});
    const [statistics, setStatistics] = useState({
        totalDaysCompleted: 0,
        totalWorkouts: 0,
        sportBreakdown: {},
        totalPagesRead: 0,
        totalCodingMinutes: 0,
        averageSleepTime: 0,
        totalSleepTime: 0,
        daysTracked: 0,
        sugarFreeDays: 0
    });

    useEffect(() => {
        const savedProgress = loadProgress();
        if (savedProgress) {
            setProgress(savedProgress);
            updateStatistics(savedProgress);
        }
    }, []);

    useEffect(() => {
        saveProgress(progress);
        updateStatistics(progress);
    }, [progress]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return {
            hours,
            minutes,
            seconds
        };
    };

    const updateStatistics = (currentProgress) => {
        const stats = {
            totalDaysCompleted: 0,
            totalWorkouts: 0,
            sportBreakdown: {},
            totalPagesRead: 0,
            totalCodingMinutes: 0,
            totalSleepTime: 0,
            daysTracked: 0,
            sugarFreeDays: 0
        };

        Object.values(currentProgress).forEach((day) => {
            let isDayComplete = true;

            Object.entries(day).forEach(([activityId, activity]) => {
                if (!activity.completed) {
                    isDayComplete = false;
                    return;
                }

                switch(activityId) {
                    case 'sleep':
                        if (activity.duration) {
                            stats.totalSleepTime += activity.duration;
                            stats.daysTracked++;
                        }
                        break;
                    case 'noSugar':
                        stats.sugarFreeDays++;
                        break;
                    case 'read':
                        stats.totalPagesRead += 10;
                        break;
                    case 'code':
                        stats.totalCodingMinutes += 30;
                        break;
                    case 'sport1':
                    case 'sport2':
                        if (activity.sportType && activity.duration) {
                            stats.totalWorkouts++;
                            const currentSport = stats.sportBreakdown[activity.sportType] || { count: 0, duration: 0 };
                            stats.sportBreakdown[activity.sportType] = {
                                count: currentSport.count + 1,
                                duration: currentSport.duration + activity.duration
                            };
                        }
                        break;
                    default:
                        break;
                }
            });

            if (isDayComplete) {
                stats.totalDaysCompleted++;
            }
        });

        stats.averageSleepTime = stats.daysTracked > 0
            ? stats.totalSleepTime / stats.daysTracked
            : 0;

        setStatistics(stats);
    };

    return (
        <div className="calendar-container">
            <div className="statistics-panel">
                <h2>Progress Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>Days Completed</h3>
                        <p>{statistics.totalDaysCompleted} / 75</p>
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${(statistics.totalDaysCompleted / 75) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="stat-item">
                        <h3>Sugar-Free Days</h3>
                        <p>{statistics.sugarFreeDays}</p>
                        <span className="stat-subtitle">days without sugar</span>
                    </div>
                    <div className="stat-item">
                        <h3>Average Sleep</h3>
                        <p>{Math.floor(statistics.averageSleepTime / 60)}h {Math.round(statistics.averageSleepTime % 60)}m</p>
                        <span className="stat-subtitle">per day</span>
                    </div>
                    <div className="stat-item">
                        <h3>Total Sleep Time</h3>
                        <p>{Math.floor(statistics.totalSleepTime / 60)}h {statistics.totalSleepTime % 60}m</p>
                        <span className="stat-subtitle">across {statistics.daysTracked} days</span>
                    </div>
                    <div className="stat-item">
                        <h3>Pages Read</h3>
                        <p>{statistics.totalPagesRead}</p>
                        <span className="stat-subtitle">total pages</span>
                    </div>
                    <div className="stat-item">
                        <h3>Coding Time</h3>
                        <p>{Math.floor(statistics.totalCodingMinutes / 60)}h {statistics.totalCodingMinutes % 60}m</p>
                        <span className="stat-subtitle">total time coded</span>
                    </div>
                    <div className="stat-item">
                        <h3>Total Workouts</h3>
                        <p>{statistics.totalWorkouts}</p>
                        <span className="stat-subtitle">completed exercises</span>
                    </div>
                </div>

                <div className="sport-breakdown">
                    <h3>Workout Breakdown</h3>
                    <div className="sport-stats">
                        {Object.entries(statistics.sportBreakdown).map(([sport, data]) => {
                            const time = formatTime(data.duration);
                            return (
                                <div key={sport} className="sport-stat-item">
                                    <span>{sport}</span>
                                    <div className="sport-count">
                                        <span>{data.count} workouts</span>
                                        <span className="total-time">
                      {time.hours > 0 && `${time.hours}h `}
                                            {time.minutes > 0 && `${time.minutes}m `}
                                            {time.seconds}s
                    </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="calendar">
                {[...Array(75)].map((_, index) => (
                    <DayCard
                        key={index}
                        day={index + 1}
                        progress={progress[index] || {}}
                        onProgressUpdate={(activityProgress) => {
                            setProgress(prev => ({
                                ...prev,
                                [index]: activityProgress
                            }));
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
