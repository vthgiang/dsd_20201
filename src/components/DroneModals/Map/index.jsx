import React, { useEffect, useRef, useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline} from "react-google-maps"

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
    const {newPoint, setNewPoint, flightPoint} = props;

    function onClick(e){
        console.log(e.latLng.lat(), e.latLng.lng());
        setNewPoint({...newPoint, locationLat: e.latLng.lat(), locationLng: e.latLng.lng()});
    }
    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={10}
            defaultCenter={{ lat: 20.99933610536628, lng: 105.8329881666537 }}
            onClick={onClick}
        >
            {flightPoint.length !== 0 && flightPoint.map( (point, index) => 
            <Marker
                key={index}
                position={{lat: point.locationLat, lng: point.locationLng}}
            />)}
            {flightPoint.length >= 2 && 
            <Polyline 
                path={getPathFromPoints(flightPoint)}
                options={{strokeColor: "red", 
                strokeOpacity: 1,
                strokeWeight: 3}}
            />}
        </GoogleMap>
    )}
)

export default function Map(props){
    
    return <MyMapComponent {...props}/>;
}

function getPathFromPoints(flightPoints){
    return flightPoints.map( point => ({lat: point.locationLat, lng: point.locationLng}));
}