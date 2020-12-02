import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { Popover, Badge } from "antd";
import {
  createNotificationSubscription,
  initializePushNotifications,
  isPushNotificationSupported,
  registerServiceWorker
} from '../../../services/pushNotifications';

var axios = require('axios');

const BellNotification = () => {

  useEffect(() => {
    loadData();
    setInterval(loadData, 30000000);
  }, [])

  const notification = () => (
    <div>
      <p>Thông báo</p>
    </div>
  );

  const loadData = () => {
    try {

      if (isPushNotificationSupported()) {
        initializePushNotifications().then(result => {
          if (result === "granted") {
            console.log("start registering sw")
            registerServiceWorker();
            createNotificationSubscription().then(subscription => {
              console.log(`subscription: ${subscription}`);
              var config = {
                method: 'post',
                url: 'http://localhost:5000/get_notifications',
                headers: {
                  'Content-Type': 'application/json'
                },
                data: JSON.stringify({ subscription: subscription })
              };
              axios(config)
                .then(function (response) {
                  console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          }
        })
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Popover
      placement="bottom"
      title="Thông báo"
      content={notification}
      trigger="click"
    >
      <Badge count={99}>
        <BellOutlined style={{ color: "gray", fontSize: 32 }} />
      </Badge>
    </Popover>
  )
}

export default BellNotification;