import { Row, Col, Table, Button, Input, Modal, Card, Breadcrumb, Spin } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import ModalStatusDrone from './component/ModalStatusDrone'
import Axios from 'axios'

// Get from API
const fakeData = [
  {
    no: '1',
    id: 'IT4885-0001',
    brand: 'JOHN CENA',
    isUsed: 'đúng',
    timeFlight: '5 hrs',
    currentLocation: 'Ba Vi, Son Tay, Vietnam',
    currentLatLong: '21.99 13.27923',
  },
  {
    no: '2',
    id: 'IT4885-0002',
    brand: 'JOHN CENA',
    isUsed: 'đúng',
    timeFlight: '3 hrs',
    currentLocation: 'Ba Vi, Son Tay, Vietnam',
    currentLatLong: '21.99 13.27923',
  },
  {
    no: '3',
    id: 'IT4885-0003',
    brand: 'JOHN CENA',
    isUsed: 'sai',
    timeFlight: '7 hrs',
    currentLocation: 'Ba Vi, Son Tay, Vietnam',
    currentLatLong: '21.99 13.27923',
  }
]

const ReportTemplate = (props) => {
  const { objectId } = props;
  const dayString = moment().format('DD')
  const monthString = moment().format('MM')
  const yearString = moment().format('YYYY')
  const [isModalShown, setIsModalShown] = useState(false)
  const [currentData, setCurrentData] = useState(fakeData)
  const [resultKey, setResultKey] = useState(null)

  useEffect(() => {
    Axios.get(`https://dsd07.herokuapp.com/api/reports/templates/${objectId}`)
      .then(response => {
        if (response.data.success)
          setResultKey(response.data.data)
      }).catch(err => {
        console.log(err)
      })
  }, [resultKey])

  // Get from API
  const department = "Ô HỒ WATASHI SOKA"

  if (resultKey !== null && currentData !== null) {
    const { title, openning, tables } = resultKey

    const columnsTable = tables[0].columns.map((columnItem, columnIndex) => {
      return {
        title: columnItem.name,
        dataIndex: columnItem.key,
        key: columnItem.key,
        render: (value, record) => {
          return <Input
            onChange={(event) => {
              console.log(currentData[currentData.indexOf(record)][columnItem.key], event.target.value)
              currentData[currentData.indexOf(record)][columnItem.key] = event.target.value;
            }}
            defaultValue={value}
            style={{ fontSize: '12px' }} />
        },
      }
    })

    columnsTable.push({
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      render: (value, record) => {
        return <Button danger icon={<MinusOutlined />} shape='circle' onClick={() => handleDeleteRow(Number(record.no))} />
      },
    })

    const columnsTableToPrint = tables[0].columns.map((columnItem, columnIndex) => {
      return {
        title: columnItem.name,
        dataIndex: columnItem.key,
        key: columnItem.key,
      }
    })

    const handleDeleteRow = (rowNo) => {
      if (currentData.length === 1) {
        setCurrentData([])
        return;
      }
      const tempData = currentData.filter(item => Number(item.no) !== rowNo)
      setCurrentData(tempData)
    }

    const handleAddRow = () => {
      const newData = {}
      columnsTable.map((columnItem) => {
        if (columnItem.key === 'no') {
          newData[columnItem.key] = currentData.length + 1
          return;
        }
        newData[columnItem.key] = ''
      })
      setCurrentData([...currentData, newData])
    }

    const handleShowModal = () => {
      setIsModalShown(true)
    }

    const handleHideModal = () => {
      setIsModalShown(false)
    }

    return (
      <>
        <Breadcrumb
          style={{ marginBottom: 16, marginTop: 8, fontSize: 18, fontWeight: 500 }}
        >
          <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
          <Breadcrumb.Item>Trạng thái UAV</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="u-shadow u-rounded">
          <Modal
            title={title}
            visible={isModalShown}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            footer={null}
            onCancel={handleHideModal}
            destroyOnClose={true}
            width={'80%'}
          >
            <ModalStatusDrone resultKey={resultKey} department={department} onCloseModal={handleHideModal} data={currentData} columns={columnsTableToPrint} />
          </Modal>
          <div style={{ display: ' flex', flexDirection: 'column', paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
            <Button type="primary" onClick={handleShowModal} style={{ alignSelf: 'flex-end', marginTop: '20px' }}>Xem trước báo cáo</Button>
          </div>
          <div style={{ display: ' flex', flexDirection: 'column', paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
            <Row style={{ flexDirection: 'row', display: ' flex', justifyContent: 'space-between' }}>
              <Col span={10}>
                <h1 style={{ ...textContentStyle }}>CÔNG TY QUẢN LÝ SỰ CỐ LƯỚI ĐIỆN</h1>
                <div style={{ ...textContentStyle }}>------------------</div>
                <div style={{ ...textContentStyle, marginTop: '10px' }}>Số .../...</div>

              </Col>
              <Col span={10}>
                <h1 style={{ ...textContentStyle }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                <h1 style={{ ...textContentStyle }}>Độc lập - Tự do - Hạnh phúc</h1>
                <div style={{ fontStyle: 'italic', ...textContentStyle }}>Hà Nội, ngày {dayString} tháng {monthString} năm {yearString}</div>
              </Col>
            </Row>
            <h1 style={{ fontSize: '30px', marginTop: '20px', fontWeight: 'bolder', ...textContentStyle }}>{title}</h1>
            <h3 style={{ marginTop: '5px', fontFamily: 'serif' }}>Kính gửi: Ban giám đốc công ty quản lý sự cố lưới điện</h3>
            <h3 style={{ marginTop: '5px', fontFamily: 'serif' }}>{openning.replace('$department', department)}</h3>
            <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 'bolder', ...textContentStyle }}>{tables[0].name}</h2>
            <Table columns={columnsTable} dataSource={currentData} bordered pagination={false} />
            <Button type="primary" icon={<PlusOutlined />} style={{ alignSelf: 'flex-end', marginTop: '20px' }} onClick={handleAddRow}>Thêm 1 dòng</Button>
            <Row style={{ flexDirection: 'row', display: ' flex', justifyContent: 'space-between' }}>
              <Col span={10} />
              <Col span={10} style={{ paddingLeft: '10px', }}>
                <h1 style={{ marginTop: '20px', fontWeight: 'bold', ...textContentStyle }}>Người làm báo cáo</h1>
              </Col>
            </Row>
          </div >
        </Card>
      </>
    )
  }
  return <>
    <div>
      Đang lấy dữ liệu template trạng thái UAV...
    </div>
    <Spin size="large" />
  </>
}

const textContentStyle = {
  textAlign: 'center',
  fontFamily: 'serif',
}

export default ReportTemplate;

