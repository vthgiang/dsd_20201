import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Row, Col, Card, Select, Button, DatePicker, Table, Tag, Space, Option, Modal } from 'antd';
import Axios from 'axios';
import ReportStatusDrone from './ReportStatusDrone';

const ReportPayload = () => {
    const { Option } = Select;
    const [currentTemplateId, setCurrentTemplateId] = useState('0')
    const [templatesList, setTemplatesList] = useState([])
    const [isModalShown, setIsModalShown] = useState(false)

    useEffect(() => {
        Axios.get('https://dsd07.herokuapp.com/api/reports/templates', {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        })
            .then(response => {
                if (response.data.success)
                    setTemplatesList(response.data.data)
            }).catch(err => {
                handleShowModal()
            })
    }, [templatesList])

    const renderTemplateDropdownList = () => templatesList.map((templateItem, templateIndex) => {
        return <Option key={templateIndex} value={templateIndex.toString()}>{templateItem.type}</Option>
    })

    const handleShowModal = () => {
        setIsModalShown(true)
    }

    const handleHideModal = () => {
        setIsModalShown(false)
    }

    const handleChangeOption = (id) => {
        setCurrentTemplateId(id)
    }

    const renderTemplateView = useCallback(
        () => {
            if (currentTemplateId === '1') return <ReportStatusDrone />
            return null
        },
        [currentTemplateId],
    )

    return (
        <>
            <Modal
                title={'Lỗi'}
                visible={isModalShown}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                footer={null}
                onCancel={handleHideModal}
                destroyOnClose={true}
            >
                <div>Lỗi không lấy được dữ liệu template</div>
            </Modal>
            <Card className="u-shadow u-rounded">
                <div style={{ marginBottom: 16 }}>
                    <span style={{ fontWeight: 'bold', marginRight: 8 }}>Template báo cáo</span>
                    <Select defaultValue={currentTemplateId.toString()} style={{ marginRight: 16, width: '40%' }} onChange={handleChangeOption}>
                        {renderTemplateDropdownList()}
                    </Select>
                </div>
                {renderTemplateView()}
            </Card>
        </>
    )
}

export default ReportPayload
