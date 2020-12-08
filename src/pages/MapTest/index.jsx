import React, { useRef } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {

    const mapRef = useRef(null);

    function onClick(t, map, coord){
        console.log(t.latLng.lat(), t.latLng.lng());
        // console.log(mapRef.current);
        // var first = new window.google.maps.LatLng(21.633724159912738, 104.73234736053068);
        // var second = new window.google.maps.LatLng(20.382516695905508, 107.34709345428068);
        // var bounds = new window.google.maps.LatLngBounds();
        // bounds.extend(first);
        // bounds.extend(second);
        // mapRef.current.fitBounds(bounds);
    }

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={10}
            defaultCenter={{ lat: 20.99933610536628, lng: 105.8329881666537 }}
            onClick={onClick}
        >
            <Polyline path={[{lat: 58.41947, lng: -30}, {lat: -51.10061, lng: 147.93535}]}
                options={{strokeColor: "red", 
                strokeOpacity: 1,
                strokeWeight: 5}}
            />
        </GoogleMap>
    )}
)

export default function MapTest(){
    function onClick(t, map, coord){
        console.log(t.latLng.lat(), t.latLng.lng());
    }
    return <MyMapComponent onClick={onClick}/>;
}