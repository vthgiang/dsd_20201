import { Col, Image, Row, Table, Select, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { problemColumns, problemTypesKD, problemTypes } from './config';
// import { Carousel } from 'antd';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Text } = Typography;

function Detail() {
    const { params } = useRouteMatch();

    const [imageVideo, setImageVideo] = useState({});
    const [imageVideoRelated, setImageVideoRelated] = useState([]);
    const [problems, setProblems] = useState([]);
    const [monitoredObjects, setMonitoredObjects] = useState([]);
    const [currentMonitoredObject, setCurrentMonitoredObject] = useState({});
    const contentStyle = {
        height: '450px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const renderDescription = (description) => {
        if (description) {
            const arr = description?.split(" ");
            const objId = arr.pop();

            return <div>{arr.join(" ")} <Link to="#">{objId}</Link></div>;
        }
        return null;
    }

    const onChangeMonitorObject = (values) => { setCurrentMonitoredObject(values) };

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await axios({
                method: "GET",
                url: `https://it4483team2.herokuapp.com/api/records/${params.id}`,
                headers: {
                    "api-token": localStorage.getItem("token"),
                    "project-type": localStorage.getItem("project-type")
                },
            });

            let res2 = null;
            if (res1.data.type === 0) {
                res2 = await axios({
                    method: "GET",
                    url: `https://it4483team2.herokuapp.com/api/records/monitored/${res1.data.monitoredObjectId}`,
                    headers: {
                        "api-token": localStorage.getItem("token"),
                        "project-type": localStorage.getItem("project-type")
                    },
                });
            } else {
                res2 = await axios({
                    method: "GET",
                    url: `https://it4483team2.herokuapp.com/api/records/monitored/${res1.data.monitoredObjectId}`,
                    headers: {
                        "api-token": localStorage.getItem("token"),
                        "project-type": localStorage.getItem("project-type")
                    },
                });
            }

            let res3 = null;
            if (res1.data.type === 0) {
                res3 = await axios({
                    method: "POST",
                    url: `https://it4483.cf/api/incidents/search`,
                    headers: {
                        "api-token": localStorage.getItem("token"),
                        "project-type": localStorage.getItem("project-type")
                    },
                    data: {
                        imageIds: [
                            res1.data.id
                        ]
                    }
                })
            } else {
                res3 = await axios({
                    method: "POST",
                    url: `https://it4483.cf/api/incidents/search`,
                    headers: {
                        "api-token": localStorage.getItem("token"),
                        "project-type": localStorage.getItem("project-type")
                    },
                    data: {
                        videoIds: [
                            res1.data.id
                        ]
                    }
                })
            }

            const res4 = await axios({
                method: "GET",
                url: "https://dsd05-monitored-object.herokuapp.com/monitored-object/",
                params: {},
                data: {}
            })

            const res4Data = res4.data.content.splice(0, 10).map(i => ({ ...i, value: i._id, label: i.name }));

            setImageVideo(res1.data);
            setImageVideoRelated(res2.data.result);
            setProblems(res3.data.incidents);

            setMonitoredObjects(res4Data);
            setCurrentMonitoredObject(res4Data.find(i => i._id === { data: { monitoredObjectId: "5fc68a131b9ae0001765e811" } }.data?.monitoredObjectId));
        }

        fetchData();
    }, [])

    return <Container>
        <div style={{
            marginBottom: "15px"
        }}>
            <Text>Đối tượng giám sát: </Text>
            <Select
                value={currentMonitoredObject}
                labelInValue={true} style={{ minWidth: 100 }}
                placeholder="Đối tượng giám sát"
                onChange={onChangeMonitorObject}
                options={monitoredObjects}
                disabled
            />
        </div>

        <Row gutter={24} align="middle">
            <Col md={15} >
                {imageVideo.type === 0 ? <Image
                    width="100%"
                    height="100%"
                    src={imageVideo.link}
                /> : <video controls src={imageVideo.link} style={{
                    height: "100%",
                    width: "100%"
                }} />}
            </Col>
            <Col md={9}>
                <Title>Thông tin chi tiết</Title>

                <Info>
                    <Row>
                        <Col md={4}>
                            <strong>Id:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.id}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Tên:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.title}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Mô tả:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{renderDescription(imageVideo.description)}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Loại dữ liệu:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.type === 0 ? "Ảnh" : "Video"}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Loại sự cố:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{problemTypes[imageVideo.problemType]}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Kinh độ:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.longitude}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Vĩ độ:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.latitude}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Tạo lúc:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.createdAt}</span>
                        </Col>
                    </Row>
                </Info>
            </Col>
        </Row>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title><p>
                <span>Hình ảnh, video liên quan</span>
            </p>
            </Title>

            <div>
                <Select
                    value={currentMonitoredObject}
                    labelInValue={true} style={{ minWidth: 100 }}
                    placeholder="Đối tượng giám sát"
                    onChange={onChangeMonitorObject}
                    options={monitoredObjects}
                    disabled
                />
            </div>
        </div>
        <CarouselCustom
            dots={false}
        >
            {imageVideoRelated.map((item, index) => {
                return <div>
                    {item.type === 0 ? <Image
                        style={{
                            cursor: "pointer",
                            width: "100%"
                        }}
                        key={index}
                        src={item.link}
                        preview={false}
                        onClick={() => setImageVideo(item)}
                    /> : <video src={item.link} style={{ width: "100%" }} onClick={() => setImageVideo(item)} />}
                    <p className="legend">{item.title}</p>
                </div>
            })}
        </CarouselCustom>

        <Title><p style={{ margin: 0 }}>
            <span>Các sự cố</span>
        </p></Title>
        <TableCustom columns={problemColumns} dataSource={problems} onChange={() => { }} pagination />
    </Container >;
}

const TableCustom = styled(Table)`

`;

const CarouselCustom = styled(Carousel)`
    .ant-image{
        width: 100%;
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 35px;
    text-align: center;
    margin-bottom: 10px;

    p {
        text-align: left;
      
        span {
            display: inline-block;
            font-size: 25px;
            margin-top: 30px;
            width: auto;
    
            &:after{
                display: block;
                content: "";
                border-bottom: 2px solid #ccc;
            }
        }
    }
`;

const Info = styled.div`
    font-size: 18px;

    .ant-row{
        margin-bottom: 10px;
    }

    div{
        strong{

        }
    }
`;

export default Detail;