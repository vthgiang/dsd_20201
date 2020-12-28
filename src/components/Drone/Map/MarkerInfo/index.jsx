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
              <span>Thời gian bay đến: {point.timeCome} phút</span><br/>
              <span>Thời gian dừng: {point.timeStop} phút</span><br/>
              <span>Độ cao: {point.flightHeight} m</span><br/>
            </div>
        </InfoWindow>}
    </Marker>;
}

export default MarkerInfo;