import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'; 
import VisibilityIcon from '@material-ui/icons/Visibility';

import StateDrone from '../StateDrone';

export default function GetBackDrone(props){
    const {drone, onReload} = props;
    const [show, setShow] = useState(false);


    const getBack = () => {
      fetch(`http://skyrone.cf:6789/droneMaintenance/getBackDrone/`+drone.idDrone)
      .then(response => response.json())
      .then(json => {
        handleClose();
        onReload();
      });
        
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const content = {};
    if(drone.state === 0){
        content.variant = 'secondary';
        content.name = "Đặt lịch sạc";
    }else if(drone.state === 4){
        content.variant = 'danger';
        content.name = "Đang bảo trì";
    }

    return (
        <>
          <div>
          <Button onClick={handleShow}>
            Thu Hồi
        </Button>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header>
              <p>     
                  <StateDrone state={drone.state} />   
                  <h3>Chuyển trạng thái sẵn sàng</h3> 
              </p>
              </Modal.Header>
              <Modal.Body>
                  <p>ID: {drone.idDrone} </p>
                  <p>
                      Tên drone : {drone.name}
                  </p>
                  <p> Thời gian</p>
                  <p>
                    {new Intl.DateTimeFormat("vi-VE", {
                        year: "numeric", month: "long", day: "2-digit", 
                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                        hour12: true
                    }).format(drone.timeStart)}
                    <br></br>
                    {new Intl.DateTimeFormat("vi-VE", {
                        year: "numeric", month: "long", day: "2-digit", 
                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                        hour12: true
                    }).format(drone.timeEnd)}
                  </p>
              </Modal.Body>
              <Modal.Footer>
                  <Button  onClick={getBack}>
                      Xác nhận
                  </Button>
              </Modal.Footer>
          </Modal>
        </div>
        </>
    );
}