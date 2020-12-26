import { BellOutlined } from "@ant-design/icons";
import Rating from '@material-ui/lab/Rating';
import { Avatar, Badge, Button, List, message, Popover, Spin } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { ref } from '../config4';
import { StyleListNotification } from './index.style';
import { useHistory } from "react-router-dom";
import {
  createNotificationSubscription,
  initializePushNotifications,
  isPushNotificationSupported,
  registerServiceWorker,
  sendSubscriptionToPushServer
} from '../../../services/pushNotifications';

var axios = require('axios');

const BellNotification = () => {

  const history = useHistory();
  const [total, setTotal] = useState(0);
  const [newNotifications, setNewNotifications] = useState([]);
  const [first, setFirst] = useState(true);
  const [diff, setDiff] = useState(0);
  const count = 5;
  const [index, setIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user));

  // useEffect(() => {
  //   newNotifications.forEach(item => { 
  //     item.isNew = true;
  //     if (!notifications.includes(item)){
  //       setNotifications([item, ...notifications])
  //     }
  //   })
  // }, [newNotifications])

  // useEffect(() => {
  //   // if (!first) setInterval(() => fetchNewNotification(0, 0), 5000);
  // }, [total])

  useEffect(() => {
    if (user.user.id){
      loadData(0, 5);
      subcribe();
    }
    else
      setUser(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user))

  }, [user])


  const subcribe = () => {
    console.log("clicked to send subcription")
    if (isPushNotificationSupported()) {
      initializePushNotifications().then(result => {
        if (result === "granted") {
          console.log("start registering sw")
          registerServiceWorker();
          createNotificationSubscription().then(subscription => {
            sendSubscriptionToPushServer({
              subscription: subscription,
              project_type: localStorage.getItem("project-type"),
              userID: user.user.id
            })
          });
        }
      })
    }
  }

  const openMessage = (loading, loaded, timeout) => {
    const key = 'updatable';
    message.loading({ content: loading, key });
    setTimeout(() => {
      message.success({ content: loaded, key, duration: 2 });
    }, timeout);
  };

  const handleClick = (id) => {
    history.push(`/warning-detail/${id}`)
  }

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    if (notifications.length > 20) {
      setHasMore(false);
      setLoading(false);
      return;
    }
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
                <Button size="small" type="primary" style={{ background: "#009933" }} onClick={() => openMessage("Processing the incidents", "Processed the incidents succesfully", 2000)} > Confirm</Button>,
                <Button size="small" type="primary" onClick={() => openMessage("Declining the incidents", "Declined the incidents succesfully", 500)} danger>Decline</Button>
              ]}
              //  extra={item.isNew && <Badge status="processing" style={{ marginLeft: 0, marginTop: 25 }} />}
              key={item._id}>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size={64} src={ref.prop[item.ref._type].img} />
                }
                title={<a onClick={() => handleClick(item._id)} href="">{item.content}</a>}
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
      </InfiniteScroll >
    </StyleListNotification >
  );


  const getConfig = (start, to) => {
    // var user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
    var config = {
      method: 'get',
      url: 'https://it4483-dsd04.herokuapp.com/get_list_ntf_type',
      params: {
        index: start,
        count: to,
        userID: user.user.id,
        type: 15
      }
    };
    return config;
  }

  const fetchNewNotification = (start, to) => {
    console.log("fetching notifications")
    var config = getConfig(start, to);
    axios(config)
      .then(function (response) {
        const newTotal = response.data.data.total;
        if (newTotal !== total) {
          setTotal(response.data.data.total);
          setDiff(newTotal - total);
          axios(getConfig(0, newTotal - total))
            .then(function (response) {
              console.log(`new Notifications`, response.data.data.notifications);
              setNewNotifications(response.data.data.notifications);
            })
            .catch(function (error) {
              console.log(error);
            });
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const loadData = async (start, to) => {
    console.log(`${index} -- ${count}`)
    var config = getConfig(start, to);
    axios(config)
      .then(function (response) {
        setFirst(false);
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
      <Badge count={diff ? diff : null}>
        <BellOutlined style={{ color: "gray", fontSize: 32 }} />
      </Badge>
    </Popover>
  )
}

export default BellNotification;