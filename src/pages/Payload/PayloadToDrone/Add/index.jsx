

//NEW COMPONENT
import React, { Component } from "react";
import { Form, Input, Button, Select, DatePicker} from 'antd';
import StyleEdit from '../index.style';
import axios from 'axios';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TextArea } = Input;

class AddSignupPayloadDrone extends Component {

  constructor(props) {
    super(props)

  }

  state = {
        time: '',
        payloadType: '',
        payloadId: '',
        panning: '',
        titling: '',
        zoom: '',
        manufacturer: '',
        opticalZoom: '',
        digitalZoom: '',
        shooting: '',
        tracking: '',
        drone: ''
      }
    
      handleChange = event => {
            this.setState({
              // time: event.target.value,
              panning: event.target.value,
              tilting: event.target.value,

              zoom: event.target.value,

              autoTracking: event.target.value,

              shootInterval: event.target.value,
              reason: event.target.value,
              droneId: event.target.value,
            });
          }
        
      handleSubmit = event => {
            event.preventDefault();
        
            const payloadToDrone = {
              // time: this.state.time,
              // payloadType: this.state.payloadType,
              // payloadId: this.state.payloadId,
             
              // manufacturer: this.state.manufacturer,
              // opticalZoom: this.state.opticalZoom,
              // digitalZoom: this.state.digitalZoom,
              // shooting: this.state.shooting,

              config: [{
                panning: this.state.pan,
                tilting: this.state.tilt,
                zoom: this.state.zoom,
                autoTracking: this.state.tracking,
                shootInterval: this.state.shooting
              }],
              droneId: this.state.droneId,

              reason: this.state.reason,

            }
        
            axios.post('https://dsd06.herokuapp.com/api/payloadregister/working/:id', {payloadToDrone})
                .then(res => {
                console.log(res.data);
              })
          }
        
  
    render() {
      return (
      <StyleEdit>
      <div className="searchtype">
        {/* <a onClick={() => history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> <a onClick={() => history.push('/add-signup-payload-drone')}>Đăng ký mới</a> */}
        <a onClick={() => this.props.history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> 
        <a onClick={() => this.props.history.push('/add-signup-payload-drone')}>Đăng ký mới</a>

      </div>

      <Form
        {...layout}
        name="basic" onSubmit={this.handleSubmit}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <h3 className="searchtype"  >Thông tin đăng ký</h3>
        {/* <Form.Item
          label="Thời gian"
          name="time"
          rules={[{ required: true  }]}
        >
          <DatePicker/>
          </Form.Item> */}
        {/* <Form.Item
            label="Loại thiết bị"
            name="payloadType"
            rules={[{required: true }]}
        >
            <Select>
                <option value="camera">Camera</option>
                <option value="micro">Micro</option>
                <option value="sensor">Sensor</option>
            </Select>
        </Form.Item> */}
        {/* <Form.Item
          label="Payload"
          name="payloadId"
          rules={[{required: true }]}
        >
          <Select>
                <option value="payload1">Payload 1</option>
                <option value="payload2">Payload 2</option>
                <option value="payload3">Payload 3</option>

            </Select>
        </Form.Item> */}
        <Form.Item label="Panning(Từ trái qua phải)" name ="pan" rules={[{  message: 'Please input panning!' }]}>
          <Input placeholder="0 độ - 360 độ" onChange={this.handleChange}></Input>
        </Form.Item>
        <Form.Item label="Tilting(Từ trên xuống dưới)" name ="tilt" rules={[{  message: 'Please input tilting!' }]}>
          <Input placeholder="0 độ - 360 độ" onChange={this.handleChange}></Input>
        </Form.Item>
        <Form.Item label="Zooming" name ="zoom" rules={[{  message: 'Please input zooming!' }]}>
          <Input placeholder="2.0 Megapixel trở lên" onChange={this.handleChange}></Input>
        </Form.Item>
        <Form.Item label="Auto Tracking" name ="tracking" rules={[{ }]}>
          <Select onChange={this.handleChange} value={this.state.autoTracking}>
            <Select.Option value="true">Bật tự động theo dõi</Select.Option>
            <Select.Option value="false">Tắt tự động theo dõi</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Shoot interval" name ="shoot" rules={[{  }]}>
          <Select onChange={this.handleChange}>
            <option value="10s">10s</option>
            <option value="20s">20s</option>
          </Select>
        </Form.Item>
        <Form.Item label="Drone" name ="droneId" rules={[{ required: true }]}>
          <Select onChange={this.handleChange}>
          <option value="1">Drone 1</option>
          <option value="2">Drone 2</option>
          <option value="3">Drone 3</option>
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Mô tả"
          name="status"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <TextArea/>
        </Form.Item> */}
        <Form.Item label="Lý do" name="reason">
          <Input placeholder="Lý do" onChange={this.handleChange}></Input>

        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
           Đăng ký
        </Button>
        </Form.Item>
      </Form>
    </StyleEdit>
      )
    }
  
  
}
export default AddSignupPayloadDrone; 