import { compose, withProps } from 'recompose';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Polygon,
  } from 'react-google-maps';
import React, { useEffect, useState } from 'react';
import { getZonebyAreaId } from '../../../../../../apis/zone';
export const MapComponent = compose(
    withProps({
      googleMapURL:
        'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU',
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
  )((props) => {
        const {area} = props;
        const [zoneList, setZoneList] = useState([]);

        useEffect(() => {
            // load zone co trong mien
            if(!area) return;

            getZonebyAreaId(area._id)
                .then(zones => setZoneList(zones));
            
        }, [area]);

    return (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 21.0245, lng: 105.84117 }}>
        {/* {props.chooseArea.map((area, index) => {
            return ( // area and old zone
            <Polygon
                path={area}
                key={index}
                editable={true}
                onClick={props.onMarkerClick}
                options={{
                strokeColor: '#FF0000',
                strokeWeight: 1,
                }}
            ></Polygon>
            );
      })} */}

        {area && <Polygon
                path={getPathFromZone(area)}
                editable={true}
                onClick={props.onMarkerClick}
                options={{
                strokeColor: '#FF0000',
                strokeWeight: 1,
                }}
            ></Polygon>}
        {zoneList.length !== 0 && zoneList.map((zone, index) => <Polygon
                path={getPathFromZone(zone)}
                key={index}
                editable={true}
                onClick={props.onMarkerClick}
                options={{
                strokeColor: '#FF0000',
                strokeWeight: 1,
                }}
            ></Polygon>)}
      <Polygon // this is new zone
        path={props.triangleCoords}
        onClick={props.onMarkerClick}
        key={1}
        editable={true}
        options={{
          strokeColor: '#0000FF',
          strokeWeight: 1,
        }}
      />
    </GoogleMap>
  )});

function getPathFromZone(zone){
    // console.log('zone', zone);
    return [
        {lat: zone.startPoint.latitude, lng: zone.startPoint.longitude},
        {lat: zone.endPoint.latitude, lng: zone.startPoint.longitude},
        {lat: zone.endPoint.latitude, lng: zone.endPoint.longitude},
        {lat: zone.startPoint.latitude, lng: zone.endPoint.longitude}
    ];
}