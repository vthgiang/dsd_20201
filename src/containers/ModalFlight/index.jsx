import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Input, Col, Row } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios';
import Map from './Map';

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
    overflow: 'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    width : 700
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



export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [drones, setDrones] = useState([]);

  const getData = () => {
    fetch("http://skyrone.cf:6789/droneState/getParameterFlightRealTime/" + props.id)
      .then(response => response.json())
      .then(json => {
        console.log(json.data);
        
        setDrones(json.data);
        setOpen(true);
        // getFlightPath()
        //   .then(flightPath => {
        //     json.data.flightPath = flightPath;
        //     setDrones(json.data);
        //     setOpen(true);
        //   })
      });
  };

  const handleOpen = () => {
      getData();
      
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>

      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<VisibilityIcon />}
      >
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <br/>
            <h4 id="transition-modal-title">Tên drone : {props.name} </h4>
            <h4 id="transition-modal-title">#ID : {props.id} </h4>
            <p id="transition-modal-title">Độ cao (m) :  {drones.heightFlight}</p>
            <p id="transition-modal-title">Phần trăm pin :  {drones.percentBattery} %</p>
            <p id="transition-modal-title">.         Tốc độ bay :  {drones.speed} m/phút</p>
            <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='/stream';
                    }}
                >
                  Xem video stream
                   </Button>
            <Map flightPath={drones.flightPath}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );

}

const fakeData = {
  name: "Phúc Đồng - Long Biên 1",
  id: "5fd87500b94e272f3f9e8ffc",
  flightPoints: [
    {
      flightHeight: 67,
      idSupervisedObject: "",
      locationLat: 21.048094,
      locationLng: 105.892944,
      timeCome: 8,
      timeStop: 2
    },
    {
      flightHeight: 67,
      idFlightPath: null,
      idSupervisedObject: "",
      locationLat: 21.042646,
      locationLng: 105.89689,
      note: null,
      timeCome: 4,
      timeStop: 3
    },
    {
      flightHeight: 68,
      idFlightPath: null,
      idSupervisedObject: "",
      locationLat: 21.03816,
      locationLng: 105.89878,
      note: null,
      timeCome: 3,
      timeStop: 2
    },
    {
      flightHeight: 67,
      idFlightPath: null,
      idSupervisedObject: "",
      locationLat: 21.035517,
      locationLng: 105.90256,
      note: null,
      timeCome: 3,
      timeStop: 3
    },
    {
      flightHeight: 67,
      idFlightPath: null,
      idSupervisedObject: "",
      locationLat: 21.03039,
      locationLng: 105.9132,
      note: null,
      timeCome: 6,
      timeStop: 2,
    }
  ]
}

function getFlightPath(){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(fakeData);
    }, 500);
  })
}