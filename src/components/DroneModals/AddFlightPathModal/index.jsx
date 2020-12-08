import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import FlightPathInput from '../FlightPathInput';
import './FlightPathModal.css';
import Map from '../Map';
import PointInput from '../PointInput';

AddFlightPathModal.propTypes = {
    
};

function AddFlightPathModal(props) {

    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [task, setTask] = useState('');
    const [monitoredArea, setMonitoredArea] = useState('');
    
    const [timeCome, setTimeCome] = useState('');
    const [timeStop, setTimeStop] = useState('');
    const [note, setNote] = useState('');
    
    const [newPoint, setNewPoint] = useState({});
    const [flightPoint, setFlightPoint] = useState([]);
    
    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    const handleOkClick = () => {
        if(!name || flightPoint.length===0 || !height) return;
        let id = Math.trunc(Math.random()*2000);
        let newFlightPath = {id ,name, height, task, monitoredArea, flightPoint};
        // console.log(newFlightPath);
        props.addFlightPath(newFlightPath);
        reset();
        toggle();
    }

    const addPoint = () => {
        if(!newPoint.locationLat) return;
        let point = {
            locationLat: newPoint.locationLat,
            locationLng: newPoint.locationLng,
            timeCome: timeCome,
            timeStop: timeStop,
            note: note
        }
        setFlightPoint([...flightPoint, point]);
        resetPoint();
    }
    
    const resetPoint = () => {
        setTimeCome('');
        setTimeStop('');
        setNewPoint({});
        setNote('');
    }

    const reset = () => {
        setMonitoredArea('');
        setName('');
        setTask('');
        setHeight('');
        setFlightPoint([]);

        resetPoint();
    }

    const handleModalHide = () => {
        reset();
        toggle();
    }

    return (
        <>
        <Button variant="primary" onClick={toggle}>
            Thêm đường bay
        </Button>

        <Modal show={show} onHide={handleModalHide} dialogClassName="modal-80w">
            <Modal.Header closeButton>
                <Modal.Title>Thêm đường bay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <FlightPathInput 
                            name={name} setName={setName}
                            height={height} setHeight={setHeight}
                            task={task} setTask={setTask}
                            monitoredArea={monitoredArea} setMonitoredArea={setMonitoredArea}
                        />
                    </Row>
                    <Row>
                        <Col md={4}>
                            <PointInput 
                                timeCome={timeCome} setTimeCome={setTimeCome}
                                timeStop={timeStop} setTimeStop={setTimeStop}
                                note={note} setNote={setNote}
                                addPoint={addPoint}
                            />
                        </Col>
                        <Col md={8}>
                            <Map 
                                newPoint={newPoint} setNewPoint={setNewPoint}
                                flightPoint={newPoint.locationLat? [...flightPoint, newPoint] : flightPoint}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleOkClick}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddFlightPathModal;