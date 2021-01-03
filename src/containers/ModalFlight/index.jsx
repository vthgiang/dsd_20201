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
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Payload from './Payload';
import MonitorCampain from './MonitorCampain';

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
    width: 700
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
  const { TabPane } = Tabs;
  const [drones, setDrones] = useState([]);

  const getData = () => {
    fetch("http://skyrone.cf:6789/droneState/getParameterFlightRealTime/" + props.id)
      .then(response => response.json())
      .then(json => {
        console.log(json.data);

        setDrones(json.data);
        setOpen(true);
        getMonitorCampain(json.data.idCampaign);
      });
  };


  const handleOpen = () => {
    getData();
    getPayLoad();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [payload, setPayload] = useState();
  const [monitorCampain, setMonitorCampain] = useState();
  const getPayLoad = () => {
    fetch("https://dsd06.herokuapp.com/api/payload?droneId="+props.id)
      .then(response => response.json())
      .then(json => {
        console.log("Payload" + json);
        setPayload(json)
      });
}

// let headers = new Headers();

// headers.append('authorization', 'Bearer d2144ec994a49df05be439ac03c4f88c');
// headers.append('projectType', 'application/json');
// const requestOptions = {
//   method: 'GEt',
//   headers: headers
// }

  const getMonitorCampain = (id) => {
    fetch("http://123.30.235.196:5598/api/monitor-campaigns/quick/"+id)
    .then(response => response.json())
    .then(json => {
      setMonitorCampain(json)
    });
  }


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
            <br />
            <h4 id="transition-modal-title">#ID : {props.id} </h4>
            <p id="transition-modal-title">Tên :  {props.name}</p>
            <p id="transition-modal-title">Độ cao (m) :  {drones.heightFlight}</p>
            <p id="transition-modal-title">Phần trăm pin :  {drones.percentBattery} %</p>
            <p id="transition-modal-title">.         Tốc độ bay :  {drones.speed} m/phút</p>
             
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/stream';
              }}
            >
              Xem video stream
            </Button>

            <Tabs defaultActiveKey="1">
              <TabPane tab="Bản đồ" key="1">
                  <Map flightPath={drones.flightPath} />
              </TabPane>
              <TabPane tab="Payload" key="2">
                <Payload payload={payload} />
              </TabPane>
              <TabPane tab="Đợt giám sát" key="3">
                <MonitorCampain monitorCampain={monitorCampain} />
              </TabPane>
            </Tabs>
           
          </div>
        </Fade>
      </Modal>
    </div>
  );

}



