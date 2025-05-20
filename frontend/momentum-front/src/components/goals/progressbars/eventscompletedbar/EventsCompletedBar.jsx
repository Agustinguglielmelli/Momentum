
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getEventsCompletedByUser } from '../../../../api/functions';

function EventsProgressSection({ userId }) {
    return (
        <div>
            <CustomizableProgressBar
                userId={userId}
                fetchData={getEventsCompletedByUser}
                label="Events assisted"
                unit="number"
                initialTarget={10}
            />
        </div>
    );
}

export default EventsProgressSection;