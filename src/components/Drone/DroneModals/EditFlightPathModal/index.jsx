import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import axios from 'axios';
import PointInfo from './PointInfo';
import FlightPathInfo from './FlightPathInfo';
import MapEdit from './MapEdit';

EditFlightPathModal.propTypes = {
    
};

function EditFlightPathModal(props) {
    const {flightPath} = props;

    const [name, setName] = useState('');

    const [timeCome, setTimeCome] = useState('');
    const [timeStop, setTimeStop] = useState('');
    const [heightPoint, setHeightPoint] = useState('');
    
    const [newPoint, setNewPoint] = useState({});
    const [flightPoints, setFlightPoints] = useState([]);
    const [monitoredObjectId, setMonitoredObjectId] = useState('');
    const [selectedObject, setSelectedObject] = useState(null);

    const [monitoredObjectList, setMonitoredObjectList] = useState([]);
    const [monitoredObjectListLoading, setMonitoredObjectListLoading] = useState(false);

    const [show, setShow] = useState(false);
    const toggle = () => setShow(!show);

    const [selectedPoint, setSelectedPoint] = useState(null);

    const [error, setError] = useState('');
    const [pointChange, setPointChange] = useState(false);

    useEffect(()=> {
        console.log('reset');
        setName(flightPath.name);
        setFlightPoints(flightPath.flightPoints);
    }, [show]);

    useEffect(()=>{
        if(!selectedPoint) return;
        setTimeCome(selectedPoint.timeCome);
        setTimeStop(selectedPoint.timeStop);
        setHeightPoint(selectedPoint.flightHeight);
        setPointChange(false);
    }, [selectedPoint])

    useEffect(()=> {

        const monitoredZone = flightPath.idSupervisedArea;
        // load đối tượng giám sát tương ứng với miền
        setMonitoredObjectListLoading(true);
        axios.get(`https://dsd05-monitored-object.herokuapp.com/monitored-object/get-object-by-zone?monitoredZone=${monitoredZone}`)
            .then(response => {
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
        }, []);
    
    const updatePoint = () => {
        for(let i = 0; i < flightPoints.length; i++){
            if(flightPoints[i].locationLat == selectedPoint.locationLat && 
                flightPoints[i].locationLng == selectedPoint.locationLng){
                setFlightPoints([
                    ...flightPoints.slice(0, i), {
                        ...flightPoints[i],
                        timeCome: timeCome,
                        timeStop: timeStop,
                        flightHeight: heightPoint
                    },
                    ...flightPoints.slice(i+1)
                ]);
                // console.log(...flightPoints.slice(0, i));
                // console.log(...flightPoints.slice(i+1));
                setPointChange(false);
                console.log('updated point');
            }
        }
    }

    const handleSaveClick = () => {
        // xử lý đồng ý thêm đường bay
        if(!name || flightPoints.length===0 ) return setError('Bạn chưa nhập đủ thông tin');
        let newFlightPath = {
            ...flightPath,
            name, 
            flightPoints,
            // heightFlight :height,
            // idSupervisedArea: selectedZone._id //~~~~
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
                    alert(`Lỗi ${response.status}, cập nhật thất bại`);
                }else{
                    props.pageReload();
                }
            })
            .catch(err => {
                alert("Có lỗi xảy ra, cập nhật thất bại");
                console.log(err);
            })
            .finally(()=>{
                // reset();
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
    }

    const reset = () => {
        setError('');
    }

    const handleModalHide = () => {
        reset();
        toggle();
    }

    return (
        <>
        <button className="btn-edit" onClick={toggle}>
            <i class="fas fa-edit"></i>
        </button>

        <Modal show={show} onHide={handleModalHide} dialogClassName="modal-80w">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa lộ trình bay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <FlightPathInfo 
                        name={name} setName={setName}
                        monitoredZoneName={flightPath.zone.name}
                        monitoredAreaName={flightPath.area.name}                        
                    />
                    <Row>
                        <Col md={4}>
                            {monitoredObjectListLoading && <p>Loading...</p>}
                            {!monitoredObjectListLoading && selectedPoint && <PointInfo
                                timeCome={timeCome} setTimeCome={setTimeCome}
                                timeStop={timeStop} setTimeStop={setTimeStop}
                                heightPoint={heightPoint} setHeightPoint={setHeightPoint}
                                zone={flightPath.zone}
                                updatePoint={updatePoint}
                                setPointChange={setPointChange}
                                pointChange={pointChange}
                            />}
                        </Col>
                        <Col md={8}>
                            <MapEdit 
                                flightPoints={flightPoints}
                                zone={flightPath.zone}
                                monitoredObjectList={monitoredObjectList}
                                setSelectedPoint={setSelectedPoint}
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
                <Button variant="primary" onClick={handleSaveClick}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default EditFlightPathModal;