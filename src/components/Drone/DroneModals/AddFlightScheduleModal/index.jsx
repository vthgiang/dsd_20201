import React, { useState } from 'react';
const { Button, Modal, Form } = require("react-bootstrap");

function AddFlightScheduleModal(props) {
    const {parent, updateFlightSchedule} = props;
    const [show, setShow] = useState(false);
    
    const [flightPathId, setFlightPathId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [monitoredArea, setMonitoredArea] = useState('');

    const toggle = () => setShow(!show);
    
    const reset = () => {
        setFlightPathId('');
        setStartTime('');
        setEndTime('');
        setMonitoredArea('');
    }

    const handleSaveClick = () => {
        if(!flightPathId || !startTime || !endTime) return;
        const cloned = JSON.parse(JSON.stringify(parent));
        const newSchedule = {flightPathId, startTime, endTime, monitoredArea};
        cloned.flightPaths.push(newSchedule);
        updateFlightSchedule(cloned);
        reset();
        toggle();
    }

    /*
    useEffect(() => {
      // load duong bay
    } , []);
    */

    return (
      <>
        <Button variant="primary" onClick={toggle}>
          Add
        </Button>
  
        <Modal show={show} onHide={toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm lịch bay</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlightScheduleForm
                flightPathId={flightPathId} setFlightPathId={setFlightPathId}
                startTime={startTime} setStartTime={setStartTime}
                endTime={endTime} setEndTime={setEndTime}
                monitoredArea={monitoredArea} setMonitoredArea={setMonitoredArea}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSaveClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default AddFlightScheduleModal;

function FlightScheduleForm(props){
    const {
        flightPathId, setFlightPathId,
        startTime, setStartTime,
        endTime, setEndTime,
        monitoredArea, setMonitoredArea
    } = props;

    return (<>
        <Form.Group controlId="flightPath">
            <Form.Label>Mã đường bay</Form.Label>
            <Form.Control type="text" value={flightPathId} onChange={(e)=> setFlightPathId(e.target.value) } placeholder="" />
        </Form.Group>
        <Form.Group controlId="startTime">
            <Form.Label>Thời gian bắt đầu</Form.Label>
            <Form.Control type="text" value={startTime} onChange={(e)=> setStartTime(e.target.value) } placeholder="" />
        </Form.Group>
        <Form.Group controlId="endTime">
            <Form.Label>Thời gian kết thúc</Form.Label>
            <Form.Control type="text" value={endTime} onChange={(e)=> setEndTime(e.target.value) } placeholder="" />
        </Form.Group>
        <Form.Group controlId="monitoredArea">
            <Form.Label>Khu vực giám sát</Form.Label>
            <Form.Control type="text" value={monitoredArea} onChange={(e)=> setMonitoredArea(e.target.value) } placeholder="" />
        </Form.Group>
    </>)
}