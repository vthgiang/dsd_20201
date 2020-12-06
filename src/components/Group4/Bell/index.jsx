import { BellOutlined } from "@ant-design/icons";
import Rating from '@material-ui/lab/Rating';
import { Avatar, Badge, Button, List, message, Popover, Spin } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { ref } from '../config4';
import { StyleListNotification } from './index.style';


var axios = require('axios');

const BellNotification = () => {

  const [total, setTotal] = useState(0);
  const count = 5;
  const [index, setIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadData(0, 5);
    // setInterval(() => loadData(0, 0), 5000);
  }, [])

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    if (notifications.length > 20) {
      message.warning('Infinite List loaded all');
      setHasMore(false);
      setLoading(false);
      return;
    }
    console.log(`${hasMore} -- ${loading}`)
    loadData(index, count);
  }

  const notification = () => (
    <StyleListNotification>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          itemLayout="vertical"
          dataSource={notifications}
          renderItem={item => (
            <List.Item
              actions={[
                <Button size="small" type="primary">Accept</Button>,
                <Button size="small" type="primary" danger>Decline</Button>
              ]}
              key={item._id}>

              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size={64} src={ref.prop[item.ref._type].img} />
                }
                title={<a href="https://ant.design">{item.content}</a>}
                description={<Rating name="read-only" value={item.level || 0} readOnly style={{ color: "red" }} />}
              />
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
    </StyleListNotification>
  );

  const loadData = (start, to) => {
    console.log(`${index} -- ${count}`)
    var config = {
      method: 'get',
      url: 'https://it4483-dsd04.herokuapp.com/get_list_ntf',
      headers: {
        'Content-Type': 'application/json',
        'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
        'project-type': 'CHAY_RUNG'
      },
      params: {
        index: start,
        count: to
      }
    };

    axios(config)
      .then(function (response) {
        console.log(`notifications: ${notifications.length}`)
        setTotal(response.data.data.total);
        setNotifications(notifications.concat(response.data.data.notifications));
        setIndex(index + to);
        setLoading(false);
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
      <Badge total={total}>
        <BellOutlined style={{ color: "gray", fontSize: 32 }} />
      </Badge>
    </Popover>
  )
}

export default BellNotification;