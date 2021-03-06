import React, { useEffect, useRef, useState } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline, Polygon, Circle, InfoWindow} from "react-google-maps"
import { Button } from 'antd';
import { getRole } from '../../Common/info';
import { Link } from 'react-router-dom';

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
    const {
        newPoint, setNewPoint, 
        flightPoints, 
        selectedZone, selectedArea, 
        monitoredObjectList,
        setMonitoredObjectId,
        setHeightPoint, heightPoint,
        setSelectedObject, setShow
    } = props;

    const [openInfoWD, setOpenInfoWD] = useState(false);
    const [infoWDPositon, setInfoWDPosion] = useState({});

    const hideInfoWD = () => {
        setOpenInfoWD(false);
    }

    function onClick(e){
        console.log(e.latLng.lat(), e.latLng.lng());
        setNewPoint({...newPoint, locationLat: e.latLng.lat(), locationLng: e.latLng.lng()});
        setSelectedObject(null);
        hideInfoWD();
    }

    const handleMapClick = (e) => {
        if(!selectedZone) return;
        const role = getRole();
        if(role !== 'ADMIN' && role !== 'SUPER_ADMIN') return;
        console.log(e.latLng.lat(), e.latLng.lng());
        console.log('map clicked')
        setInfoWDPosion({lat: e.latLng.lat(), lng: e.latLng.lng()});
        setOpenInfoWD(true);
    }

    const handlePointClick = (index) => {
        console.log('point clicked');
        const object = monitoredObjectList[index];
        setNewPoint({...newPoint, locationLat: object.lat, locationLng: object.lng});
        if(object.height && object.height + 10 > heightPoint) setHeightPoint(object.height + 10);
        setMonitoredObjectId(object._id);
        console.log(object);
        setSelectedObject(object);
        hideInfoWD();
    }

    useEffect(()=> {
        if(!selectedZone) return;
        var bounds = new window.google.maps.LatLngBounds();

        const startPoint = new window.google.maps.LatLng(selectedZone.startPoint.latitude, selectedZone.startPoint.longitude);
        bounds.extend(startPoint);
        const endPoint = new window.google.maps.LatLng(selectedZone.endPoint.latitude, selectedZone.endPoint.longitude);
        bounds.extend(endPoint);
        
        mapRef.current.fitBounds(bounds);
    }, [selectedZone])

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={10}
            defaultCenter={{ lat: 20.99933610536628, lng: 105.8329881666537 }}
            onClick={handleMapClick}
        >
            {flightPoints.length !== 0 && flightPoints.map( (point, index) => 
            <Marker
                label={(index+1).toString()}
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
            {selectedZone != null && <Polygon 
                path={getPathFromZone(selectedZone)}
                onClick={onClick}
                options={{
                    strokeColor: "#0000FF",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: "#fff",
                    fillOpacity: 0.2
                }}
            />}
            {monitoredObjectList.length != 0 && monitoredObjectList.map((object, index) => <Circle 
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
            />)}
            {openInfoWD && <InfoWindow 
                onCloseClick={()=> setOpenInfoWD(false)}
                position={infoWDPositon}
            >
                <div>
                    {/* <span>Vị trí được chọn nằm ngoài miền</span>
                    <br/>
                    <Button type='link' onClick={()=>setShow(true)}>bấm vào đây để thêm miền mới</Button> */}
                    <Link to={`/flight-create-zone/${selectedArea._id}`}>Vị trí nằm ngoài miền<br/>bấm vào đây để thêm miền mới</Link>
                </div>
                </InfoWindow>}
        </GoogleMap>
    )}
)

export default function Map(props){
    
    return <MyMapComponent {...props}/>;
}

function getPathFromPoints(flightPoints){
    // console.log('flight points', flightPoints);
    return flightPoints.map( point => ({lat: point.locationLat, lng: point.locationLng}));
}
function getPathFromZone(zone){
    console.log('zone', zone);
    return [
        {lat: zone.startPoint.latitude, lng: zone.startPoint.longitude},
        {lat: zone.endPoint.latitude, lng: zone.startPoint.longitude},
        {lat: zone.endPoint.latitude, lng: zone.endPoint.longitude},
        {lat: zone.startPoint.latitude, lng: zone.endPoint.longitude}
    ];
}