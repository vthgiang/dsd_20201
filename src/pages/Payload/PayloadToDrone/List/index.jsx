
// import React from 'react';
// import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
// import { Button } from 'antd';
// import StyleList from '../index.style';
// import { useState } from 'react';
// import { SearchOutlined } from '@ant-design/icons';

// const PayloadDrone = ({ history }) => {
//   const dataSource = [
//     {
//       key: '1',
//       payloadCode: 'C100',
//       name: 'Camera 1',
//       typeDevice: 'Camera',
//       drone: "Drone 32",
//       createdTime: '16/11/2020',
//     },
//     {
//       key: '2',
//       payloadCode: 'M100',
//       name: 'Micro 1',
//       typeDevice: 'Micro',
//       drone: "Drone 32",
//       createdTime: '16/11/2020',
//     },
//   ];
  
//   let visible = false ;
  
//  /*  function editClick(record){
//     visible = true;
//     //alert(record.key);
//     alert(visible)
//     //alert(visible)
//   }; */

//   const columns = [
//     {
//       title: 'STT',
//       dataIndex: 'key',
//       key: 'name',
//     },
//     {
//       title: 'Mã payload',
//       dataIndex: 'payloadCode',
//       key: 'payloadCode',
//     },
//     {
//       title: 'Tên payload',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Loại thiết bị',
//       dataIndex: 'typeDevice',
//       key: 'typeDevice',
//     },
//     {
//       title: 'Tên Drone',
//       dataIndex: 'drone',
//       key: 'drone',
//     },
    
//     {
//       title: 'Ngày đăng ký',
//       dataIndex: 'createdTime',
//       key: 'createdTime',
//     },
//     {
//       title: 'Hành động',
//       key: 'operation',
//       width: 100,
//       render: (text, record) => (
//         <Space size="small" >
//           <Button type="link" onClick={() => history.push('/edit-signup-payload-drone')}>Sửa</Button>
//           <Button danger type="text">Xóa</Button>
//         </Space>
//       ),
//     },
//   ];
//   const [componentSize, setComponentSize] = useState('default');
//   const onFormLayoutChange = ({ size }) => {
//     setComponentSize(size);
//   };
//   const typeDeviceOption = [
//     { value: 'camera', label: 'Camera' },
//     { value: 'micro', label: 'Micro' },
//     { value: 'sensor', label: 'Sensor' }
//   ]

//   return (
//     <StyleList>
//       <div>
//         <h1 style={{fontWeight:'bold', fontSize:16}}>Danh sách đăng ký payload drone</h1>
//         <Form
//           layout="horizontal"
//           initialValues={{ size: componentSize }} className="searchtype"
//           onValuesChange={onFormLayoutChange}
//           size={componentSize}
//         >
//           <Row justify="space-around">
//             <Col span={4}>
//               <Form.Item label="Từ ngày">
//                 <DatePicker />
//               </Form.Item>
//             </Col>
//             <Col span={4}>
//               <Form.Item label="Đến ngày">
//                <DatePicker></DatePicker>
//               </Form.Item>
//             </Col>
//             <Col span={4}>
//               <Form.Item label="Loại thiết bị">
//                <Select options = {typeDeviceOption}/>
//               </Form.Item>
//             </Col>

//             <Col span={3}>
//               <Button type="primary" icon={<SearchOutlined />}>
//                 Tìm kiếm
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//         <Button type="primary" className="buttontype" onClick={() => history.push('/add-signup-payload-drone')}>Đăng ký mới</Button>
//         <Table dataSource={dataSource} columns={columns} />;
//         </div>

//         <Modal
//           title="Basic Modal"
//           visible={visible}
//           //onOk={handleOk}
//           //onCancel={handleCancel}
//         >
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//         </Modal>
//     </StyleList>
//   );
// };

// export default PayloadDrone;


// New COMPONENT

import React, { Component } from 'react';
import { Table, Space, Input, Form, Select, Modal, DatePicker, Row, Col} from 'antd';
import { Button } from 'antd';
import StyleList from '../index.style';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';




 

class PayloadDroneHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listPayloadDroneHistory:[]
    }
  }

 

  componentDidMount() {
    console.log("aaaa");
    axios.get('https://dsd06.herokuapp.com/api/payloadregister/histories/:id')
      .then(res => {
        const listPayloadDroneHistory = res.data;
        console.log("aaaa");
        console.log(res.data);
        this.setState =({ listPayloadDroneHistory });
      })
  }

  render() {
    //let history = useHistory();
    const typeDeviceOption = [
      { value: 'camera', label: 'Camera' },
      { value: 'micro', label: 'Micro' },
      { value: 'sensor', label: 'Sensor' }
    ]
    
    const columns = [
      {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Mã payload',
        dataIndex: 'payloadCode',
        key: 'payloadCode',
      },
      {
        title: 'Tên payload',
        dataIndex: 'payloadName',
        key: 'payloadName',
      },
      {
        title: 'Loại thiết bị',
        dataIndex: 'typeDevice',
        key: 'typeDevice',
      },
      {
        title: 'Tên Drone',
        dataIndex: 'drone',
        key: 'drone',
      },
      {
        title:  'Lý do',
        dataIndex: 'reason',
        key: 'reason'
      },
      {
        title: 'Ngày đăng ký',
        dataIndex: 'createdTime',
        key: 'createdTime',
      },
      {
        title: 'Hành động',
        key: 'operation',
        width: 100,
        render: (text, record) => (
          <Space size="small" >
            <Button type="link" onClick={() => this.props.history.push('/edit-signup-payload-drone')}>Sửa</Button>
            <Button danger type="text">Xóa</Button>
          </Space>
        ),
      },
    ];

    const dataSource = 
      this.state.listPayloadDroneHistory.map(payloadDroneHistory =>
        ({
          id: payloadDroneHistory.id,
          payloadCode: payloadDroneHistory.payload.code,
          payloadName: payloadDroneHistory.payload.name,
          type: payloadDroneHistory.type,
          reason: payloadDroneHistory.reason,
          droneId: payloadDroneHistory.droneId,
          startedAt: payloadDroneHistory.startedAt,
          finishedAt: payloadDroneHistory.finishedAt
        })
      )
    
    
    return (
    <StyleList>
      <div>
      <h1 style={{fontWeight:'bold', fontSize:16}}>Danh sách lịch sử đăng ký payload drone</h1>
        <Form
          layout="horizontal"
           className="searchtype"
          // onValuesChange={onFormLayoutChange}
          // size={componentSize}
        >
          <Row justify="space-around">
            <Col span={4}>
              <Form.Item label="Từ ngày">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Đến ngày">
               <DatePicker></DatePicker>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Loại thiết bị">
               <Select options = {typeDeviceOption}/>
              </Form.Item>
            </Col>

            <Col span={3}>
              <Button type="primary" icon={<SearchOutlined />}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
        <Button type="primary" className="buttontype" onClick={() => this.props.history.push('/add-signup-payload-drone')}>Đăng ký mới</Button>
        <Table dataSource={dataSource} columns={columns} />;
        </div>

        <Modal
          title="Basic Modal"
          // visible={visible}
          //onOk={handleOk}
          //onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </StyleList>
    );
  }
}
export default PayloadDroneHistory; 
