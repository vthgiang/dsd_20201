import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Map from '../../components/Map';
import {flightPathsData} from './Data.example';
import FlightPathList from '../../components/FlightPathList';
import AddFlightPathModel from '../../components/DroneModals/AddFlightPathModal';
import Pagination from '../../components/Drone/Pagination';

FlightPathManagement.propTypes = {
    
};

function FlightPathManagement(props) {

    const [flightPathView, setFlightPathView] = useState(null);
    const [flightPaths, setFlightPaths] = useState(flightPathsData.slice(0, 10));
    const [pagination, setPagination] = useState({page: 1, totalPage: 1});

    useEffect(()=>{
        const totalPage = Math.ceil(flightPathsData.length/10);
        if(totalPage != pagination.totalPage) setPagination({...pagination, totalPage});
    }, []);

    const pageChange = (newPage) => {
        const start = (newPage - 1)*10;
        const newFlightPaths = flightPathsData.slice(start, start+10);
        setFlightPaths(newFlightPaths);
        setPagination({...pagination, page: newPage});
    }

    const viewFlightPath = (flightPath) => {
        if(flightPathView != null && flightPathView.id === flightPath.id) return;
        setFlightPathView(flightPath);
    }

    const addFlightPath = (newFlightPath) => {
        setFlightPaths([...flightPaths, newFlightPath]);
    }

    return (
        <Container>
            <Row>
                <Col><AddFlightPathModel addFlightPath={addFlightPath}/></Col>
                <Col><Pagination/></Col>
                <Col>Tìm kiếm</Col>
            </Row>
            <br/>
            <Row>
                <Col md={6}>
                    <FlightPathList 
                        flightPaths={flightPaths} 
                        viewFlightPath={viewFlightPath}
                    />
                </Col>
                <Col md={6}>
                    <Map flightPathView={flightPathView}/>
                </Col>
            </Row>
        </Container>
    );
}

export default FlightPathManagement;