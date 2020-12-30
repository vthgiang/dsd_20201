import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Marker } from 'react-google-maps';
import { secToMinFormat } from '../../Common/MapHelper';

MarkerInfo.propTypes = {
    
};

function MarkerInfo({point, index, speed}){
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return <Marker 
        title={index}
        label={index.toString()}
        position={{lat: point.locationLat, lng: point.locationLng}} 
        onClick={toggle}>
        {isOpen && <InfoWindow onCloseClick={toggle}>
            <div>
              <span>Vận tốc: {speed}</span><br/>
              <span>Thời gian bay đến: {Math.round(point.timeCome*100)/100} phút</span><br/>
              <span>Thời gian dừng: {point.timeStop} phút</span><br/>
              <span>Độ cao: {point.flightHeight} m</span><br/>
              <span>Độ cao hạ xuống: {point.flightHeightDown} m</span>
            </div>
        </InfoWindow>}
    </Marker>;
}

export default MarkerInfo;