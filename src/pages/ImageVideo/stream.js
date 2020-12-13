import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Divider, List, Row, Space, Tabs, Tag } from 'antd';
import axios from 'axios';
import VideoPlayer from "./VideoPlayer";

const { TabPane } = Tabs;
const { Item } = List;

function Stream() {
    const [currentDrone, setCurrentDrone] = useState({});
    const [drones, setDrones] = useState([]);

    // const videoJsOptions = {
    //     autoplay: true,
    //     controls: true,
    //     width: "100%",
    //     sources: [{
    //         src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    //         type: 'video/mp4'
    //     }]
    // }

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://skyrone.cf:6789/droneState/getAllDroneActive"
        }).then(({ data }) => {
            const urlStreams = [
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
            ]

            console.log(data);
            setDrones(data.map(drone => ({ ...drone, urlStream: urlStreams[Math.floor(Math.random() * urlStreams.length)] })));
            setCurrentDrone({ ...data[0], urlStream: urlStreams[Math.floor(Math.random() * urlStreams.length)] })
        })
    }, [])

    return <Container>
        <Row gutter={16}>
            <Col md={16}>
                <HeaderList>Stream từ: {currentDrone.name}</HeaderList>
                <video controls autoPlay width="100%" src={currentDrone.urlStream} style={{ marginBottom: "15px" }} />
                {/* <VideoPlayer {...videoJsOptions} /> */}
            </Col>
            <Col md={8}>
                <HeaderList>Danh sách drones</HeaderList>
                <List
                    bordered
                    dataSource={drones}
                    renderItem={drone => <ItemCustom onClick={() => setCurrentDrone(drone)}>
                        <h1>{drone.name}</h1>
                        <p>{drone.used ? <Tag color="green">Active</Tag> : <Tag color="red">Not Active</Tag>}</p>
                    </ItemCustom>}
                />
            </Col>
        </Row>
    </Container >
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const HeaderList = styled.div`
    font-size: 30px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 500;
`;

const ItemCustom = styled(Item)`
    cursor: pointer;
`;

export default Stream;