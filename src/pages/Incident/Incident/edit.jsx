import React, { useState, useEffect } from "react";
import {Tag, Select, Button, message, Descriptions} from "antd";
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
    let [error, incident] = await to(incidentService().detail(id))
    let [error1, _levels = []] = await to(incidentLevelService().index())
    let [error2, _status = []] = await to(incidentStatusService().index())
    if(error) message.error('Không thể trả về thông tin sự cố!')
    if(error1) message.error('Không thể trả về danh sách mức độ sự cố!')
    let _images = (incident.images || []).map((item) => {return {...item, isSelected: false}})
    setIncident({...incident, images: _images} || {})
    setLevels(_levels)
    setStatus(_status)
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

  return (
      <div>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5756715163598!2d106.1600463149287!3d20.96954899517287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313598a919dd3821%3A0x5ba5e686fd49047!2zVHLhuqFtIMSRaeG7h24gY2FvIHRo4bq_IE5n4buNYyBMacOqbg!5e0!3m2!1sen!2s!4v1605663218115!5m2!1sen!2s"
                width="100%" height="450" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                tabIndex="0"></iframe>
          </Descriptions.Item>

        </Descriptions>


      </div>
  )
};

export default IncidentEdit;
