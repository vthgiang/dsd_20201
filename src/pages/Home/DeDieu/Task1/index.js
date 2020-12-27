import React from "react";
import { Tabs, Row, Col, Card } from "antd";

import ImageVideo from "../../../ImageVideo";
import Stream from "../../../ImageVideo/stream"
import Incident from "../../../Incident"

function callback(key) {
    console.log(key);
}

function Task5() {
    const { TabPane } = Tabs;
    return (
        <Row wrap={false} gutter={[16, 16]}>
            <Col span={24}>
                <Card className="u-shadow u-rounded" >
                    <Tabs defaultActiveKey="Task1" onChange={callback}>
                        <TabPane tab="Quản lý hình ảnh video offline" key="task1_1">
                            <ImageVideo />
                        </TabPane>
                        <TabPane tab="Theo dõi hình ảnh đang stream" key="task1_2">
                            <Stream />
                        </TabPane>
                        <TabPane tab="Xử lý sự cố" key="task1_3">
                            <Incident />
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>

    );
}
export default Task5;
