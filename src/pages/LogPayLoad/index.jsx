import React, { useEffect, useState } from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import PayloadActivity from './PayloadActivity';
import { useDispatch, useSelector } from "react-redux";
var axios = require('axios');
const { RangePicker } = DatePicker;
const {Option} = Select;

function App () {

  const user = useSelector(state => state.user.user);

  const [projectType, setProjectType] = useState(user.type.toLowerCase());
  const [logActivityData, setLogActivityData] = useState(null);
  const [isLoadedLogActivityData, setIsLoadedLogActivity] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = (fromDate, toDate) => {
    let url = null;
    if (fromDate && toDate) {
      url = 'https://it4883logging.herokuapp.com/api/payload?minDate=' + fromDate +'&maxDate=' + toDate +'&projectType=' + projectType;
    } else {
      url = 'https://it4883logging.herokuapp.com/api/payload?projectType=' + projectType;
    }
     
    let config = {
      method: 'get',
      url: url,
      headers: {}
    };

    axios(config)
      .then((response) => {
        let logActivityData = response.data.map((data, index) => ({
          key: index,
          ...data
        }));
        logActivityData.forEach((logData) => {
          for(let key in logData) {
            if (logData[key] == null) logData[key] ='';
          }
        });
        setLogActivityData(logActivityData);
        setIsLoadedLogActivity(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onRangePickerChange = async (dates, dateStrings) => {
    setIsLoadedLogActivity(false);
    if (dates) 
    	await fetchData(dates[0].format('YYYY-MM-DDT00:00:00'), dates[1].format('YYYY-MM-DDT23:59:59'));
    else await fetchData();
  }

  return (
    <>
      <Col style={{ marginRight: '4%', marginTop: 20 }}>
        <Card
          hoverable
          style={{ width: '100', marginLeft: 40 }}
          cover={
            <img
              style={{ height: 400 }}
              alt="example"
              src="https://i.pinimg.com/originals/11/9d/e3/119de34b79d90fc7ee2c175525726741.jpg"
            />
          }
        >
          <h2>
            Lịch sử hoạt động của payload
          </h2>
          <br />
          <Form layout="inline">
            <Form.Item
              label="Chọn khoảng thời gian"
            >
              <RangePicker format='DD/MM/YYYY' onChange={(dates, dateStrings) => onRangePickerChange(dates, dateStrings)} />
            </Form.Item>
          </Form>
          <br />
            <PayloadActivity data={logActivityData} loading={!isLoadedLogActivityData}/>
          
        </Card>
      </Col>
      <BackTop/>
    </>
  );
}
export default App;