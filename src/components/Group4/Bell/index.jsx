import { BellOutlined } from "@ant-design/icons";
import Rating from '@material-ui/lab/Rating';
import { Avatar, Badge, Button, List, message, Popover, Spin } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { ref, BASE_URL } from '../config4';
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
  const [diff, setDiff] = useState(0);
  const count = 5;
  const [index, setIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [user, setUser] = useState(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user));

  useEffect(() => {
    setInterval(() => updateOutputFromIndexedDB(), 5000);
    openIndexDB(window.indexedDB)
    .then(db => {
      addPush(db, { key: "token", payload: localStorage.getItem("token")})
      addPush(db, { key: "project-type", payload: localStorage.getItem("project-type")})
    }).catch(err => {
      console.log(err);
    })
  })

  useEffect(() => {
    if (user.user.id){
      loadData(0, 5);
      var is_root = window.location.pathname == "/" || window.location.pathname == "/dashboard";
      if (is_root) subcribe();
    }
    else
      setUser(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user))

  }, [user])


  // a simple function to open the indexedDB
  const openIndexDB = (indexedDB, v = 1) => {
    const req = indexedDB.open("my-db", v);
    return new Promise((resolve, reject) => {
      req.onupgradeneeded = e => {
        const thisDB = e.target.result;
        if (!thisDB.objectStoreNames.contains("pushes")) {
          const pushesOS = thisDB.createObjectStore("pushes", { keyPath: "key" });
          pushesOS.createIndex("payload", "payload", { unique: true });
        }
      };
      req.onsuccess = e => resolve(e.target.result);
      req.onerror = error => reject(error);
    });
  }

  const addPush = (db, item) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["pushes"],"readwrite");
      const store = transaction.objectStore("pushes");
      var request = store.get(item.key);
      request.onerror = function(event) {
        console.log(`newNotification is not in DB`)
        store.add(item)
      };
      request.onsuccess = function(event) {
        var requestUpdate = store.put(item);
        requestUpdate.onerror = function(event) {
          console.log("update failed")
        };
        requestUpdate.onsuccess = function(event) {
          console.log("update successfully")
        };
      };
    })
  }

// a function go get all the pushes from indexedDB instance
  const getPushes = (db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["pushes"], "readwrite");
      const store = transaction.objectStore("pushes");
      const req = store.get("newNotification");

      req.onerror = e => reject(e);
      req.onsuccess = e => resolve(e);
    });
  }

  // a function go get all the pushes from indexedDB instance
  const deletePushes = (db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["pushes"], "readwrite");
      const store = transaction.objectStore("pushes");
      const req = store.delete("newNotification");
      req.onerror = e => reject(e);
      req.onsuccess = e => resolve(e);
    });
  }

// update the UI with data from indexedDB
const updateOutputFromIndexedDB = () => {  
  openIndexDB(window.indexedDB)
    .then(db => getPushes(db))
    .then(event => {
      const item = event.target.result;
      if (item) console.log(`new notification: `, item)
      if (item){ 
        setDiff(1)
        setNotifications([item.payload, ...notifications])
        openIndexDB(window.indexedDB).then(
          db => {
            deletePushes(db).then(
              // console.log("deleted newNotification from indexed DB")
            ).catch(
              // console.log("cannot delete newNotification")
            )
          }
        )
      };
    });
}


  const subcribe = () => {
    console.log("clicked to send subcription")
    if (isPushNotificationSupported()) {
      initializePushNotifications().then(async (result) => {
        if (result === "granted") {
          console.log("start registering sw")
          await registerServiceWorker();
          createNotificationSubscription().then(subscription => {
          console.log(`sending subcription to server`);
          // console.log(subscription)
          if (subscription){
            sendSubscriptionToPushServer({
              subscription: subscription,
              project_type: localStorage.getItem("project-type"),
              userID: user.user.id
            })
          }
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

  const notification = () => {
    // setDiff(0);
    return ( <StyleListNotification>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
        onClick={() => setDiff(0)}
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
  );}


  const getConfig = (start, to) => {
    // var user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
    var config = {
      method: 'get',
      url: `${BASE_URL}/get_list_ntf_type`,
      params: {
        index: start,
        count: to,
        userID: user.user.id,
        type: 15
      }
    };
    return config;
  }


  const loadData = async (start, to) => {
    // console.log(`${index} -- ${count}`)
    var config = getConfig(start, to);
    axios(config)
      .then(function (response) {
        setNotifications([...notifications, ...response.data.data.notifications]);
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