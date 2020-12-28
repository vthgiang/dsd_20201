import React, { useEffect, useRef, useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Polygon} from "react-google-maps"
import FlightPath from './FlightPath';

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

    const {flightPathView} = props;
    const mapRef = useRef(null);

    function onClick(t, map, coord){
        console.log(t.latLng.lat(), t.latLng.lng());
    }

    useEffect(()=>{
        if(flightPathView == null) return;
        const {flightPoints} = flightPathView;
        var bounds = new window.google.maps.LatLngBounds();
        for(let point of flightPoints){
            let tmp = new window.google.maps.LatLng(point.locationLat, point.locationLng);
            bounds.extend(tmp);
        }
        mapRef.current.fitBounds(bounds);
    }, [flightPathView]);

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={10}
            defaultCenter={{ lat: 20.99933610536628, lng: 105.8329881666537 }}
            onClick={onClick}
        >
            {flightPathView && <FlightPath flightPoints={flightPathView.flightPoints} />}
            {flightPathView && flightPathView.zone && <Polygon 
                path={getPathFromZone(flightPathView.zone)}
                options={{
                    strokeColor: "#0000FF",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: "#fff",
                    fillOpacity: 0.2
                }}
            />}
        </GoogleMap>
    )}
)

export default function Map(props){
    
    return <MyMapComponent {...props}/>;
}

function getPathFromZone(zone){
    // console.log(zone);
    return [
        {lat: zone.startPoint.lat, lng: zone.startPoint.lng},
        {lat: zone.endPoint.lat, lng: zone.startPoint.lng},
        {lat: zone.endPoint.lat, lng: zone.endPoint.lng},
        {lat: zone.startPoint.lat, lng: zone.endPoint.lng}
    ];
}