import React, {Component} from 'react';

class FaceNet extends Component {
    render() {
        return (
            <div>
                <section>
                    <h2><strong>算法描述</strong></h2>
                    <ul>
                        <li>FaceNet 是一种通用于人脸识别和聚类的嵌入方法，该方法使用深度卷积网络，其最重要的部分在于整个系统的端到端学习。</li>
                        <li>FaceNet进行端对端学习一个从图像到欧式空间的编码方法，然后基于这个编码再做人脸比对</li>
                    </ul>
                </section>
                <section>
                    <h2><strong>算法优点</strong></h2>
                    <ul>
                        <li>利用DNN直接学习到从原始图片到欧氏距离空间的映射，从而使得在欧式空间里的距离的度量直接关联着人脸相似度</li>
                        <li>引入triplet损失函数，使得模型的学习能力更高效。</li>
                    </ul>
                </section>
                <section>
                    <h2><strong>输入限制</strong></h2>
                    <ul>
                        <li><strong>图像格式：</strong>支持PNG、JPG、JPEG、BMP，不支持GIF图片。</li>
                        <li><strong>图像大小：</strong>最好不超过2M。</li>
                        <li><strong>图像分辨率：</strong>最小 48*48 像素，最大 4096*4096 像素</li>
                        <li>URL地址中不能包含中文字符。</li>
                    </ul>
                    <div>
                        <div><strong>说明：</strong> 当图像分辨率超过最大限制时，请先将图片进行缩放，调整图片大小</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default FaceNet;
