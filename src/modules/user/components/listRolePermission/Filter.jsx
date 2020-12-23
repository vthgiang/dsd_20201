import React, { Fragment } from "react";
import { Col, Input, Row, Button, Select } from "antd";

const { Option } = Select;
const { Search } = Input;

const Filter = ({ filter, setFilter, listPermissions, listRoles }) => {

    const handlResetFilter = () => {
        setFilter({
            page_id: 0,
            page_size: 20,
            search: "",
            role_id: 'Chưa xác định',
            permission_id: 'Chưa xác định',
        });
    };

    const renderSelectRole = () => (
        <Select
            showSearch
            optionFilterProp='children'
            className='select-box'
            value={filter ? filter.role_id : "Chưa xác định"}
            onChange={(value) => setFilter({ ...filter, role_id: value })}
            defaultValue='Chưa xác định'
            style={{ width: "100%" }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {listRoles && listRoles.map((role, index) => {
                return (
                    <Option key={index} value={role.id}>
                        {role.code}
                    </Option>
                );
            })}
        </Select>
    );

    const renderSelectPermission = () => (
        <Select
            showSearch
            optionFilterProp='children'
            className='select-box'
            value={filter ? filter.permission_id : "Chưa xác định"}
            onChange={(value) => setFilter({ ...filter, permission_id: value })}
            defaultValue='Chưa xác định'
            style={{ width: "100%" }}>
            <Option key={-1} value='Chưa xác định'>
                Chưa xác định
            </Option>
            {listPermissions && listPermissions.map((permission, index) => {
                return (
                    <Option key={index} value={permission.id}>
                        {permission.resource}
                    </Option>
                );
            })}
        </Select>
    );

    return (
        <Fragment>
            <Row gutter={[16, 16]}>
                <Col span={12}>Danh sách quyền theo chức năng</Col>
                <Col flex="right" span={2} offset={10}>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor="" style={{ width: "20%" }}>
                        Chức vụ
                    </label>
                    {renderSelectRole()}
                </Col>
                <Col span={7} style={{ display: "flex" }}>
                    <label htmlFor="" style={{ width: "20%" }}>
                        Quyền
                    </label>
                    {renderSelectPermission()}
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
