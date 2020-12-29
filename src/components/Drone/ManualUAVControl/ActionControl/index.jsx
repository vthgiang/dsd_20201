import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Select from 'react-select';
import {UAVContext, TRU_SO} from '../Context';
import {getDistance} from '../../Common/MapHelper';
const actions = [
    {value: 'takeOff', label: 'Cất cánh'},
    // {value: 'landing', label: 'Hạ cánh'},
    {value: 'go', label: 'Bay'},
    {value: 'stop', label: 'Dừng'},
    {value: 'goBack', label: 'Trở về'},
]

function ActionControl(props) {

    const {
        isFlying, setIsFlying, droneSelected, droneSpeed, setDroneSpeed,
        droneHeight, setDroneHeight,
        curPos, desPos, setCurPos, setDesPos, setIsMoving, isMoving
    } = useContext(UAVContext);
    const [speed, setSpeed] = useState('');
    const [height, setHeight] = useState('');
    const [action, setAction] = useState(actions[0]);

    const [actionList, setActionList] = useState(actions[0]);

    const handleActionChange = (selectedOption) => {
        if(selectedOption.value !== action.value) {
            setAction(selectedOption);
        }
    }
    const [error, setError] = useState('');

    const tmpPos = useRef(null);

    const interval = useRef(null);

    const nextAction = (action) => {
        let nextActions = getNextAction(action);
        setActionList(nextActions);
        setAction(nextActions[0]);
        setError('');
    }

    const go = () => {
        tmpPos.current = curPos;
        setIsMoving(true);
        interval.current = setInterval(()=> {
            // const dis = getDistance(latLngToPoint(tmpPos.current), latLngToPoint(desPos));
            // console.log(dis, parseFloat(speed));
            // console.log(dis < parseFloat(speed));
            if(getDistance(latLngToPoint(tmpPos.current), latLngToPoint(desPos)) < parseFloat(speed)){
                setCurPos(desPos);
                setDesPos(null);
                clearInterval(interval.current);
                setIsMoving(false);
                nextAction('stop');
                return;
            }
            const nextPos = nextPositon(tmpPos.current, desPos, speed, 1000);
            setCurPos(nextPos);
            tmpPos.current = nextPos;
        }, 1000);
        setDroneSpeed(speed);
        setDroneHeight(droneHeight);
        nextAction('go');
    }

    const stop = () => {
        if(!desPos) return;
        if(interval.current) {
            clearInterval(interval.current);
            nextAction('stop');
            setIsMoving(false);
        }
    }

    const goBack = () => {
        tmpPos.current = curPos;
        setIsMoving(true);
        setDesPos(TRU_SO);
        interval.current = setInterval(()=> {
            if(getDistance(latLngToPoint(tmpPos.current), latLngToPoint(TRU_SO)) < parseFloat(speed)){
                setCurPos(TRU_SO);
                setDesPos(null);
                clearInterval(interval.current);
                setIsMoving(false);
                nextAction('goBack');
                setIsFlying(false);
                return;
            }
            const nextPos = nextPositon(tmpPos.current, TRU_SO, speed, 1000);
            setCurPos(nextPos);
            tmpPos.current = nextPos;
        }, 1000);
        setDroneSpeed(speed);
        setDroneHeight(droneHeight);
        nextAction('go');
    }

    useEffect(()=> {

        return () => {
            if(interval.current) clearInterval(interval);
        }
    }, []);


    const handleBtnClick = () => {
        switch(action.value){
            case 'takeOff':
                if(isFlying) return setError('Hành động không hợp lệ');
                if(!droneSelected) return setError('Bạn chưa chọn drone');
                if(!speed || !height) return setError('Bạn chưa nhập đủ tham số');
                if((speed && speed < 0) || (height && height < 0)) return  setError('Giá trị tham số không hợp lệ');
                // cất cánh
                setIsFlying(true);
                setDroneSpeed(speed);
                setDroneHeight(height);
                nextAction('takeOff');
                break;
            // case 'landing':
            //     break;
            case 'go':
                if(!isFlying) return setError('Hành động không hợp lệ');
                if(!desPos) return setError('Bạn chưa chọn điểm đến');
                go();
                break;
            case 'stop':
                stop();
                break;
            case 'goBack':
                goBack();
                break;
        }
    }

    const handleSpeedChange = (e) => {
        if(isMoving) return setError('Bạn ko thể thực hiện thao tác này khi drone đang bay');
        if(speed > 100) return setError('Vận tốc quá lớn');
        setSpeed(e.target.value);
    }

    const handleHeightChange = (e) => {
        if(isMoving) return setError('Bạn ko thể thực hiện thao tác này khi drone đang bay');
        setHeight(e.target.value);
    }

    return (
        <Container fluid>
            <Col>
                <Form.Group controlId="speed">
                    <Form.Label>Vận tốc</Form.Label>
                    <Form.Control type="number" min="0" value={speed} onChange={handleSpeedChange} placeholder="m/s" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="height">
                    <Form.Label>Độ cao</Form.Label>
                    <Form.Control type="number" min="0" value={height} onChange={handleHeightChange} placeholder="m" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="action">
                    <Form.Label>Hành động</Form.Label>
                    <Select
                        value={action}
                        onChange={handleActionChange}
                        options={actionList}
                    />
                </Form.Group>
            </Col>
            {error !== '' && (<Form.Group controlId="errorMessage">
                <Form.Text className="text-muted">
                    <span className='error-message'>{error}</span>
                </Form.Text>
            </Form.Group>)}
            <Col>
                <Button onClick={handleBtnClick}>Thực hiện</Button>
            </Col>
        </Container>
    );
}

export default ActionControl;

const latLngToPoint = (pos) => {
    return {locationLat: pos.lat, locationLng: pos.lng};
}

const getNextAction = (currentAction) => {
    switch(currentAction){
        case 'takeOff':
            return [actions[1]];
        case 'go':
            return [actions[2]];
        case 'stop':
            return [actions[1], actions[3]];
        case 'goBack':
            return [actions[0]];
    }
}

const nextPositon = (curPos, desPos, speed, time) => {
    const r_earth = 6378000;
    const huyen = Math.sqrt( Math.pow(desPos.lat - curPos.lat, 2) + Math.pow(desPos.lng - curPos.lng, 2) );
    const cos = (desPos.lat - curPos.lat)/huyen;
    const sin = (desPos.lng - curPos.lng)/huyen;
    // const dx = speed*time/1000*cos;
    // const dy = speed*time/1000*sin;

    const dx = speed*time/1000*sin;
    const dy = speed*time/1000*cos;
    // new_latitude  = latitude  + (dy / r_earth) * (180 / pi);
    // new_longitude = longitude + (dx / r_earth) * (180 / pi) / cos(latitude * pi/180);
    
    const nextLat = curPos.lat + (dy / r_earth) * (180 / Math.PI);
    const nextLng = curPos.lng + (dx / r_earth) * (180 / Math.PI) / Math.cos(curPos.lat * Math.PI/180);

    return {lat: nextLat, lng: nextLng};
}