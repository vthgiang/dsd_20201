import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap'; 
import { Form, Input, Col, Row } from "antd";

import GetBackDrone from '../GetBackDrone';

export default function ShowDateAndGetBackDrone(props){
    const {drone, onReload} = props;


    const content = {};
    if(drone.state === 0){
        content.variant = 'secondary';
        content.name = "Đặt lịch sạc";
    }else if(drone.state === 4){
        content.variant = 'danger';
        content.name = "Đang bảo trì";
    }

    return (
        <>
                    {new Intl.DateTimeFormat("vi-VE", {
                        year: "numeric", month: "long", day: "2-digit", 
                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                        hour12: true
                    }).format(drone.timeStart)}
                    <br></br>
                    {new Intl.DateTimeFormat("vi-VE", {
                        year: "numeric", month: "long", day: "2-digit", 
                        hour: 'numeric', minute: 'numeric', second: 'numeric',
                        hour12: true
                    }).format(drone.timeEnd)}
                <Col>
             <GetBackDrone drone={drone} onReload={onReload} />
             </Col>    
        </>
    );
}