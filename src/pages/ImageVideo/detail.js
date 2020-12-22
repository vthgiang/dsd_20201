import { Col, Image, Row, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { problemColumns, problemTypesKD, problemTypes } from './config';

function Detail() {
    const { params } = useRouteMatch();

    const [imageVideo, setImageVideo] = useState({});
    const [imageVideoRelated, setImageVideoRelated] = useState([]);
    const [problems, setProblems] = useState([]);

    const renderDescription = (description) => {
        if (description) {
            const arr = description?.split(" ");
            const objId = arr.pop();

            return <div>{arr.join(" ")} <Link to="#">{objId}</Link></div>;
        }
        return null;
    }

    useEffect(() => {
        const fetchData = async () => {
            const res1 = await axios({
                method: "GET",
                url: `https://it4483team2.herokuapp.com/api/records/${params.id}`
            });


            const res2 = await axios({
                method: "GET",
                url: `https://it4483team2.herokuapp.com/api/records/monitored/images/${res1.data.monitoredObjectId}`
            });


            const res3 = await axios({
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

            console.log({ res3 });



            setImageVideo(res1.data);
            setImageVideoRelated(res2.data.result);
            setProblems(res3.data.incidents);
        }

        fetchData();
    }, [])

    return <Container>
        <Title>Thông tin chi tiết</Title>

        <Row gutter={24}>
            <Col md={10}>
                <Image
                    width="100%"
                    height="100%"
                    src={imageVideo.link}
                />
            </Col>
            <Col md={14}>
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
                            <strong>Đối tượng:</strong>
                        </Col>
                        <Col md={20}>
                            <Link to="#">{imageVideo.monitoredObjectId}</Link>
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

        <Title><p>
            <span>{imageVideo.type === 0 ? "Ảnh" : "Video"} liên quan</span>
        </p></Title>
        <Row gutter={[24, 24]}>
            {imageVideoRelated.map((item, index) => {
                console.log({ item });
                return <Col md={4}>
                    <Image
                        style={{
                            cursor: "pointer"
                        }}
                        key={index}
                        src={item.link}
                        preview={false}
                        onClick={() => setImageVideo(item)}
                    />
                </Col>
            })}
        </Row>

        <Title><p style={{ margin: 0 }}>
            <span>Các sự cố</span>
        </p></Title>
        <TableCustom columns={problemColumns} dataSource={problems} onChange={() => { }} pagination />
    </Container >;
}

const TableCustom = styled(Table)`

`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 40px;
    text-align: center;

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