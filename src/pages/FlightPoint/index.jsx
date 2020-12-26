import React, { useState, useEffect } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Input, Col, Row } from "antd";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";


function Map() {
  const [open, setOpen] = React.useState(true);

  const useStyles = makeStyles((theme) => ({
    input: {
      fontSize: 20,
    },
    formItem: {
      padding: 10,
      margin: 0
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  
    button: {
      margin: theme.spacing(1),
    },
  
    divButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }));
  const [idPath, setIdPath] = useState();
  const [idDrone, setIdDrone] = useState();
  const [namePath, setNamePath] = useState();
  const [heightPath, setHeightPath] = useState();
  const savePath = () => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', '*');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ 
        idDrone: idDrone,
        name: namePath,
        heightFlight: heightPath,
        
      })
    };
    fetch('http://skyrone.cf:6789/flightPath/save', requestOptions)
    .then(response => response.json())
    .then(json =>  {
      setOpen(false)
      setIdPath(json.id)
    })
    .catch(() => console.log("Can’t access " + 'http://skyrone.cf:6789/drone/getByCode/save' + " response. Blocked by browser?"))
      
  }
  const savePoint = () => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', '*');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ 
        idDrone: idDrone,
        idFlightPath: idPath,
        locationLat: selectedPoint.latLng.lat(),
        locationLng: selectedPoint.latLng.lng(),
        
      })
    };
    fetch('http://skyrone.cf:6789/flightPoint/save', requestOptions)
    .then(response => response.text())
    .then(contents =>  {
      setOpen(false)})
    .catch(() => console.log("Can’t access " + 'http://skyrone.cf:6789/drone/getByCode/save' + " response. Blocked by browser?"))
      
  }
  const classes = useStyles();
  const [selectedPoint, setSelectedPoint] = useState(null);
  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };



  useEffect(() => {
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
      savePoint();
      }}
    >
        <AddIcon />
    </Fab>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
                <Form.Item className={classes.formItem}>
                  <h4>ID drone</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setIdDrone(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Tên đường bay</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setNamePath(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Trần bay</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setHeightPath(event.target.value)}
                  />
                </Form.Item>
            <div className={classes.divButton}>
              <Button
                onClick={savePath}
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Lưu
              </Button>
              
             </div>
          </div>
        </Fade>
      </Modal>

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
