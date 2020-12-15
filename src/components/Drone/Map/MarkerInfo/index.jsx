import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Marker } from 'react-google-maps';

MarkerInfo.propTypes = {
    
};

function MarkerInfo({point}){

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return <Marker 
        position={{lat: point.locationLat, lng: point.locationLng}} 
        onClick={toggle}>
        {isOpen && <InfoWindow onCloseClick={toggle}>
            <div>
              <p>Thời gian bay đến: {point.timeCome} phút</p>
              <p>Thời gian dừng: {point.timeStop} phút</p>
              <p>Độ cao: {point.flightHeight == null ? 30 : point.flightHeight} mét</p>
            </div>
        </InfoWindow>}
    </Marker>;
}

export default MarkerInfo;