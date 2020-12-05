import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Popover, Badge } from "antd";
import { List, message, Avatar, Spin, Space } from 'antd';
import Rating from '@material-ui/lab/Rating';
import './index.style.css';
import { ref } from '../config4'
import { Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import InfiniteScroll from 'react-infinite-scroller';

var axios = require('axios');

const BellNotification = () => {

  const [count, setCount] = useState();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  useEffect(() => {
    loadData();
    setInterval(loadData, 5000);
  }, [count])

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    if (notifications.length > 20) {
      message.warning('Infinite List loaded all');
      setHasMore(false);
      setLoading(false);
      return;
    }
  }

  const notification = () => (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          dataSource={notifications}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          renderItem={item => (
            <List.Item key={item._id}>
              <Row>
                <Col span={12}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={ref.prop[item.ref._type].img} />
                    }
                  />
                </Col>
                <Col span={12}>
                  <p><a href="https://ant.design">{item.content}</a></p>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Rating name="read-only" value={item.level || 0} readOnly />
                </Col>
              </Row>
            </List.Item>
          )}
        >
          {loading && hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );

  const loadData = () => {
    var config = {
      method: 'get',
      url: 'https://it4483-dsd04.herokuapp.com/get_list_ntf',
      headers: {
        'Content-Type': 'application/json',
        'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
        'project-type': 'CHAY_RUNG'
      }
    };

    axios(config)
      .then(function (response) {
        setCount(response.data.data.length);
        setNotifications(response.data.data);
        console.log(`loading data: ${response.data.data.length}`);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <Popover
      placement="bottom"
      title="Thông báo"
      content={notification}
      trigger="click"
      style={{ width: 300 }}
    >
      <Badge count={count}>
        <BellOutlined style={{ color: "gray", fontSize: 32 }} />
      </Badge>
    </Popover>
  )
}

export default BellNotification;