import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card'
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "../../data/skateboard-parks.json";
// import mapStyles from "./mapStyles";
var mapPath;
const FlightPath = () => {
  const [path, setPath] = useState([]);
  const getDataFlightPath = () => {
    fetch(`http://skyrone.cf:6789/flightPath/getAllPath`)
        .then(response => response.json())
        .then(json => {
            setPath(json);
            console.log(json);
        });
  };

  useEffect(() => {
    getDataFlightPath();
  }, []);

  return (
    <>
       {path.map(pathFlight => (
            <Card
            onClick={() => {
              parkData = pathFlight;

              console.log("map path ; "+parkData)
            }}
            style={{ width: '60%' }}>
              <Card.Body>
                <Card.Title>{pathFlight.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">#ID: {pathFlight.id} </Card.Subtitle>
                <Card.Text>
                <p>Thời gian xuất phátt: {pathFlight.timeStart} <br></br>
                Thời gian kết thúc: {pathFlight.timeEnd} </p>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
    </>
  )
}

function Map() {

  const [selectedPark, setSelectedPark] = useState(null);

  const [selectedPoint, setSelectedPoint] = useState(null);
  
  useEffect(() => {
    console.log("lnggnfan "+mapPath);
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
        // setSelectedPoint(null);.
        
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
  <>
  <div style={{ width: "100vw", height: "88vh" }}>
  <div className="row" style={{ height: `100%` }}>
    <div className="col-md-7" >
          <GoogleMap
      onClick={(e) => {
        console.log("NA "+e.latLng.lat());
        setSelectedPoint(e);
      }}
      defaultZoom={11}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      // defaultOptions={{ styles: mapStyles }}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
        >
          </Marker>
      ))}

      {selectedPoint && (
        <InfoWindow
          onCloseClick={() => {
          }}
          position={{
            lat: selectedPoint.latLng.lat(),
            lng: selectedPoint.latLng.lng()
            
          }}
        >
          <div>
            <h2>Na</h2>
            <p>na</p>
          </div>
        </InfoWindow>
      )}


      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    </div>
    <div className="col-md-5">
        <div><h1>Danh sách đường bay</h1></div>
            <FlightPath></FlightPath>
    </div>
  </div>
    </div>
  </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    

          <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYUJNgbfjL9QvyUobTRpfmhOpLlvtLaAY`}
              loadingElement={<div style={{ height: `50%` }} />}
              containerElement={<div style={{ height: `50%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
         
      
      

  );
}
