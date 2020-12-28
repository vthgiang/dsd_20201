import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'; 
import { DATE_TIME_FORMAT } from '../../../../configs';
import {
    Form,
    DatePicker,
    notification,
    Spin,
  } from 'antd';
  import StateDrone from '../StateDrone';

export default function StateModal(props){
    const {drone, onReload} = props;
    const [show, setShow] = useState(false);
    const [date, setDate] = useState();
    const onChange = (value, dateString) => {
        setDate(value);
      }

      const setDroneBroken = () => {

        fetch(`http://skyrone.cf:6789/droneState/setDroneBroken/`+drone.idDrone)
            .then(response => response.json())
            .then(json => {
              handleClose();
              onReload();
            });
      };
      const save = () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
    
        const requestOptions = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ 
            id : drone.idDrone,
            maintenance : (drone.state === 0) ? false : true,
            name : drone.name,
            timeEnd : date[1],
            timeStart : date[0]
           
          })
        };
        fetch('http://skyrone.cf:6789/droneMaintenance/save', requestOptions)
        .then(response =>  response.json())
        .then(json =>  {
          handleClose();
          onReload();
        })
    
        .catch(() => console.log("Can’t access response. Blocked by browser?"))
          
      }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { RangePicker } = DatePicker;
    const content = {};
    if(drone.state === 0){
        content.variant = 'warning';
        content.name = "Đặt lịch sạc";
    }else if(drone.state === 4){
        content.variant = 'warning';
        content.name = "Đặt bảo trì";
    }

    return (
        <>
        <Button variant={content.variant} onClick={handleShow}>
            {content.name}
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <p>     
                <StateDrone state={drone.state} />    
            </p>
            </Modal.Header>
            <Modal.Body>
                <p>ID: {drone.idDrone} </p>
                <p>
                    Tên drone : {drone.name}
                </p>
            <Form.Item
                name="timeRange"
                label="Đặt lịch"
                labelCol={{ span: 5 }}
                rules={[{ type: 'array' }]}
              >
                <RangePicker showTime 
                 onChange={onChange} 
                 format={DATE_TIME_FORMAT} />
              </Form.Item>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='warning' onClick={save}>
                     {content.name}
                </Button>
                {
                    !(drone.state == 4) && (
                        <Button variant='danger' onClick={setDroneBroken}>
                             Đánh dấu hỏng
                         </Button>
                    )
                }
                
            </Modal.Footer>
        </Modal>
        </>
    );
}