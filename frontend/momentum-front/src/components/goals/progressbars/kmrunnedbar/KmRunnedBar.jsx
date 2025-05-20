
import React from 'react';
import CustomizableProgressBar from '../CustomizableProgressBar';
import { getKmRunnedByUser } from '../../../../api/functions';

function KmProgressSection({ userId }) {
    return (
        <div>
            <CustomizableProgressBar
                userId={userId}
                fetchData={getKmRunnedByUser}
                label="Kilómetros recorridos"
                unit="km"
                initialTarget={50}
            />
        </div>
    );
}

export default KmProgressSection;
