import { Row, Col, Table, Button } from 'antd'
import React, { useRef } from 'react'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

const ModalStatusDrone = (props) => {
    const { data, columns, resultKey, department } = props;
    const { title, openning, tables } = resultKey;

    const dayString = moment().format('DD')
    const monthString = moment().format('MM')
    const yearString = moment().format('YYYY')
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleConfirm = () => {
        props.onCloseModal()
        handlePrint()
    }

    return (
        <>
            <div ref={componentRef} style={{ display: ' flex', flexDirection: 'column', paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Row style={{ flexDirection: 'row', display: ' flex', justifyContent: 'space-between' }}>
                    <Col span={9}>
                        <h3 style={{ ...textContentStyle }}>CÔNG TY QUẢN LÝ SỰ CỐ LƯỚI ĐIỆN</h3>
                        <div style={{ ...textContentStyle }}>------------------</div>
                        <div style={{ ...textContentStyle, marginTop: '10px' }}>Số .../...</div>

                    </Col>
                    <Col span={11}>
                        <h3 style={{ ...textContentStyle }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <h3 style={{ ...textContentStyle }}>Độc lập - Tự do - Hạnh phúc</h3>
                        <div style={{ fontStyle: 'italic', ...textContentStyle }}>Hà Nội, ngày {dayString} tháng {monthString} năm {yearString}</div>
                    </Col>
                </Row>
                <h3 style={{ fontSize: '30px', marginTop: '20px', fontWeight: 'bolder', ...textContentStyle }}>{title}</h3>
                <h3 style={{ marginTop: '5px', fontFamily: 'serif' }}>Kính gửi: Ban giám đốc công ty quản lý sự cố lưới điện</h3>
                <div style={{ marginTop: '5px', fontFamily: 'serif' }}>{openning.replace('$department', department)}</div>
                <h2 style={{ fontSize: '20px', marginTop: '20px', fontWeight: 'bolder', ...textContentStyle }}>{tables[0].name}</h2>
                <Table columns={columns} dataSource={data} bordered pagination={false} style={{ marginTop: '10px' }} />
                <Row style={{ flexDirection: 'row', display: ' flex', justifyContent: 'space-between' }}>
                    <Col span={10} />
                    <Col span={10} style={{ paddingLeft: '10px', }}>
                        <h3 style={{ marginTop: '20px', fontWeight: 'bold', ...textContentStyle }}>Người làm báo cáo</h3>
                    </Col>
                </Row>
            </div >
            <div style={{ display: ' flex', flexDirection: 'column', paddingTop: '20px', paddingLeft: '10px', paddingRight: '10px' }}>
                <Button type="primary" onClick={handleConfirm} style={{ alignSelf: 'flex-end', marginTop: '20px' }}>In báo cáo</Button>
            </div>
        </>
    )
}

const textContentStyle = {
    textAlign: 'center',
    fontFamily: 'serif',
}

export default ModalStatusDrone

