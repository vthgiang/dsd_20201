

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

    this.state = {
      options: [],
      droneOptions: [],
      visable: false,
      visableAdd: false,
      time: '',
      payloadType: '',
      payloadId: '',
      panning: '',
      titling: '',
      zoom: '',
      manufacturer: '',
      opticalZoom: '',
      digitalZoom: '',
      shooting: [
        {value: '10', label: '10s'},
        {value: '20', label: '20s'},
        {value: '30', label: '30s'},

      ],
      tracking: [
        { value: 'true', label: 'Bật tự động theo dõi' },
        { value: 'false', label: 'tắt tự động theo dõi' },
      ],
      // drone: [
      //   {value: '1', label: 'Drone 1'},
      //   {value: '2', label: 'Drone 2'},
      //   {value: '3', label: 'Drone 3'},

      // ]
    }
  }

      componentDidMount() {
        this.getAllPayload();
        this.getAllDrone();
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
        
      handleFormSubmit(values) {
            console.log(values);        
            const payloadToDrone = {
              // time: this.state.time,
              // payloadType: this.state.payloadType,
              // payloadId: this.state.payloadId,
             
              // manufacturer: this.state.manufacturer,
              // opticalZoom: this.state.opticalZoom,
              // digitalZoom: this.state.digitalZoom,
              // shooting: this.state.shooting,

              config: [{
                panning: values.pan,
                tilting: values.tilt,
                zoom: values.zoom,
                autoTracking: values.tracking,
                shootInterval: values.shooting
              }],
              droneId: values.droneId,
              payloadId: values.payloadId,
              reason: values.reason,

            }
        
            axios.post('https://dsd06.herokuapp.com/api/payloadregister/working/' + payloadToDrone.payloadId, payloadToDrone)
                .then(res => {
                console.log(res.data);
              })
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
              this.setState({Options: options});
            })
          }

          getAllDrone() {
            axios.get('http://skyrone.cf:6789/drone/getAll')
            .then(res => {
              const options = res.data.map(drone => 
                ({
                  label: drone.code,
                  value: drone.id
                })  
              )
              this.setState({DroneOptions: options});
            })
          }


    render() {
      const { visible, visibleAdd, visibleDelete, currentTable, tables } = this.state;


      return (
      <StyleEdit>
      <div className="searchtype">
        {/* <a onClick={() => history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> <a onClick={() => history.push('/add-signup-payload-drone')}>Đăng ký mới</a> */}
        <a onClick={() => this.props.history.push('/payload-drone')}>Danh sách đăng ký payload drone</a> <span>/</span> 
        <a onClick={() => this.props.history.push('/add-signup-payload-drone')}>Đăng ký mới</a>

      </div>

      <Form
        {...layout} onFinish= {(values) =>  this.handleFormSubmit(values)}
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
        <Form.Item
            label="Thiết bị"
            name="payloadId"
            rules={[{required: true }]}
        >
            <Select options = {this.state.Options}>
            </Select>
        </Form.Item>
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
          <Input placeholder="0 độ - 360 độ"></Input>
        </Form.Item>
        <Form.Item label="Tilting(Từ trên xuống dưới)" name ="tilt" rules={[{  message: 'Please input tilting!' }]}>
          <Input placeholder="0 độ - 360 độ"></Input>
        </Form.Item>
        <Form.Item label="Zooming" name ="zoom" rules={[{  message: 'Please input zooming!' }]}>
          <Input placeholder="2.0 Megapixel trở lên"></Input>
        </Form.Item>
        <Form.Item label="Auto Tracking" name ="tracking" rules={[{ }]}>
          <Select options={this.state.tracking}>
          
          </Select>
        </Form.Item>
        <Form.Item label="Shoot interval" name ="shoot" rules={[{  }]}>
          <Select options={this.state.shooting}>
            
          </Select>
        </Form.Item>
        <Form.Item label="Drone" name ="droneId" rules={[{ required: true }]}>
          <Select options={this.state.DroneOptions}>
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
          <Input placeholder="Lý do"></Input>

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