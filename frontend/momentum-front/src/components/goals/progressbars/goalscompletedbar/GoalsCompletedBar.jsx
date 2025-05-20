
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getGoalsCompletedByUser } from '../../../../api/functions';

function GoalsProgressSection({ userId }) {
    return (
        <div>
            <CustomizableProgressBar
                userId={userId}
                fetchData={getGoalsCompletedByUser}
                label="Goals Completed"
                unit=""
                initialTarget={10}
            />
        </div>
    );
}

export default GoalsProgressSection;
