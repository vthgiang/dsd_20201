import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import "./FlightPathList.css";

FlightPathList.propTypes = {
    
};

function FlightPathList({flightPaths, viewFlightPath}) {

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tên đường bay</th>
                    <th>Độ cao</th>
                    <th>Task</th>
                    <th>Id kv giám sát</th>
                </tr>
            </thead>
            <tbody>
                {flightPaths.map((item) => (<tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.heightFlight}</td>
                    <td>{item.task}</td>
                    <td>{item.idSupervisedArea}</td>
                    <td><button className="btn-view" onClick={()=>viewFlightPath(item)}>
                        <i className="far fa-eye"></i>
                    </button></td>
                </tr>))}
            </tbody>
        </Table>
    );
}

export default FlightPathList;