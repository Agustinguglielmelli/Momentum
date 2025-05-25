
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getKmRunnedByUser } from '../../../../api/functions';

function KmProgressSection({ userId, initialTarget, color, onRemove, onEdit }) {
    return (
        <CustomizableProgressBar
            userId={userId}
            fetchData={() => getKmRunnedByUser(userId)}
            label="Kilometers Runned"
            unit="km"
            initialTarget={initialTarget}
            customColor={color}
            onRemove={onRemove}
            onEdit={onEdit}
            hideControls={true}  // para ocultar inputs internos
        />
    );
}

export default KmProgressSection;
