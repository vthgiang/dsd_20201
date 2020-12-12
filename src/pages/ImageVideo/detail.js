import { Col, Image, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { problemTypes } from './config';

function Detail() {
    const { params } = useRouteMatch();

    const [imageVideo, setImageVideo] = useState({});

    useEffect(() => {
        axios({
            method: "GET",
            url: `https://it4483team2.herokuapp.com/api/records/${params.id}`
        }).then(({ data }) => {
            console.log({ data });
            setImageVideo(data)
        })
    }, [])

    console.log({ imageVideo });

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
                            <span>{imageVideo.description}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <strong>Loại dữ liệu:</strong>
                        </Col>
                        <Col md={20}>
                            <span>{imageVideo.type === 0 ? "Image" : "Video"}</span>
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
    </Container >;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Title = styled.h1`
    font-size: 40px;
    text-align: center;
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