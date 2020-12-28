import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { uploadAvatar } from "../../../../../modules/user/store/services";
import { userHost, uploadPath } from "../../../../../modules/user/config/UserConfig";
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("Chỉ có thể upload file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Độ lớn phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
}

class UploadImage extends React.Component {
    state = {
        loading: false,
    };

    handleChange = async (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
            this.setState({
                imageUrl,
                loading: false,
            });
        });
    };

    handleUpload = async (file) => {
        const res = await uploadAvatar({ file });
        this.props.setImageUrl( uploadPath + res.result);
    };

    render() {
        const { loading } = this.state;
        const { imageUrl } = this.props;

        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={this.handleUpload}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? (
                    <img
                        src={userHost + imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        );
    }
}

export default UploadImage;
