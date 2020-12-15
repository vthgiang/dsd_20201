import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import AddFlightScheduleModal from '../../DroneModals/AddFlightScheduleModal';
import './TableFlightSchedule.css';

TableFlightSchedule.propTypes = {
    
};

function TableFlightSchedule(props) {

    const {data, updateFlightSchedule} = props;

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Mã Drone</th>
                    <th>Tên Drone</th>
                    <th>Tên đường bay</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Khu vực giám sát</th>
                    <th>#</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {console.log(props)}
                {data.map((item, index) => (<>
                <tr>
                    <td rowSpan={item.flightPaths.length === 0 ? 1 : item.flightPaths.length}>
                        {item.droneId}
                    </td>
                    <td rowSpan={item.flightPaths.length === 0 ? 1 : item.flightPaths.length}>
                        {item.droneName}
                    </td>
                    {item.flightPaths.length === 0 ? <EmptyRow />: <ScheduleItem item={item.flightPaths[0]} parent={item} updateFlightSchedule={updateFlightSchedule}/>}
                    <td rowSpan={item.flightPaths.length === 0 ? 1 : item.flightPaths.length}><AddFlightScheduleModal parent={item} updateFlightSchedule={updateFlightSchedule} /></td>
                </tr>
                {item.flightPaths.slice(1).map(t => <tr><ScheduleItem item={t} parent={item} updateFlightSchedule={updateFlightSchedule}/></tr>)}
                </>))}
            </tbody>
        </Table>
    );
}

export default TableFlightSchedule;

function EmptyRow(){
    return (<>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </>)
}

function ScheduleItem(props){
    const {parent, updateFlightSchedule} = props;
    const {flightPathId, startTime, endTime, monitoredArea} = props.item;
    const handleDeleteClick = () => {
        var result = prompt("Bạn thực sự muốn xóa lịch bay? Nhập 'delete' để thực hiện hành động");
        if(result !== 'delete') return;
        let index = 0;
        for(let i=0; i<parent.flightPaths.length; i++){
            if(parent.flightPaths[i].flightPathId == flightPathId){
                index = i;
                break;
            }
        }
        const cloned = JSON.parse(JSON.stringify(parent));
        cloned.flightPaths.splice(index, 1);
        updateFlightSchedule(cloned);
    }
    return (<>
        <td>{flightPathId}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>{monitoredArea}</td>
        <td>
            <button className="btn-delete" onClick={handleDeleteClick}>
                <i className="far fa-minus-square"></i>
            </button>
        </td>
    </>);
}