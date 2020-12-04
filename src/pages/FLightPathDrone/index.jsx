import React, { useState, useEffect } from "react";
import { TableHeader, Pagination, Search } from "../../components/DataTable";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import mapStyles from "./mapStyles";


function Map() {


  const [selectedPoint, setSelectedPoint] = useState(null);

  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

  const headers = [
    { name: "IdDrone", field: "idDrone", sortable: true },
    { name: "Tên đường bay", field: "name", sortable: true },
    { name: "Id Miền giám sát", field: "idSupervisedArea", sortable: true },
    { name: "Trần bay", field: "heightFlight", sortable: false },
    { name: "Bắt đầu", field: "timeStart", sortable: false },
    { name: "Kết thúc", field: "timeEnd", sortable: false },
   
  ];
  const [path, setPath] = useState([]);
  const [flightPoints, setFlightPoints] = useState([])
  const getAllFlightPath = () => {
    fetch(`http://skyrone.cf:6789/flightPath/getAllPath`)
        .then(response => response.json())
        .then(json => {
            setPath(json);
        });
  };

  const getPointOfPath = (id) => {
    fetch(`http://skyrone.cf:6789/flightPoint/getPointOfPath/`+id)
        .then(response => response.json())
        .then(json => {

          setFlightPoints(json);
        });
  };

  useEffect(() => {
    getAllFlightPath();
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPoint(null);
        
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
  <>
    <GoogleMap
      onClick={(e) => {
        console.log("NA "+e.latLng.lat());
        setSelectedPoint(e);
      }}
      defaultZoom={13}
      defaultCenter={{ lat: 21.031558, lng: 105.864435 }}
      // defaultOptions={{ styles: mapStyles }}
    >
      
      {flightPoints.map(point => (
            <Marker
            key={point.id}
              position={{
                lat: point.locationLat,
                lng: point.locationLng
              }}
              onClick={() => {
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
        <p>{selectedPoint.latLng.lat()} - {selectedPoint.latLng.lng()}</p>
          </div>
        </InfoWindow>
      )}

    </GoogleMap>
    <Fab 
    color="primary" aria-label="add" style={style}
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/flight-point';
      }}
    >
        <AddIcon />
    </Fab>
        <table style={{ height: `45%` }}className="table table-striped">
          <TableHeader
              headers={headers}
              // onSorting={(field, order) =>
              //     setSorting({ field, order })
              // }
          />
          <tbody>
              {path.map(pathFlight => (
                  <tr >
                      <th scope="row" key={pathFlight.id}>
                          {pathFlight.idDrone}
                      </th>
                      <td>{pathFlight.name}</td>
                      <td>{pathFlight.idSupervisedArea}</td>
                      <td>{pathFlight.heightFlight}</td>
                      <td>{pathFlight.timeStart}</td>
                      <td>{pathFlight.timeEnd}</td>
                      <td>
                      <Button
                        onClick={ () => {
                          console.log("A Td Element was clicked!" + pathFlight.id)
                          getPointOfPath(pathFlight.id)
                        }
                        }
                        variant="contained"
                        color="primary"
                      >
                      Xem đường bay
                      </Button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    

          <MapWrapped
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBYUJNgbfjL9QvyUobTRpfmhOpLlvtLaAY`}
              loadingElement={<div style={{ height: `65%` }} />}
              containerElement={<div style={{ height: `65%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
         
      
      

  );
}
