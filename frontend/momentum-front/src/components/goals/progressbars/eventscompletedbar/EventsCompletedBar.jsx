
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getEventsCompletedByUser } from '../../../../api/functions';

function EventsProgressSection({userId, initialTarget, color, onRemove, onEdit}) {
    return (
        <CustomizableProgressBar
            userId={userId}
            fetchData={()=> getEventsCompletedByUser(userId)}
            label="Events Completed"
            unit=""
            initialTarget={initialTarget}
            customColor={color}
            onRemove={onRemove}
            onEdit={onEdit}
            hideControls={true}
        />
    );
}

export default EventsProgressSection;