import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Select, Button, Input } from "antd";
import { statuses, types, names } from "../../config/UserMetaConfig";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../store/services";
const { Option } = Select;
const { Search } = Input;

const Filter = ({ filter, setFilter, setVisible }) => {
    const user = useSelector((state) => state.user.user);
    const [listUsers, setListUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await getAllUsers();
        setListUsers(res.result);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderSelectStatus = () => (
        <Select
            className="select-box"
            value={filter.status}
            onChange={(value) =>
                setFilter({ ...filter, status: value, page_id: 0 })
            }
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {statuses.map((status, index) => {
                return (
                    <Option key={index} value={status.code}>
                        {status.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectName = () => (
        <Select
            className="select-box"
            value={filter.name}
            onChange={(value) =>
                setFilter({ ...filter, name: value, page_id: 0 })
            }
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {names.map((name, index) => {
                return (
                    <Option key={index} value={name.code}>
                        {name.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectType = () => (
        <Select
            className="select-box"
            value={filter.type}
            onChange={(value) =>
                setFilter({ ...filter, type: value, page_id: 0 })
            }
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {types.map((type, index) => {
                return (
                    <Option key={index} value={type.code}>
                        {type.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectUser = () => (
        <Select
            className="select-box"
            value={filter.user_id ? filter.user_id : "Chưa xác định"}
            showSearch
            optionFilterProp="children"
            onChange={(value) =>
                setFilter({ ...filter, user_id: value, page_id: 0 })
            }
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {listUsers &&
                listUsers.map((user, index) => {
                    return (
                        <Option key={index} value={user.id}>
                            {user.full_name}
                        </Option>
                    );
                })}
        </Select>
    );

    const renderSelectTarget = () => (
        <Select
            showSearch
            optionFilterProp="children"
            className="select-box"
            value={filter.target_id ? filter.target_id : "Chưa xác định"}
            onChange={(value) =>
                setFilter({ ...filter, target_id: value, page_id: 0 })
            }
            defaultValue="Chưa xác định"
            style={{ width: "75%", marginLeft: 10 }}
        >
            {listUsers &&
                listUsers.map((user, index) => {
                    return (
                        <Option key={index} value={user.id}>
                            {user.full_name}
                        </Option>
                    );
                })}
        </Select>
    );

    const handlResetFilter = () => {
        setFilter({
            page_id: 0,
            page_size: 20,
            name: "Chưa xác định",
            status: "Chưa xác định",
            type: "Chưa xác định",
            search: "",
            user_id: null,
            target_id: null,
        });
    };

    return (
        <Fragment>
            <Row gutter={[16, 16]}>
                <Col span={12}>Lịch sử người dùng</Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={7}>
                    <Search
                        placeholder="Tìm kiếm"
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                search: e.target.value,
                                page_id: 0,
                            })
                        }
                        value={filter.search}
                    />
                </Col>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor="" style={{ width: "20%" }}>
                        Trạng thái
                    </label>
                    {renderSelectStatus()}
                </Col>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor="" style={{ width: "20%" }}>
                        Tên
                    </label>
                    {renderSelectName()}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor="" style={{ width: "20%" }}>
                        Người tạo
                    </label>
                    {renderSelectUser()}
                </Col>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor="" style={{ width: "20%" }}>
                        Người thực hiện
                    </label>
                    {renderSelectTarget()}
                </Col>
                {user.role == "SUPER_ADMIN" && (
                    <Col span={7} style={{ display: "flex" }}>
                        <label htmlFor="" style={{ width: "20%" }}>
                            Dự án
                        </label>
                        {renderSelectType()}
                    </Col>
                )}
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
