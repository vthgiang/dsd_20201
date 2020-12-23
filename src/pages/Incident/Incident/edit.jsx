import React, { useState, useEffect } from "react";
import {Tag, Select, Button, message, Descriptions, Spin} from "antd";
import moment from'moment'
import _ from 'lodash'
import {useParams} from 'react-router-dom'
import to from "await-to-js";
import incidentService from "../../../services/group09/incidentService";
import incidentLevelService from "../../../services/group09/incidentLevelService";
import incidentStatusService from "../../../services/group09/incidentStatusService";
import Gallery from "react-grid-gallery";

const IncidentEdit = (props) => {
  let { id } = useParams();
  const [incident, setIncident] = useState({})
  const [levels, setLevels] = useState([])
  const [status, setStatus] = useState([])
  const [loading, setLoading] = useState(true)
  const [latLng, setLatLng] = useState({})
  console.log('latLng', latLng)
  const users = [
    {value: '1', label: 'Dung Nguyen'},
    {value: '2', label: 'Viet Anh'},
    {value: '3', label: 'Luan Phung'},
    {value: '4', label: 'Huy Tran'}
  ]

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    let [error, [incident, _levels = [], _status = []]] = await to(Promise.all([
      incidentService().detail(id),
      incidentLevelService().index(),
      incidentStatusService().index()
    ]))
    // let [error, incident] = await to(incidentServ,ice().detail(id))
    // let [error1, _levels = []] = await to()
    // let [error2, _status = []] = await to()
    if(error) message.error('Có lỗi xảy ra!')
    let _images = (incident.images || []).map((item) => {return {...item, isSelected: false}})
    let latLongs = (incident.images || []).map((item) => {return {lat: item.latitude, lng: item.longitude}})

    setIncident({...incident, images: _images} || {})
    setLevels(_levels)
    setStatus(_status)
    setLatLng(getCenterFromDegrees(latLongs))
    setLoading(false)
    console.log('incident', incident)
  }

  const colorStatus = (code) => {
    switch (code) {
      case 0:
        return "default"
      case 1:
        return "processing"
      case 2:
        return "warning"
      case 3:
        return "success"
      default: return ''
    }
  }
  const colorLevel = (code) => {
    switch (code) {
      case 0:
        return "#2db7f5"
      case 1:
        return "#f50"
      default: return ''
    }
  }
  const getCenterFromDegrees = (data) => {
    // let data = [{lat:22.281610498720003,lng:70.77577162868579},{lat:22.28065743343672,lng:70.77624369747241},{lat:22.280860953131217,lng:70.77672113067706},{lat:22.281863655593973,lng:70.7762061465462}];
    let num_coords = data.length;
    let X = 0.0;
    let Y = 0.0;
    let Z = 0.0;

    for(let i=0; i<num_coords; i++){
      let lat = data[i].lat * Math.PI / 180;
      let lon = data[i].lng * Math.PI / 180;
      let a = Math.cos(lat) * Math.cos(lon);
      let b = Math.cos(lat) * Math.sin(lon);
      let c = Math.sin(lat);

      X += a;
      Y += b;
      Z += c;
    }

    X /= num_coords;
    Y /= num_coords;
    Z /= num_coords;

    let lon = Math.atan2(Y, X);
    let hyp = Math.sqrt(X * X + Y * Y);
    let lat = Math.atan2(Z, hyp);

    let finalLat = lat * 180 / Math.PI;
    let finalLng =  lon * 180 / Math.PI;

    let finalArray = Array();
    finalArray.push(finalLat);
    finalArray.push(finalLng);
    return {lat: finalLat, lng: finalLng};
  }
  return (
      <div>
        <Spin spinning={loading}>
        <Descriptions
            bordered
            layout="vertical"
            title="Chi tiết sự cố"
            extra={<Button type="primary">Xử lý sự cố</Button>}
        >
            <Descriptions.Item label="Tên sự cố">{incident.name}</Descriptions.Item>
          <Descriptions.Item label="Hạn dự kiến">{moment(incident.dueDate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{moment(incident.createdAt).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="Loại sự cố">{_.get(incident, 'type.name', '')}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={`${colorLevel(_.get(incident, 'status.code', null))}`}>
              {_.get(incident, 'status.name', '')}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mức độ">
            <Tag color={colorLevel(_.get(incident, 'level.code', null))}>
              {_.get(incident, 'level.name', '')}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả" span={3}>
            {incident.description}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh" span={2}>
            <Gallery
                images={incident.images || []}
                showLightboxThumbnails={true}
                enableImageSelection={false}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí" span={1}>
            {incident.location}
            <iframe
                src={`https://maps.google.com/maps?q=${latLng.lat}, ${latLng.lng}&z=15&output=embed`}
                width="100%" height="450" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                tabIndex="0"></iframe>
          </Descriptions.Item>

        </Descriptions>
        </Spin>

      </div>
  )
};

export default IncidentEdit;
