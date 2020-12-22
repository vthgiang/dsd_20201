<<<<<<< HEAD
import { Form, Input, Modal, Row, notification } from "antd";
import {
    updateDepartment,
    createDepartment,
    getDepartment,
} from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";

const ModalUser = ({
    departmentId,
    setVisible,
    visible,
    fetchListDepartment,
}) => {
    const [department, setDepartment] = useState({});
    const [message, setMessage] = useState({});
=======
import { Form, Input, Modal, Row, notification, Select, DatePicker } from "antd";
import { updateDepartment, createDepartment, getDepartment } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import { types } from "../../config/UserConfig";
import { useSelector } from "react-redux";
import moment from "moment";
const { Option } = Select;

const ModalUser = ({ departmentId, setVisible, visible, fetchListDepartment, mode, setMode }) => {
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
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e

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
        const dataDepartment = buildUserData();
        var description = "";
        if (departmentId && departmentId != "") {
            dataDepartment.id = departmentId;
            res = await updateDepartment(dataDepartment);
            description = "Cập nhật thành công!";
<<<<<<< HEAD
            
=======
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        } else {
            res = await createDepartment(dataDepartment);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            fetchListDepartment();
            notification.success({
                message: "Thành công",
<<<<<<< HEAD
                description: description
            })
=======
                description: description,
            });
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            handleCloseModal();
        } else {
            notification.error({
                message: "Lỗi",
                description: res.message,
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
<<<<<<< HEAD
                title: "Lỗi"
            });
            return retval;
        }
        if (
            typeof department.description === "undefined" ||
            department.description === ""
        ) {
=======
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof department.description === "undefined" || department.description === "") {
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            retval = false;
            setMessage({
                value: "Vui lòng nhập mô tả!",
                type: "error",
<<<<<<< HEAD
                title: "Lỗi"
=======
                title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            });
            return retval;
        }
        return retval;
    });

    const buildUserData = () => {
        var data = {};
        var columns = ["name", "description"];
        columns.forEach((element) => {
            if (department[element] && department[element] != "") {
                data[element] = department[element];
            }
        });
        data.type = localStorage.getItem("project-type");
        return data;
    };

    const handleCloseModal = () => {
        setDepartment({});
<<<<<<< HEAD
        setVisible(false);
    };

    useEffect(() => {
        if (message && message != "") {
            if (message.type == 'error') {
                notification.error({
                    message: message.title,
                    description: message.value
                })
            }
            if (message.type == 'warning') {
                notification.warning({
                    message: message.title,
                    description: message.value
                })
            }
            if (message.type == 'success') {
                notification.success({
                    message: message.title,
                    description: message.value
                })
=======
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
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            }
        }
    }, [message]);

    return (
<<<<<<< HEAD
        <Modal
            visible={visible}
            title={
                departmentId && departmentId !== ""
                    ? "Cập nhật phòng ban"
                    : "Thêm phòng ban"
            }
            onOk={handleSave}
            onCancel={handleCloseModal}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="name"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            placeholder="Tên"
=======
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
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                            value={department?.name}
                            onChange={(e) =>
                                setDepartment({
                                    ...department,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
<<<<<<< HEAD
                    <Form.Item name="username" style={{ width: "45%" }}>
                        <label htmlFor="">
                            Mô tả <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            type="text"
                            placeholder="Mô tả"
=======
                    <Form.Item name='username' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Mô tả <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Mô tả'
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
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
<<<<<<< HEAD
=======
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
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            </Form>
        </Modal>
    );
};

export default ModalUser;
