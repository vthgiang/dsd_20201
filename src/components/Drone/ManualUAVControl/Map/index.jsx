import React, { useContext, useEffect, useRef, useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, Polygon, Circle} from "react-google-maps"
import {UAVContext} from '../Context';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYUJNgbfjL9QvyUobTRpfmhOpLlvtLaAY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
    const mapRef = useRef(null);
    const {desPos, setDesPos, curPos, droneSpeed, droneHeight, isMoving} = useContext(UAVContext);

    const handleMapClick = (e) => {
        console.log(e.latLng.lat(), e.latLng.lng());
        if(isMoving) return;
        setDesPos({lat: e.latLng.lat(), lng: e.latLng.lng()});
    }

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={15}
            defaultCenter={{ lat: 21.005036744372838, lng: 105.84404867004567 }}
            onClick={handleMapClick}
        >
            {curPos && <Marker position={curPos} label={`speed: ${droneSpeed}m/s-height: ${droneHeight}m`}/>}
            {desPos && <Marker position={desPos} label='Destination'/>}
            {curPos && desPos != null && <Polyline 
                path={getPathFromPoints([curPos, desPos])}
                options={{
                    strokeColor: "#0000FF",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: "#fff",
                    fillOpacity: 0.2
                }}/>}
        </GoogleMap>
    )}
)
export default function Map(props){
    
    return <MyMapComponent {...props}/>;
}

function getPathFromPoints(flightPoints){
    return flightPoints.map( point => ({lat: point.lat, lng: point.lng}));
}
function getPathFromZone(zone){
    return [
        {lat: zone.startPoint.latitude, lng: zone.startPoint.longitude},
        {lat: zone.endPoint.latitude, lng: zone.startPoint.longitude},
        {lat: zone.endPoint.latitude, lng: zone.endPoint.longitude},
        {lat: zone.startPoint.latitude, lng: zone.endPoint.longitude}
    ];
}