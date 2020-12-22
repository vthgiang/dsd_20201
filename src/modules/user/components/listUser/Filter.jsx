import React, { Fragment } from "react";
import { Col, Row, Select, Button, Input } from "antd";
import { statuses, types, statusesActivation } from "../../config/UserConfig";
import { UserAddOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Option } = Select;
const { Search } = Input;

const Filter = ({ filter, setFilter, setVisible, setMode, listDepartments, listRoles }) => {
    const user = useSelector((state) => state.user.user);

    const renderSelectStatus = () => (
        <Select
            className='select-box'
            value={filter.status}
            onChange={(value) => setFilter({ ...filter, status: value, page_id: 0 })}
            defaultValue='Chưa xác định'
            style={{ width: "75%", marginLeft: 10 }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {statuses.map((status, index) => {
                return (
                    <Option key={index} value={status.code}>
                        {status.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectRole = () => (
        <Select
            className='select-box'
            value={filter.role}
            onChange={(value) => setFilter({ ...filter, role: value, page_id: 0 })}
            defaultValue='Chưa xác định'
            style={{ width: "75%", marginLeft: 10 }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {listRoles && listRoles.map((role, index) => {
                return (
                    <Option key={index} value={role.code}>
                        {role.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectStatusActivation = () => (
        <Select
            className='select-box'
            value={filter.statusActivation}
            onChange={(value) => setFilter({ ...filter, statusActivation: value, page_id: 0 })}
            defaultValue='Chưa xác định'
            style={{ width: "75%", marginLeft: 10 }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {statusesActivation.map((status, index) => {
                return (
                    <Option key={index} value={status.code}>
                        {status.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectType = () => (
        <Select
            className='select-box'
            value={filter.type}
            onChange={(value) => setFilter({ ...filter, type: value, page_id: 0 })}
            defaultValue='Chưa xác định'
            style={{ width: "75%", marginLeft: 10 }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {types.map((type, index) => {
                return (
                    <Option key={index} value={type.code}>
                        {type.name}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectDepartment = () => (
        <Select
            showSearch
            optionFilterProp='children'
            className='select-box'
            value={filter.department_id ? filter.department_id : "Chưa xác định"}
            defaultValue='Chưa xác định'
            onChange={(value) => setFilter({ ...filter, department_id: value, page_id: 0 })}
            style={{ width: "75%", marginLeft: 10 }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {listDepartments &&
                listDepartments.map((type, index) => {
                    return (
                        <Option key={index} value={type.id}>
                            {type.name}
                        </Option>
                    );
                })}
        </Select>
    );

    const handlResetFilter = () => {
        setFilter({
            page_id: 0,
            page_size: 20,
            role: "Chưa xác định",
            status: "Chưa xác định",
            type: "Chưa xác định",
            search: "",
            department_id: null,
            statusActivation: "Chưa xác định",
        });
    };

    const handleCreate = () => {
        setVisible(true);
        setMode("create");
    };

    return (
        <Fragment>
            <Row gutter={[16, 16]}>
                <Col span={12}>Danh sách người dùng</Col>
                <Col flex='right' span={2} offset={10}>
                    <Button block type='primary' onClick={() => handleCreate()} style={{ width: 200, float: "right" }}>
                        <UserAddOutlined />
                        Thêm người dùng
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={7}>
                    <Search
                        placeholder='Tìm kiếm'
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                search: e.target.value,
                                page_id: 0,
                            })
                        }
                    />
                </Col>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor='' style={{ width: "20%" }}>
                        Trạng thái
                    </label>
                    {renderSelectStatus()}
                </Col>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor='' style={{ width: "20%" }}>
                        Chức vụ
                    </label>
                    {renderSelectRole()}
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor='' style={{ width: "20%" }}>
                        Phòng ban
                    </label>
                    {renderSelectDepartment()}
                </Col>
                {user.role == "SUPER_ADMIN" && (
                    <Col span={7} style={{ display: "flex" }}>
                        <label htmlFor='' style={{ width: "20%" }}>
                            Dự án
                        </label>
                        {renderSelectType()}
                    </Col>
                )}
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor='' style={{ width: "20%" }}>
                        Trạng thái làm việc
                    </label>
                    {renderSelectStatusActivation()}
                </Col>
            </Row>
            <Row>
                <Col span={2} style={{ display: "flex", margin: "0 auto" }}>
                    <Button type='primary' block style={{ marginBottom: 10 }} onClick={handlResetFilter}>
                        Reset
                    </Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Filter;
