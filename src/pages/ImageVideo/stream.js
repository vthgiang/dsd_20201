import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Divider, List, Row, Space, Tabs, Tag } from 'antd';
import axios from 'axios';
import VideoPlayer from "./VideoPlayer";

const { TabPane } = Tabs;
const { Item } = List;

<<<<<<< HEAD
=======
const urlStreams = [
    "https://media.istockphoto.com/videos/aerial-view-of-amazon-rainforest-in-brazil-video-id1169794330",
    "https://media.istockphoto.com/videos/aerial-view-of-amazon-rainforest-in-brazil-video-id1169794330",
]

>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
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
<<<<<<< HEAD
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

=======
        const fetchData = async () => {
            const { data } = await axios({
                method: "GET",
                url: "http://skyrone.cf:6789/droneState/getAllDroneActive",
                // params: {
                //     timeStart: new Date(Date.now()),
                //     timeEnd: new Date(Date.now() + 60000),
                // }
            });

            const res = await axios({
                method: "GET",
                url: `http://skyrone.cf:6789/drone/getById/${data[0].idDrone}`
            })

            setDrones(data.map(drone => ({ ...drone, urlStream: urlStreams[Math.floor(Math.random() * urlStreams.length)] })));
            setCurrentDrone({ ...data[0], urlStream: urlStreams[Math.floor(Math.random() * urlStreams.length)], ...res.data })
        }

        fetchData();
    }, [])

    const fetchCurrentDrone = async idDrone => {
        const res = await axios({
            method: "GET",
            url: `http://skyrone.cf:6789/drone/getById/${idDrone}`
        })

        setCurrentDrone({ ...res.data, urlStream: urlStreams[Math.floor(Math.random() * urlStreams.length)] })
    }

>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
    return <Container>
        <Row gutter={16}>
            <Col md={16}>
                <HeaderList>Stream từ: {currentDrone.name}</HeaderList>
<<<<<<< HEAD
                <video controls autoPlay width="100%" src={currentDrone.urlStream} style={{ marginBottom: "15px" }} />
=======

                <Row>
                    <Col md={12}>
                        <strong>Drone Id:</strong> <span>{currentDrone.id}</span>
                    </Col>
                    <Col md={12}>
                        <strong>Pin:</strong> <span>{currentDrone.rangeBattery}</span>
                    </Col>
                    <Col md={12}>
                        <strong>Tốc độ:</strong> <span>{currentDrone.maxFlightSpeed}</span>
                    </Col>
                    <Col md={12}>
                        <strong>Độ cao:</strong> <span>{currentDrone.maxFlightHeight}</span>
                    </Col>
                    <Col md={12}>
                        <strong>Độ cao:</strong> <span>{currentDrone.maxFlightHeight}</span>
                    </Col>
                </Row>

                <div style={{
                    marginTop: "20px"
                }}>
                    <video controls autoPlay width="100%" src={currentDrone.urlStream} style={{ marginBottom: "15px" }} />
                </div>
                <div>

                </div>
                {/* <div>
                    <video controls autoPlay width="100%" src={currentDrone.urlStream} style={{ marginBottom: "15px" }} />
                </div> */}
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                {/* <VideoPlayer {...videoJsOptions} /> */}
            </Col>
            <Col md={8}>
                <HeaderList>Danh sách drones</HeaderList>
                <List
                    bordered
                    dataSource={drones}
<<<<<<< HEAD
                    renderItem={drone => <ItemCustom onClick={() => setCurrentDrone(drone)}>
=======
                    renderItem={drone => <ItemCustom onClick={() => fetchCurrentDrone(drone.idDrone)}>
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
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