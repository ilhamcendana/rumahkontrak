import React from 'react';
import ShowUnitAdmin from '../ShowUnitAdmin';

const KontrakanDisewa = ({ data, kontrakanLoading }) => {
    return (
        <ShowUnitAdmin noActionBtn noqr data={data} title='Kontrakan yang sudah disewa' isLoading={kontrakanLoading} />
    );
}

export default KontrakanDisewa;