import React, { useState, useRef } from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import Video from '../../../components/Group09/Video';
import Form from '../../../components/Group09/Video/Form';
import VideoList from '../../../components/Group09/Video/VideoList';
const { Title } = Typography;
let incidents = [];

const VideoGalley = (props) => {
  const videoRef = useRef();
  const [reload, setReload] = useState(false);
  const setMakersByIncidents = (incidents) => {
    videoRef.current.setMakersByIncidents(incidents);
  };
  const onStartIncident = () => {
    let currentTime = videoRef.current.currentTime();
    incidents.push({
      time: currentTime.toFixed(2),
      isFinish: false,
      text: '',
      tags: [],
      duration: 1,
      overlayText: "I'm new",
    });
    setMakersByIncidents(incidents);
  };

  const onStopIncident = (tags = []) => {
    let currentIncident = incidents.find((item) => !item.isFinish);
    incidents = incidents.filter((item) => item.isFinish);
    if (!currentIncident) return;
    currentIncident.isFinish = true;
    let currentTime = videoRef.current.currentTime().toFixed(2);
    currentIncident.duration = currentTime - currentIncident.time || 0;
    currentIncident.text = tags.toString();
    currentIncident.tags = tags;
    incidents.push(currentIncident);
    setMakersByIncidents(incidents);
    setReload(!reload);
  };

  const onChangeTags = (_incidents = []) => {
    incidents = _incidents;
    setMakersByIncidents(incidents);
    setReload(!reload);
  };

  return (
    <div>
      <Title style = {{color: "red"}} level={5}>Màn này chưa xong vì nhóm Video/Hình ảnh chưa làm được phần stream video!!!</Title>
      <Row gutter={32}>
        <Col xs={24} md={18}>
          <Video ref={videoRef} incidents={incidents} />
        </Col>
        <Col xs={24} sm={6}>
          <Form
            onStartIncident={onStartIncident}
            onStopIncident={onStopIncident}
          />
        </Col>
      </Row>
      <Row gutter={32}>
        <Col xs={24} md={18}>
          <Divider orientation="left" plain>
            <Title level={5}>Danh sách video sự cố</Title>
            
          </Divider>
          <VideoList incidents={incidents} onChangeTags={onChangeTags} />
        </Col>
      </Row>
    </div>
  );
};

export default VideoGalley;
