import React, { useEffect, useRef, useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, Polygon, Circle, InfoWindow} from "react-google-maps"
import { getZoneById } from '../../../apis/zone';

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
    const {flightPath} = props;
    const {flightPoints} = flightPath;

    const [location, setLocation] = useState(null);
    const [zone, setZone] = useState(null);
    
    
    // const [open, setOpen] = useState(false);
    // const openInfo = () => {
    //     console.log("drone clicked");
    //     setOpen(true);
    // }
    // const closeInfo = () => {
    //     setOpen(false);
    // }
    
    // function onClick(e){
    //     console.log(e.latLng.lat(), e.latLng.lng());
    //     setNewPoint({...newPoint, locationLat: e.latLng.lat(), locationLng: e.latLng.lng()});
    //     setSelectedObject(null);
    // }

    // const handlePointClick = (index) => {
    //     console.log('point clicked');
    //     const object = monitoredObjectList[index];
    //     setNewPoint({...newPoint, locationLat: object.lat, locationLng: object.lng});
    //     if(object.height && object.height + 10 > heightPoint) setHeightPoint(object.height + 10);
    //     setMonitoredObjectId(object._id);
    //     console.log(object);
    //     setSelectedObject(object);
    // }

    useEffect(()=> {
        if(!flightPoints || flightPoints.length == 0) return;
        var bounds = new window.google.maps.LatLngBounds();

        for(let point of flightPoints){
            const lat_lng = new window.google.maps.LatLng(point.locationLat, point.locationLng);
            bounds.extend(lat_lng);
        }

        mapRef.current.fitBounds(bounds);

        getZoneById(flightPath.idSupervisedArea)
            .then(zone => {
                console.log('zone', zone);
                setZone(zone);
            })
            .catch(err => {
                console.log(err);
            });
        console.log(flightPath)
    }, [])

    useEffect(() => {
        // random vi tri bay
        if(!flightPoints || flightPoints.length < 2) return;
        const index = Math.trunc(Math.random()*(flightPoints.length-1));
        const startPoint = flightPoints[index];
        const endPoint = flightPoints[index+1];
        setLocation({
            lat: (startPoint.locationLat + endPoint.locationLat)/2,
            lng: (startPoint.locationLng + endPoint.locationLng)/2
        })
    }, [])

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={10}
            defaultCenter={{ lat: 20.99933610536628, lng: 105.8329881666537 }}
            // onClick={onClick}
        >
            {flightPoints.length !== 0 && flightPoints.map( (point, index) => 
            <Marker
                key={index}
                label={index.toString()}
                position={{lat: point.locationLat, lng: point.locationLng}}
            />)}
            {flightPoints.length >= 2 && 
            <Polyline 
                path={getPathFromPoints(flightPoints)}
                options={{strokeColor: "red", 
                strokeOpacity: 1,
                strokeWeight: 3}}
            />}
            {location && <Circle 
                center={location}
                radius={30}
                anchor= {new window.google.maps.Point(5, 58)}
                options={{
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#0000FF",
                    fillOpacity: 1,
                }}
                // onClick={openInfo}    
            />}
            {zone && <Polygon
                path={getPathFromZone(zone)}
                options={{
                    strokeColor: "#0000FF",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: "#fff",
                    fillOpacity: 0.2
                }}
            />}
            {/* { open && <InfoWindow onCloseClick={closeInfo} position={location}>
                    <div>
                        <span>OK</span>
                    </div>
                </InfoWindow>} */}
            {/* {monitoredObjectList.length != 0 && monitoredObjectList.map((object, index) => <Circle 
                onClick={()=>handlePointClick(index)}
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
            />)} */}
        </GoogleMap>
    )}
)

export default function Map(props){
    
    return <MyMapComponent {...props}/>;
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