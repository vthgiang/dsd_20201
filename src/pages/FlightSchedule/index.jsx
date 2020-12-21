import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import TableFlightSchedule from '../../components/Drone/FlightSchedule/TableFlightSchedule';
import PaginationComponent from '../../components/Drone/Pagination';

FlightSchedule.propTypes = {
    
};

const data = [
    {
        droneId: 132132, 
        droneName:'A1123', 
        flightPaths: [ 
            {flightPathId: 132135, startTime: '8:30', endTime:'9:30', monitoredArea: 'X123'}
        ]
    },
    {
        droneId: 32135, 
        droneName:'A4652', 
        flightPaths: [ 
            {flightPathId: 354535, startTime: '14:30', endTime:'15:00', monitoredArea: 'Xyz'},
            {flightPathId: 354338, startTime: '14:30', endTime:'15:00', monitoredArea: 'Xyz'}
        ]
    },
    {
        droneId: 55351, 
        droneName:'A8354', 
        flightPaths: []
    },
    {
        droneId: 65486, 
        droneName:'A1123', 
        flightPaths: [ 
            {flightPathId: 213554, startTime: '8:30', endTime:'9:30', monitoredArea: 'X123'}
        ]
    }
]

function FlightSchedule(props) {
    const [droneList, setDroneList] = useState(data);

    /*
    useEffect(() => {
        // load list drone

        // load flight schedule cua 12 drone dau
    }, []);  
     */

    const updateFlightSchedule = (drone) => {
        let index = 0;
        for(let i=0; i<droneList.length; i++){
            if(droneList[i].droneId == drone.droneId){
                index = i;
                break;
            }
        }
        const newList = [...droneList.slice(0,index), drone, ...droneList.slice(index+1)];
        setDroneList(newList);
    }



    return (
        <Container>
            <Row>
                <Col><PaginationComponent/></Col>
                <Col>Tìm kiếm</Col>
            </Row>
            <Row>
                <TableFlightSchedule data={droneList} updateFlightSchedule={updateFlightSchedule}/>
            </Row>
        </Container>
    );
}

export default FlightSchedule;