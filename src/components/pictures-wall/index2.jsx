import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import {reqUploadImg} from '../../api';


class PictureWall extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    uploadRef = React.createRef();

    handleUpload = () => {
        const { fileList } = this.state;
        this.setState({
            uploading: true,
        });

        const promise = new Promise((resolve, reject) => {
            let size = fileList.length;
            fileList.forEach(file => {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    const response = reqUploadImg(file.name, reader.result);
                    console.log(response);
                    size--;
                })
                reader.readAsDataURL(file);
            });
            setTimeout(() => {
                reject({status: "-1", msg: "已超时"})
            }, 30000)
        })


        this.setState({
            uploading: true,
        });

        return fileList.map((file) => file.name).join(",");
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file]
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props} ref={(node) => this.uploadRef = node}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}

export default PictureWall;
