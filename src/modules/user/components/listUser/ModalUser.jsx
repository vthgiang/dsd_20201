<<<<<<< HEAD
import {
    Form,
    Input,
    Modal,
    Row,
    Select,
    notification,
    DatePicker,
} from "antd";
import { updateUser, createUser, getUser } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { roles, statuses, userHost } from "../../config/UserConfig";
import moment from "moment";

const { Option } = Select;

const ModalUser = ({ userId, setVisible, visible, fetchListUser }) => {
    const [user, setUser] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
=======
import { Form, Input, Modal, Row, Select, notification, DatePicker } from "antd";
import { updateUser, createUser, getUser } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import { roles, statuses, types } from "../../config/UserConfig";
import moment from "moment";
import { useSelector } from "react-redux";
import { SettingOutlined } from "@ant-design/icons";

const { Option } = Select;

const ModalUser = ({ userId, setVisible, visible, fetchListUser, mode, setMode }) => {
    const [user, setUser] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const loginUser = useSelector((state) => state.user.user);
    const [title, setTitle] = useState("");
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e

    useEffect(() => {
        if (!visible) {
            setImageUrl("");
<<<<<<< HEAD
=======
            setUser({
                status: "Chưa xác định",
                role: "Chưa xác định",
                type: "Chưa xác định",
            });
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        }
    }, [visible]);

    const fetchUser = useCallback(async () => {
        try {
            const res = await getUser(userId);
            if (res.status === "successful") {
                setUser(res.result);
                if (res.result && res.result.avatar) {
                    setImageUrl(res.result.avatar);
                }
            }
        } catch (error) {}
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchUser();
        } else {
            setUser({});
        }
    }, [fetchUser, userId]);

<<<<<<< HEAD
=======
    useEffect(() => {
        if (mode == "create") {
            setTitle("Thêm mới người dùng");
        } else if (mode == "update") {
            setTitle("Cập nhật người dùng");
        } else {
            setTitle("Thông tin người dùng");   
        }
    }, [mode])

>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataUser = buildUserData();
        var description = "";

        if (userId && userId != "") {
            dataUser.id = userId;
            res = await updateUser(dataUser);
            description = "Cập nhật thành công!";
        } else {
            res = await createUser(dataUser);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            notification.success({
                message: "Thành công",
<<<<<<< HEAD
                description: description
            })
            handleCloseModal();
            fetchListUser();
        } else {
            notification.error({
                message: "",
                description: res.message,
=======
                description: description,
            });
            handleCloseModal();
            fetchListUser();
        } else {
            var errorMessage = "";
            if (res.message != "") {
                errorMessage = res.message;
            } else {
                errorMessage = res.result;
            }
            notification.error({
                message: "",
                description: errorMessage,
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            });
        }
    };

    useEffect(() => {
        setUser({ ...user, avatar: imageUrl });
    }, [imageUrl]);

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof user.full_name === "undefined" || user.full_name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập họ tên!",
                type: "error",
<<<<<<< HEAD
                title: "Lỗi"
=======
                title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            });
            return retval;
        }
        if (typeof user.username === "undefined" || user.username === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên đăng nhập!",
                type: "error",
<<<<<<< HEAD
                title: "Lỗi"
=======
                title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            });
            return retval;
        }
        if (typeof user.email === "undefined" || user.email === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập email!",
                type: "error",
<<<<<<< HEAD
                title: "Lỗi"
=======
                title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            });
            return retval;
        }
        if (!userId) {
            if (typeof user.password === "undefined" || user.password === "") {
                retval = false;
                setMessage({
                    value: "Vui lòng nhập mật khẩu!",
                    type: "error",
<<<<<<< HEAD
                    title: "Lỗi"
=======
                    title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                });
                return retval;
            }
            if (typeof user.repassword === "undefined") {
                retval = false;
                setMessage({
                    value: "Vui lòng xác nhận mật khẩu!",
                    type: "error",
<<<<<<< HEAD
                    title: "Lỗi"
=======
                    title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                });
                return retval;
            }
            if (user.repassword !== user.password) {
                retval = false;
                setMessage({
                    value: "Xác nhận mật khẩu không đúng!",
                    type: "error",
<<<<<<< HEAD
                    title: "Lỗi"
=======
                    title: "Lỗi",
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                });
                return retval;
            }
        }
        return retval;
    });

    const buildUserData = () => {
        var data = {};
<<<<<<< HEAD
        var columns = [
            "full_name",
            "username",
            "password",
            "email",
            "phone",
            "avatar",
            "address",
            "status",
            "role",
        ];
=======
        var columns = ["full_name", "username", "password", "email", "phone", "avatar", "address", "status", "role"];
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
        columns.forEach((element) => {
            if (user[element] && user[element] != "") {
                data[element] = user[element];
            }
        });
        data.type = localStorage.getItem("project-type");
        data.birthday = moment(user["birthday"]).format("YYYY-MM-DD 00:00:00");
        return data;
    };

    const handleCloseModal = () => {
        setUser({});
        setVisible(false);
<<<<<<< HEAD
=======
        setMode("detail");
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
    };

    useEffect(() => {
        if (message && message != "") {
<<<<<<< HEAD
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

    const renderSelectStatus = () => (
<<<<<<< HEAD
        <Select
            className="select-box"
            value={user?.status}
            onChange={(value) => setUser({ ...user, status: value })}
            defaultValue="Chưa xác định"
            style={{ width: "100%" }}
        >
=======
        <Select disabled={mode == "detail"} className='select-box' value={user?.status} onChange={(value) => setUser({ ...user, status: value })} defaultValue='Chưa xác định' style={{ width: "100%" }}>
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
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
<<<<<<< HEAD
        <Select
            className="select-box"
            value={user?.role}
            onChange={(value) => setUser({ ...user, role: value })}
            defaultValue="Chưa xác định"
            style={{ width: "100%" }}
        >
=======
        <Select disabled={mode == "detail"} className='select-box' value={user?.role} onChange={(value) => setUser({ ...user, role: value })} defaultValue='Chưa xác định' style={{ width: "100%" }}>
            {loginUser && loginUser.role == "SUPER_ADMIN" && (
                <Option key={0} value='SUPER_ADMIN'>
                    Quản trị hệ thống
                </Option>
            )}
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
            {roles.map((status, index) => {
                return (
                    <Option key={index} value={status.code}>
                        {status.name}
                    </Option>
                );
            })}
        </Select>
    );

<<<<<<< HEAD
    return (
        <Modal
            visible={visible}
            title={
                userId && userId !== ""
                    ? "Cập nhật người dùng"
                    : "Thêm người dùng"
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
                            value={user?.full_name}
                            onChange={(e) =>
                                setUser({ ...user, full_name: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="username" style={{ width: "45%" }}>
                        <label htmlFor="">
                            Tên đăng nhập <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            type="text"
                            placeholder="Tên đăng nhập"
                            value={user?.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="email"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">
                            Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            type="email"
                            placeholder="Email"
                            value={user?.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="phone" style={{ width: "45%" }}>
                        <label htmlFor="">Sdt <span style={{ color: "red" }}>*</span></label>
                        <Input
                            className="input-box"
                            placeholder="Số điện thoại"
                            value={user?.phone}
                            onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })
                            }
                        />
=======
    const renderSelectType = () => (
        <Select disabled={mode == "detail"} className='select-box' value={user?.type} onChange={(value) => setUser({ ...user, type: value, page_id: 0 })} defaultValue='Chưa xác định' style={{ width: "100%", minWidth: 100 }}>
            {loginUser && loginUser.role == "SUPER_ADMIN" && (
                <Option key={0} value='ALL_PROJECT'>
                    Tất cả
                </Option>
            )}
            {types.map((type, index) => {
                return (
                    <Option key={index} value={type.code}>
                        {type.name}
                    </Option>
                );
            })}
        </Select>
    );

    return (
        <Modal visible={visible} title={title} onOk={handleSave} onCancel={handleCloseModal} okText='Lưu' cancelText='Hủy'>
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item name='name' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input disabled={mode == "detail"} className='input-box' placeholder='Tên' value={user?.full_name} onChange={(e) => setUser({ ...user, full_name: e.target.value })} />
                    </Form.Item>
                    <Form.Item name='username' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Tên đăng nhập <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input disabled={mode == "detail"} className='input-box' type='text' placeholder='Tên đăng nhập' value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item name='email' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input disabled={mode == "detail"} className='input-box' type='email' placeholder='Email' value={user?.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </Form.Item>
                    <Form.Item name='phone' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Sdt <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input disabled={mode == "detail"} className='input-box' placeholder='Số điện thoại' value={user?.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                    </Form.Item>
                </Row>
                {!userId && (
                    <Row gutter={[16, 16]}>
<<<<<<< HEAD
                        <Form.Item
                            name="password"
                            style={{ width: "45%", marginRight: 10 }}
                        >
                            <label htmlFor="">
                                Mật khẩu <span style={{ color: "red" }}>*</span>
                            </label>
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
=======
                        <Form.Item name='password' style={{ width: "45%", marginRight: 10 }}>
                            <label htmlFor=''>
                                Mật khẩu <span style={{ color: "red" }}>*</span>
                            </label>
                            <Input
                                disabled={mode == "detail"}
                                type='password'
                                placeholder='Mật khẩu'
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                                value={user?.password}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
<<<<<<< HEAD
                        <Form.Item name="re-password" style={{ width: "45%" }}>
                            <label htmlFor="">
                                Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                            </label>
                            <Input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
=======
                        <Form.Item name='re-password' style={{ width: "45%" }}>
                            <label htmlFor=''>
                                Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                            </label>
                            <Input
                                disabled={mode == "detail"}
                                type='password'
                                placeholder='Xác nhận mật khẩu'
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                                value={user?.repassword}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        repassword: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                )}
                <Row gutter={[16, 16]}>
<<<<<<< HEAD
                    <Form.Item
                        name="address"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">Address </label>
                        <Input
                            className="input-box"
                            type="text"
                            placeholder="Địa chỉ"
                            value={user?.address}
                            onChange={(e) =>
                                setUser({ ...user, address: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="role" style={{ width: "45%" }}>
                        <label htmlFor="">Ngày sinh </label>
                        <DatePicker
                            value={
                                user.birthday
                                    ? moment(user?.birthday, "YYYY-MM-DD")
                                    : ""
                            }
=======
                    <Form.Item name='address' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>Address </label>
                        <Input disabled={mode == "detail"} className='input-box' type='text' placeholder='Địa chỉ' value={user?.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                    </Form.Item>
                    <Form.Item name='role' style={{ width: "45%" }}>
                        <label htmlFor=''>Ngày sinh </label>
                        <DatePicker
                            disabled={mode == "detail"}
                            value={user.birthday ? moment(user?.birthday, "YYYY-MM-DD") : ""}
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                            onChange={(date) =>
                                setUser({
                                    ...user,
                                    birthday: date,
                                })
                            }
                            style={{ width: "100%" }}
                            format={"YYYY-MM-DD"}
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
<<<<<<< HEAD
                    <Form.Item
                        name="role"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">Chức vụ </label>
                        {renderSelectRole()}
                    </Form.Item>
                    <Form.Item name="status" style={{ width: "45%" }}>
                        <label htmlFor="">Trạng thái </label>
                        {renderSelectStatus()}
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item name="status" style={{ margin: "0 auto" }}>
                        <label htmlFor="">Avatar </label>
                        <UploadImage
                            imageUrl={
                                imageUrl ? imageUrl : `media/users/blank.png`
                            }
                            setImageUrl={setImageUrl}
                        />
=======
                    <Form.Item name='role' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>Chức vụ </label>
                        {renderSelectRole()}
                    </Form.Item>
                    <Form.Item name='status' style={{ width: "45%" }}>
                        <label htmlFor=''>Trạng thái </label>
                        {renderSelectStatus()}
                    </Form.Item>
                </Row>
                {loginUser && loginUser.role == "SUPER_ADMIN" && (
                    <Row gutter={[16, 16]}>
                        <Form.Item name='type' style={{ margin: "0 auto" }}>
                            <label htmlFor=''>Dự án </label>
                            {renderSelectType()}
                        </Form.Item>
                    </Row>
                )}
                <Row>
                    <Form.Item name='status' style={{ margin: "0 auto" }}>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor=''>Avatar </label>
                        </div>
                        <UploadImage imageUrl={imageUrl ? imageUrl : `media/users/blank.png`} setImageUrl={setImageUrl} />
>>>>>>> ec42d30b3f687750451212cd3b1c9ca794be8f5e
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalUser;
