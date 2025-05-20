
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getCaloriesBurnedByUser } from '../../../../api/functions';

function CaloriesProgressSection({ userId }) {
    return (
        <div>
            <CustomizableProgressBar
                userId={userId}
                fetchData={getCaloriesBurnedByUser}
                label="Calories Burned"
                unit="kcal"
                initialTarget={1000}
            />
        </div>
    );
}

export default CaloriesProgressSection;