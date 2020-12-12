import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListDepartment from "./index.style";
import {
    Col,
    Input,
    Row,
    Button,
} from "antd";
import { useSelector } from "react-redux";
import { FolderAddOutlined } from "@ant-design/icons";

const { Search } = Input;

const Filter = ({ filter, setFilter, setVisible }) => {
    const user = useSelector((state) => state.user.user);

    const handlResetFilter = () => {
        setFilter({
            page_id: 0,
            page_size: 20,
            role: "Chưa xác định",
            status: "Chưa xác định",
            search: ""
        });
    };


    return (
        <Fragment>
            <Row gutter={[16, 16]}>
                <Col span={12}>Danh sách phòng ban</Col>
                <Col flex="right" span={2} offset={10}>
                    <Button
                        block
                        type="primary"
                        onClick={() => setVisible(true)}
                        style={{ width: 200, float: "right" }}
                    >
                        <FolderAddOutlined />
                        Thêm phòng ban
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
