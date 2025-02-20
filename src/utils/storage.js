export const loadProgress = () => {
    try {
        const saved = localStorage.getItem('challengeProgress');
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error('Error loading progress:', error);
        return {};
    }
};

export const saveProgress = (progress) => {
    try {
        localStorage.setItem('challengeProgress', JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
};
