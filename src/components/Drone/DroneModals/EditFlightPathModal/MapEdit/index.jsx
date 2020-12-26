import React, { useEffect, useRef, useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, Polygon, Circle} from "react-google-maps"

const MapEdit = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYUJNgbfjL9QvyUobTRpfmhOpLlvtLaAY",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
    const {flightPoints, zone, monitoredObjectList, setSelectedPoint} = props;

    const mapRef = useRef(null);

    useEffect(()=> {
        var bounds = new window.google.maps.LatLngBounds();

        const startPoint = new window.google.maps.LatLng(zone.startPoint.lat, zone.startPoint.lng);
        bounds.extend(startPoint);
        const endPoint = new window.google.maps.LatLng(zone.endPoint.lat, zone.endPoint.lng);
        bounds.extend(endPoint);
        
        mapRef.current.fitBounds(bounds);
    }, [])

    const handlePointClick = (point) => {
        console.log("point clicked");
        if(setSelectedPoint != null) setSelectedPoint(point);
    }

    const handleMapClick = () => {
        setSelectedPoint(null);
    }

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={10}
            defaultCenter={{ lat: 20.99933610536628, lng: 105.8329881666537 }}
            onClick={handleMapClick}
        >
            {flightPoints.length !== 0 && flightPoints.map( (point, index) => 
            <Marker
                onClick={() => handlePointClick(point)}
                key={index}
                position={{lat: point.locationLat, lng: point.locationLng}}
            />)}
            {flightPoints.length >= 2 && 
            <Polyline 
                path={getPathFromPoints(flightPoints)}
                options={{strokeColor: "red", 
                strokeOpacity: 1,
                strokeWeight: 3}}
            />}
            {zone != null && <Polygon 
                path={getPathFromZone(zone)}
                // onClick={onClick}
                options={{
                    strokeColor: "#0000FF",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: "#fff",
                    fillOpacity: 0.2
                }}
            />}
            {monitoredObjectList.length != 0 && monitoredObjectList.map((object, index) => <Circle 
                // onClick={()=>handlePointClick(index)}
                key={index}
                center={{ lat: object.lat, lng: object.lng }}
                radius={30}
                anchor= {new window.google.maps.Point(5, 58)}
                options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 1,
                }}
            />)}
        </GoogleMap>
    )}
)
  
export default function Map(props){
    
    return <MapEdit {...props}/>;
}

function getPathFromPoints(flightPoints){
    return flightPoints.map( point => ({lat: point.locationLat, lng: point.locationLng}));
}
function getPathFromZone(zone){
    return [
        {lat: zone.startPoint.lat, lng: zone.startPoint.lng},
        {lat: zone.endPoint.lat, lng: zone.startPoint.lng},
        {lat: zone.endPoint.lat, lng: zone.endPoint.lng},
        {lat: zone.startPoint.lat, lng: zone.endPoint.lng}
    ];
}