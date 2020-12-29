import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Row, Form, Container } from 'react-bootstrap';
import Select from 'react-select';
import {UAVContext} from '../Context';

const fakeData = [
    {value: 1, label: 'hic'},
    {value: 2, label: 'ha'}
]

function TopInfo(props) {

    const drones = useRef([]);
    const [droneLoading, setDroneLoading] = useState(true);
    const areas = useRef([]);
    const [areaSelected, setAreaSelected] = useState(null);
    const [areaLoading, setAreaLoading] = useState(true);

    const {droneSelected, setDroneSelected} = useContext(UAVContext);

    useEffect( async ()=> {
        setDroneLoading(true);
        setAreaLoading(true);
        let droneRes = await axios.get('http://skyrone.cf:6789/droneState/getAllDroneAvailable');
        droneRes = droneRes.data.map(drone => ({...drone, value: drone.id, label: drone.code}));
        drones.current = droneRes;
        setDroneLoading(false);
        // let areaRes = await axios.get('https://monitoredzoneserver.herokuapp.com/area?page=0');
        // areaRes = areaRes.data.content.monitoredArea.map(area => ({
        //     name: area.name,
        //     _id: area._id,
        //     startPoint: area.startPoint,
        //     endPoint: area.endPoint,
        //     label: area.name,
        //     value: area._id
        // }))
        // areas.current = areaRes;
        // setAreaLoading(false);
    }, []);

    const handleDroneChange = (selectedOption) => {
        setDroneSelected(selectedOption);
    }
    const handleAreaChange = (selectedOption) => {
        setAreaSelected(selectedOption);
    }
    return (<>
    <Container fluid>
        <Row>
            <Col>
                <Form.Group controlId="task">
                    <Form.Label>Chọn Drone</Form.Label>
                    <Select
                        value={droneSelected}
                        isLoading={droneLoading}
                        onChange={handleDroneChange}
                        options={drones.current}
                    />
                </Form.Group>
            </Col>
        </Row>
        {/* <Row>
            <Col>
                <Form.Group controlId="task">
                    <Form.Label>Chọn khu vực</Form.Label>
                    <Select
                        value={areaSelected}
                        isLoading={areaLoading}
                        onChange={handleAreaChange}
                        options={areas.current}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="task">
                    <Form.Label>Chọn miền</Form.Label>
                    <Select
                        value={null}
                        isLoading={true}
                        // onChange={handleAreaChange}
                        options={fakeData}
                    />
                </Form.Group>
            </Col>
        </Row> */}
    </Container>
    </>);
}

export default TopInfo;