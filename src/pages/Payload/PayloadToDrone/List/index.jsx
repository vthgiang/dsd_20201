
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
import { Redirect } from 'react-router-dom';




 

class PayloadDroneHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listPayloadDroneHistory:[],
      payloadId: '',
      PayloadOptions: [],
      PayloadTypeOptions: [],
      idPayloadReturn: null,
      visableReturnModal: false,

      payloadCode: '',
      payloadName: '',
      status: '',
      startedAt: '',
      type: '',
    }
  }

 

  componentDidMount() {
    // axios.get('https://dsd06.herokuapp.com/api/payloadregister/histories/:id')
    //   .then(res => {
    //     const listPayloadDroneHistory = res.data;
    //     console.log(res.data);
    //     this.setState({ listPayloadDroneHistory });
    //   })
    this.getAllPayload();
    this.getAllTypePayload();
  }

  getAllPayload() {
    axios.get('https://dsd06.herokuapp.com/api/payload')
    .then(res => {
      const options = res.data.map(payload =>
        ({
          label: payload.name,
          value: payload._id,
        })
      )
      this.setState({PayloadOptions: options});
    })
  }

  getAllTypePayload() {
    axios.get(`https://dsd06.herokuapp.com/api/payloadtype`)
      .then(res => {
        const options = res.data.map(payload =>
          ({
            label: payload.name,
            value: payload._id,
          })
        )
        this.setState({ PayloadTypeOptions: options });
      })
    
  }

  handleFindPayloadHistory(values){
    // const payloadId = { payloadId: values.payloadId };
    axios.get('https://dsd06.herokuapp.com/api/payloadregister/histories/' + values.payloadId)
      .then(res => {
        const listPayloadDroneHistory = res.data;
        listPayloadDroneHistory.map(payloadHistory => {
          const payloadId = payloadHistory.payload;
          this.setState(
            {startedAt: payloadHistory.startedAt,
              type: payloadHistory.type,
              payloadId: payloadHistory.payload
            });
          this.findPayloadById(payloadId);
        })
        console.log(listPayloadDroneHistory);
        this.setState({ listPayloadDroneHistory });
        // this.setState({ payloadId: res.data.payload});
        
      })

  }

  findPayloadById(payloadId) {
    axios.get('https://dsd06.herokuapp.com/api/payload/' + payloadId)
    .then(res => {
      const payload = res.data;
      this.setState({
        payloadCode: payload.code,
        payloadName: payload.name,
        status: payload.status
      })
    })
  }

  handleCancelReturnPayload = e => {
    this.setState({ visableReturnModal: false })
  }

  showModalReturnPayload() {
    this.setState({ visableReturnModal: true })
    this.setState({ idPayloadReturn: this.state.payloadId })
  }

  returnPayload() {
    axios.post('https://dsd06.herokuapp.com/api/payloadregister/return/' + this.state.idPayloadReturn)
    .then(res => {
      console.log(res.data);
        this.setState({ visableReturnModal: false })
        this.handleFindPayloadHistory();
    })
  }

  renderModalReturnPayload() {
    return <div>
      <p>Bạn có chắc trả lại payload này?</p>
      <Button type="primary" danger onClick={() => this.returnPayload()}>Trả payload</Button>
    </div>

  }

  render() {
    //let history = useHistory();
    const typeDeviceOption = [
      { value: 'camera', label: 'Camera' },
      { value: 'micro', label: 'Micro' },
      { value: 'sensor', label: 'Sensor' }
    ]
    
    const columns = [
      // {
      //   title: 'STT',
      //   dataIndex: 'id',
      //   key: 'id',
      // },
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
      // {
      //   title: 'Loại thiết bị',
      //   dataIndex: 'typeDevice',
      //   key: 'typeDevice',
      // },
      // {
      //   title: 'Tên Drone',
      //   dataIndex: 'drone',
      //   key: 'drone',
      // },
      // {
      //   title: 'Phí dịch vụ',
      //   dataIndex: 'fee',
      //   key: 'fee'
      // },
      // {
      //   title:  'Lý do',
      //   dataIndex: 'reason',
      //   key: 'reason'
      // },
      // {
      //   title: 'Ngày đăng ký',
      //   dataIndex: 'createdTime',
      //   key: 'createdTime',
      // },
      // {
      //   title: 'Payload',
      //   dataIndex: 'payloadId',
      //   key: 'payloadId'
      // },
      {
        title: 'Thời gian bắt đầu',
        dataIndex: 'startedAt',
        key: 'startedAt'
      },
      {
        title: 'Trạng thái',
        dataIndex: 'type',
        key: 'type'
      },
      // {
      //   title: 'Hành động',
      //   key: 'payloadId',
      //   width: 100,
      //   dataIndex: 'payloadId',
      //   render: (text, record) => (
      //     <Space size="small" >
      //       {/* <Button type="link" onClick={() => this.props.history.push('/edit-signup-payload-drone')}>Sửa</Button> */}
      //       {/* <Button danger type="text">Trả payload</Button> */}
      //       <Button style={{backgroundColor: "red", color:"white"}} danger type="text" onClick={() => this.showModalReturnPayload()}>Trả payload</Button>
      //     </Space>
      //   ),
      // },
    ];

    // const dataSource = 
    //   this.state.listPayloadDroneHistory.map(payloadDroneHistory =>
    //     // ({
    //     //   id: payloadDroneHistory.id,
    //     //   payloadCode: payloadDroneHistory.payload.code,
    //     //   payloadName: payloadDroneHistory.payload.name,
    //     //   type: payloadDroneHistory.type,
    //     //   reason: payloadDroneHistory.reason,
    //     //   fee: payloadDroneHistory.fee,
    //     //   droneId: payloadDroneHistory.droneId,
    //     //   startedAt: payloadDroneHistory.startedAt,
    //     //   finishedAt: payloadDroneHistory.finishedAt
    //     // })
    //     ({
    //         droneId: payloadDroneHistory.droneId,
    //         payloadId: payloadDroneHistory.payload,
    //         startedAt: payloadDroneHistory.startedAt,
    //         type: payloadDroneHistory.type,


    //     })
    //   )

    const dataSource = [{
      payloadCode: this.state.payloadCode,
      payloadName: this.state.payloadName,
      startedAt: this.state.startedAt,
      type: this.state.type,
      payloadId: this.state.payloadId
    }]
  
      const { visible, visibleAdd, visableReturnModal, currentTable, tables } = this.state;

    
    return (
    <StyleList>
      <div>
      <h1 style={{fontWeight:'bold', fontSize:16}}>Danh sách lịch sử đăng ký payload drone</h1>
        <Form
          layout="horizontal"
           className="searchtype"
           onFinish={(values) => this.handleFindPayloadHistory(values)}
          // onValuesChange={onFormLayoutChange}
          // size={componentSize}
        >
          <Row justify="space-around">
            {/* <Col span={4}>
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
            </Col> */}
            <Col span={3}>
              <Form.Item label="Payload" name="payloadId">
                <Select options={this.state.PayloadOptions}></Select>
              </Form.Item>
            </Col>

            <Col span={3}>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} >
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

        <Modal
          title="Xóa Payload"
          visible={visableReturnModal}
          // onOk={this.handleOkDelete}
          onCancel={this.handleCancelReturnPayload}
          footer={null}
        >
          {
            this.renderModalReturnPayload()
          }
        </Modal>
    </StyleList>
    );
  }
}
export default PayloadDroneHistory; 
