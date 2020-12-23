import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import FlightPathInput from '../FlightPathInput';
import './FlightPathModal.css';
import Map from '../Map';
import PointInput from '../PointInput';
import axios from 'axios';

AddFlightPathModal.propTypes = {
    
};

function AddFlightPathModal(props) {

    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [task, setTask] = useState('');
    const [timeCome, setTimeCome] = useState('');
    const [timeStop, setTimeStop] = useState('');
    
    const [newPoint, setNewPoint] = useState({});
    const [flightPoints, setFlightPoints] = useState([]);
    const [heightPoint, setHeightPoint] = useState('');
    const [monitoredObjectId, setMonitoredObjectId] = useState('');
    const [selectedObject, setSelectedObject] = useState(null);

    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [monitoredObjectList, setMonitoredObjectList] = useState([]);
    const [monitoredObjectListLoading, setMonitoredObjectListLoading] = useState(false);

    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    const [error, setError] = useState('');

    useEffect(()=> {
        // load đối tượng giám sát tương ứng với miền
        if(!selectedZone) return;
        setMonitoredObjectListLoading(true);
        axios.get(`https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-zone?monitoredZone=${selectedZone._id}`)
            .then(response => {
                // console.log("monitored Object")
                // console.log(response)
                const tmp = response.data.content.map(object => ({
                    _id: object._id,
                    name: object.name,
                    lat: parseFloat(object.lat),
                    lng: parseFloat(object.lng),
                    height: object.height
                }))
                console.log("monitored object", tmp);
                setMonitoredObjectList(tmp);
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setMonitoredObjectListLoading(false);
            });
        }, [selectedZone]);
        
    const handleOkClick = () => {
        // xử lý đồng ý thêm đường bay
        if(!name || flightPoints.length===0 || !selectedZone) return setError('Bạn chưa nhập đủ thông tin');
        // let id = Math.trunc(Math.random()*2000);
        let newFlightPath = {name, flightPoints,
            // heightFlight :height,
            idSupervisedArea: selectedZone._id //~~~~
            // idSupervisedArea: selectedArea._id,
            // monitoredAreaName: selectedArea.name,
            // monitoredZoneId: selectedZone._id,
            // monitoredZoneCode: selectedZone.code
        };
        console.log(newFlightPath);
        axios.post('http://skyrone.cf:6789/flightPath/save', newFlightPath)
            .then(response => {
                console.log(response);
                // props.addFlightPath(newFlightPath);
                if(response.status != 200){
                    alert(`Lỗi ${response.status}, thêm thất bại`);
                }else{
                    props.pageReload();
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(()=>{
                reset();
                toggle();
            });
    }

    const addPoint = () => {
        // thêm point vào pointPath
        if(!newPoint.locationLat) return;
        let point = {
            locationLat: newPoint.locationLat,
            locationLng: newPoint.locationLng,
            timeCome: timeCome,
            timeStop: timeStop,
            flightHeight: heightPoint != '' ? heightPoint : 30,
            idSupervisedObject: monitoredObjectId
        }
        setFlightPoints([...flightPoints, point]);
        resetPoint();
    }
    
    const resetPoint = () => {
        setTimeCome('');
        setTimeStop('');
        setNewPoint({});
        setSelectedObject(null);
        if(selectedZone) setHeightPoint(selectedZone.minHeight != undefined ? selectedZone.minHeight : '');
    }

    const reset = () => {
        setName('');
        setTask('');
        setHeight('');
        setFlightPoints([]);
        setSelectedArea(null);
        setSelectedZone(null);
        setMonitoredObjectList([]);
        setMonitoredObjectId('');
        setError('');

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
                    <FlightPathInput 
                        name={name} setName={setName}
                        height={height} setHeight={setHeight} 
                        heightPoint={heightPoint} setHeightPoint={setHeightPoint}
                        task={task} setTask={setTask}
                        selectedArea={selectedArea} setSelectedArea={setSelectedArea}
                        selectedZone={selectedZone} setSelectedZone={setSelectedZone}
                        resetPoint={resetPoint}
                    />
                    <Row>
                        <Col md={4}>
                            {monitoredObjectListLoading && <p>Loading...</p>}
                            {!monitoredObjectListLoading && newPoint.locationLat && <PointInput 
                                timeCome={timeCome} setTimeCome={setTimeCome}
                                timeStop={timeStop} setTimeStop={setTimeStop}
                                newPoint={newPoint} addPoint={addPoint}
                                heightPoint={heightPoint} setHeightPoint={setHeightPoint}
                                selectedZone={selectedZone} 
                                selectedObject={selectedObject}
                            />}
                            {!monitoredObjectListLoading && !newPoint.locationLat && 
                            selectedZone != null && <p style={{color: 'green'}}>
                                Chọn một điểm trên bản đồ
                            </p>}
                            {!monitoredObjectListLoading && !newPoint.locationLat && 
                            selectedZone == null && <p>Nothing</p>}
                        </Col>
                        <Col md={8}>
                            <Map 
                                newPoint={newPoint} setNewPoint={setNewPoint}
                                flightPoints={newPoint.locationLat? [...flightPoints, newPoint] : flightPoints}
                                selectedZone={selectedZone}
                                monitoredObjectList={monitoredObjectList}
                                setMonitoredObjectId={setMonitoredObjectId}
                                setHeightPoint={setHeightPoint} heightPoint={heightPoint}
                                setSelectedObject={setSelectedObject}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {error !== '' && (<Form.Group controlId="errorMessage">
                    <Form.Text className="text-muted">
                        <span className='error-message'>{error}</span>
                    </Form.Text>
                </Form.Group>)}
                <Button variant="primary" onClick={handleOkClick}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddFlightPathModal;