
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getFriendsMadeByUser } from '../../../../api/functions';

function FriendsProgressSection({userId, initialTarget, color, onRemove, onEdit}) {
    return (
        <CustomizableProgressBar
            userId={userId}
            fetchData={() => getFriendsMadeByUser(userId)}
            label="Friends Made"
            unit=""
            initialTarget={initialTarget}
            customColor={color}
            onRemove={onRemove}
            onEdit={onEdit}
            hideControls={true}
        />
    );
}
export default FriendsProgressSection;
