
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getCaloriesBurnedByUser } from '../../../../api/functions';

function CaloriesProgressSection({userId, initialTarget, color, onRemove, onEdit}) {
    return (
        <CustomizableProgressBar
            userId={userId}
            fetchData={() => getCaloriesBurnedByUser(userId)}
            label="Calories Burned"
            unit="Kcal"
            initialTarget={initialTarget}
            customColor={color}
            onRemove={onRemove}
            onEdit={onEdit}
            hideControls={true}
        />
    );
}

export default CaloriesProgressSection;