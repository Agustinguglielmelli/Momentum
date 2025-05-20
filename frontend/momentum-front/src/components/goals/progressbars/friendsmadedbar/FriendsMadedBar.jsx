
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getFriendsMadedByUser } from '../../../../api/functions';

function FriendsProgressSection({ userId }) {
    return (
        <div>
            <CustomizableProgressBar
                userId={userId}
                fetchData={getFriendsMadedByUser}
                label="Friends made"
                unit="Friends"
                initialTarget={100}
            />
        </div>
    );
}

export default FriendsProgressSection;
