import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import "./FlightPathList.css";

FlightPathList.propTypes = {
    
};

function FlightPathList({flightPaths, viewFlightPath, handleDeleteFlightPath}) {

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên đường bay</th>
                    <th>Khu vực giám sát</th>
                    <th>Miền giám sát</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {flightPaths.map((item, index) => (<tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.monitoredAreaName}</td>
                    <td>{item.monitoredZoneCode}</td>
                    <td className="td-action"><button className="btn-view" onClick={()=>viewFlightPath(item)}>
                        <i className="far fa-eye"></i>
                    </button>{"/"}
                    <button className="btn-delete" onClick={()=>handleDeleteFlightPath(item)}>
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    </td>
                </tr>))}
            </tbody>
        </Table>
    );
}

export default FlightPathList;