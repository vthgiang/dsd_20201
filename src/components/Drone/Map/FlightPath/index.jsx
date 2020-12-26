import React from 'react';
import { Polyline } from 'react-google-maps';
import MarkerInfo from '../MarkerInfo';

export default function FlightPath({flightPoints}){

    return (<>{ flightPoints.length !== 0 && (<>
        <Polyline 
            path={getPathFromPoints(flightPoints)}
            options={{strokeColor: "red", 
            strokeOpacity: 1,
            strokeWeight: 3}}
        />
        {flightPoints.map((point, index) => <MarkerInfo key={index} point={point} />)}
        </>)
        
    }
    </>);
}

function getPathFromPoints(flightPoints){
    return flightPoints.map( point => ({lat: point.locationLat, lng: point.locationLng}));
}