import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import {reqUploadImg} from '../../api';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            reqUploadImg(file.name, reader.result)
                .then((res) => {
                    console.log(res);
                    resolve(`file ${file.name} successfully upload.`)
                })
                .catch((err) => {
                    console.log(err);
                    reject(err.message);
                })
        })
        reader.readAsDataURL(file);
    })
}

class PictureWall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            previewVisible: false,
            previewImage: '',
        };
    }

    handleUpload = () => {
        const { fileList } = this.state;
        this.setState({
            uploading: true,
        });

        const promises = []
        fileList.forEach((file) => {
            promises.push(getBase64(file));
        });

        Promise.all(promises)
            .then((res) => {
                console.log(res);
                this.setState({
                    uploading: false,
                });
            })
            .catch((err) => {
                console.log(err.message)
            })

        console.log(promises);

        this.setState({
            uploading: true,
        });

        if(this.props.setPhoto){
            this.props.setPhoto(fileList.map((file) => file.name).join(","));
        }

    };

    componentDidMount() {
        // console.log("pictureWall Mounted");
    }

    render() {
        const { fileList } = this.state;
        const props = {
            listType: "picture-card",
            previewFile: async file => {
                console.log("preview files");
                console.log(file);
            },
            onPreview: async file => {
                console.log(file);
                console.log(file.originFileObj);
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }

                this.setState({
                    previewImage: file.url || file.preview,
                    previewVisible: true,
                });
            },
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
                this.setState((prevState) => ({
                    fileList: [...prevState.fileList, file]
                }), () => {
                    const photoNames = this.state.fileList.map((file) => file.name).join(",");
                    console.log(photoNames);
                    if(this.props.setPhoto){
                        this.props.setPhoto(photoNames);
                    }
                });
                return false;
            },
            fileList,
        };

        return (
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> 上传图片
                </Button>
            </Upload>
        );
    }
}

export default PictureWall;
