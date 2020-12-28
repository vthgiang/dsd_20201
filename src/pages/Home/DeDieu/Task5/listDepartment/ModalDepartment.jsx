import { Form, Input, Modal, Row, notification, Select, DatePicker } from "antd";
import { updateDepartment, createDepartment, getDepartment } from "../../../../../modules/user/store/services";
import React, { useCallback, useEffect, useState } from "react";
import { types } from "../../../../../modules/user/config/UserConfig";
import { useSelector } from "react-redux";
import moment from "moment";
const { Option } = Select;

const ModalDepartment = ({ departmentId, setVisible, visible, fetchListDepartment, mode, setMode }) => {
    const [department, setDepartment] = useState({});
    const [message, setMessage] = useState({});
    const loginUser = useSelector((state) => state.user.user);
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!visible) {
            setDepartment({
                type: "Chưa xác định",
            });
        }
    }, [visible]);

    useEffect(() => {
        if (mode == "create") {
            setTitle("Thêm mới phòng ban");
        } else if (mode == "update") {
            setTitle("Cập nhật phòng ban");
        } else {
            setTitle("Thông tin phòng ban");
        }
    }, [mode]);

    const fetchDepartment = useCallback(async () => {
        try {
            const res = await getDepartment(departmentId);
            if (res.status === "successful") {
                setDepartment(res.result);
            }
        } catch (error) {}
    }, [departmentId]);

    useEffect(() => {
        if (departmentId) {
            fetchDepartment();
        } else {
            setDepartment({});
        }
    }, [fetchDepartment, setDepartment]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataDepartment = buildDepartmentData();
        var description = "";
        if (departmentId && departmentId != "") {
            dataDepartment.id = departmentId;
            res = await updateDepartment(dataDepartment);
            description = "Cập nhật thành công!";
        } else {
            res = await createDepartment(dataDepartment);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            fetchListDepartment();
            notification.success({
                message: "Thành công",
                description: description,
            });
            handleCloseModal();
        } else {
            var errorMessage = "";
            if (res.message && res.message != "") {
                errorMessage = res.message;
            } else {
                errorMessage = res.result;
            }
            notification.error({
                message: "",
                description: errorMessage,
            });
        }
    };

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof department.name === "undefined" || department.name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof department.description === "undefined" || department.description === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập mô tả!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        return retval;
    });

    const buildDepartmentData = () => {
        var data = {};
        var columns = ["name", "description", "type"];
        columns.forEach((element) => {
            if (department[element] && department[element] != "") {
                data[element] = department[element];
            }
        });
        return data;
    };

    const handleCloseModal = () => {
        setDepartment({});
        setMode("");
        setVisible(false);
    };

    const renderSelectType = () => (
        <Select
            disabled={mode == "detail"}
            className='select-box'
            value={department?.type}
            onChange={(value) => setDepartment({ ...department, type: value, page_id: 0 })}
            defaultValue='Chưa xác định'
            style={{ width: "100%", minWidth: 178 }}
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

    useEffect(() => {
        if (message && message != "") {
            if (message.type == "error") {
                notification.error({
                    message: message.title,
                    description: message.value,
                });
            }
            if (message.type == "warning") {
                notification.warning({
                    message: message.title,
                    description: message.value,
                });
            }
            if (message.type == "success") {
                notification.success({
                    message: message.title,
                    description: message.value,
                });
            }
        }
    }, [message]);

    return (
        <Modal visible={visible} title={title} onOk={handleSave} onCancel={handleCloseModal} okText='Lưu' cancelText='Hủy'>
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item name='name' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            placeholder='Tên'
                            value={department?.name}
                            onChange={(e) =>
                                setDepartment({
                                    ...department,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item name='username' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Mô tả <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Mô tả'
                            value={department?.description}
                            onChange={(e) =>
                                setDepartment({
                                    ...department,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    {mode == "detail" && (
                        <Form.Item name='role' style={{ width: "45%", marginRight: 10 }}>
                            <label htmlFor=''>Ngày tạo </label>
                            <DatePicker
                                disabled={mode == "detail"}
                                value={department.created_at ? moment(department?.created_at, "YYYY-MM-DD") : ""}
                                style={{ width: "100%" }}
                                format={"YYYY-MM-DD"}
                            />
                        </Form.Item>
                    )}
                    {loginUser && loginUser.role == "SUPER_ADMIN" && (
                        <Form.Item name='type'>
                            <label htmlFor=''>Dự án </label>
                            {renderSelectType()}
                        </Form.Item>
                    )}
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalDepartment;
