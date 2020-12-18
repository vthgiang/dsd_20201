import React, { Fragment } from "react";
import { Col, Input, Row, Button, Select } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const Filter = ({ filter, setFilter, setVisible, setMode }) => {

    const handlResetFilter = () => {
        setFilter({
            page_id: 0,
            page_size: 20,
            search: "",
        });
    };

    const handleCreate = () => {
        setMode("create");
        setVisible(true);
    }

    return (
        <Fragment>
            <Row gutter={[16, 16]}>
                <Col span={12}>Danh sách quyền</Col>
                <Col flex="right" span={2} offset={10}>
                    <Button
                        block
                        type="primary"
                        onClick={() => handleCreate()}
                        style={{ width: 200, float: "right" }}
                    >
                        <FolderAddOutlined />
                        Thêm quyền
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Search
                        placeholder="Tìm kiếm"
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                search: e.target.value,
                                page_id: 0,
                            })
                        }
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={8}></Col>
            </Row>
            <Row>
                <Col span={2} style={{ display: "flex", margin: "0 auto" }}>
                    <Button
                        type="primary"
                        block
                        style={{ marginBottom: 10 }}
                        onClick={handlResetFilter}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Filter;
