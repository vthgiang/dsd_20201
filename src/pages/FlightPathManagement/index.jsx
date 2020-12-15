import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Map from '../../components/Drone/Map';
import FlightPathList from '../../components/Drone/FlightPathList';
import AddFlightPathModel from '../../components/Drone/DroneModals/AddFlightPathModal';
import Pagination from '../../components/Drone/Pagination';
import axios from 'axios';

FlightPathManagement.propTypes = {
    
};

function FlightPathManagement(props) {

    const [flightPathView, setFlightPathView] = useState(null);
    // const [flightPaths, setFlightPaths] = useState(flightPathsData.slice(0, 10));
    const [flightPaths, setFlightPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({page: 1, totalPage: 1, perPage: 8});
    const allFlightPath = useRef(null);
    
    const [reload, setReload] = useState(false);
    const pageReload = () => setReload(!reload);
    useEffect(()=>{
        // load data
        setLoading(true);

        axios.get('http://skyrone.cf:6789/flightPath/getAllPath')
            .then(response => {
                console.log(response);
                allFlightPath.current = response.data;
                // lấy dữ liệu cho page hiện tại
                setFlightPaths(allFlightPath.current.slice(0, pagination.perPage));
                // tính lại tổng page
                const totalPage = Math.ceil(allFlightPath.current.length/pagination.perPage);
                if(totalPage != pagination.totalPage) setPagination({...pagination, totalPage: totalPage});
                console.log(totalPage)
                // console.log(allFlightPath);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        //set cac thu
    }, [reload]);

    const pageChange = (newPage) => {
        const start = (newPage - 1)*pagination.perPage;
        const newFlightPaths = allFlightPath.current.slice(start, start+pagination.perPage);
        setFlightPaths(newFlightPaths);
        setPagination({...pagination, page: newPage});
    }

    const viewFlightPath = (flightPath) => {
        if(flightPathView != null && flightPathView.id === flightPath.id) return;
        setFlightPathView(flightPath);
    }

    const handleDeleteFlightPath = (flightPath) => {
        var result = prompt("Nhập 'delete' để xác nhận bạn thực sự muốn xóa đường bay");
        if(result !== 'delete') return;
        axios.get(`http://skyrone.cf:6789/flightPath/delete/${flightPath.id}`)
            .then(response => {
                console.log(response);
                pageReload();
                // let index;
                // for(index=0; index<flightPaths.length; index++){
                //     if(flightPath.id === flightPaths[i].id) break;
                // }
                // const newFlightPaths = [...flightPaths.slice(0, index), ...flightPaths.slice(index+1)];
                // setFlightPaths(newFlightPaths);
            })
    }

    const addFlightPath = (newFlightPath) => {
        setFlightPaths([...flightPaths, newFlightPath]);
    }

    return (
        <Container>
            <Row>
                <Col><AddFlightPathModel addFlightPath={addFlightPath} pageReload={pageReload}/></Col>
                <Col><Pagination pagination={pagination} pageChange={pageChange}/></Col>
                <Col>Tìm kiếm</Col>
            </Row>
            <br/>
            <Row>
                <Col md={6}>
                    {loading ? <p>Loading...</p> : <FlightPathList 
                        flightPaths={flightPaths} 
                        viewFlightPath={viewFlightPath}
                        handleDeleteFlightPath={handleDeleteFlightPath}
                    />}
                </Col>
                <Col md={6}>
                    <Map flightPathView={flightPathView}/>
                </Col>
            </Row>
        </Container>
    );
}

export default FlightPathManagement;