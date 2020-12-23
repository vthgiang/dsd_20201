import React, { useEffect, useState } from 'react';
import { Table, Space, Button, BackTop, Input, Col, Card, DatePicker, Form, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import StatisticActivity from './StatisticActivity';
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
    if (fromDate && toDate && projectType === 'all_project') {  
      url = 'https://it4883logging.herokuapp.com/api/receive-statistical?minDate=' + fromDate +'&maxDate=' + toDate;
    } else if (fromDate && toDate && projectType !== 'all_project') {
      url = 'https://it4883logging.herokuapp.com/api/receive-statistical?minDate=' + fromDate +'&maxDate=' + toDate +'&projectType=' + projectType;
    } else if (projectType === 'all_project') {
      url = 'https://it4883logging.herokuapp.com/api/receive-statistical?projectType=de_dieu';
    } else {
      url = 'https://it4883logging.herokuapp.com/api/receive-statistical?projectType=' + projectType;
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

  const onProjectTypeChange = (projectType) => {
    setProjectType(projectType);
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
            Lịch sử báo cáo thống kê
          </h2>
          <br />
          <Form layout="inline">
            <Form.Item
              label="Chọn khoảng thời gian"
            >
              <RangePicker format='DD/MM/YYYY' onChange={(dates, dateStrings) => onRangePickerChange(dates, dateStrings)} />
            </Form.Item>
            {user.role === 'SUPER_ADMIN' ? 
              <Form.Item label="Chọn loại dự án">
                <Select defaultValue="de_dieu" style={{width: 120}} onChange={(value) => {
                  setIsLoadedLogActivity(false);
                  onProjectTypeChange(value);
                  fetchData();
                }}>
                  <Option value="de_dieu">Đê điều</Option>
                  <Option value="luoi_dien">Lưới điện</Option>
                  <Option value="chay_rung">Cháy rừng</Option>
                  <Option value="cay_trong">Cây trồng</Option>
                </Select>
              </Form.Item>
              : <></>
          }
              
          </Form>
          <br />
            <StatisticActivity data={logActivityData} loading={!isLoadedLogActivityData}/>
          
        </Card>
      </Col>
      <BackTop/>
    </>
  );
}
export default App;