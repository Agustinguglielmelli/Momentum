
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getGoalsCompletedByUser} from '../../../../api/functions';

function GoalsProgressSection({userId, initialTarget, color, onRemove, onEdit}) {
    return (
        <CustomizableProgressBar
            userId={userId}
            fetchData={() => getGoalsCompletedByUser(userId)}
            label="Goals Completed"
            unit=""
            initialTarget={initialTarget}
            customColor={color}
            onRemove={onRemove}
            onEdit={onEdit}
            hideControls={true}
        />
    );
}

export default GoalsProgressSection;
