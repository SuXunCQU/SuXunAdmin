import React, {Component} from 'react';

class DeepId extends Component {
    render() {
        return (
            <div>
                <section>
                    <h2><strong>算法描述</strong></h2>
                    <ul>
                        <li>DeepID，目前最强人脸识别算法，已经三代。</li>
                        <li>DeepID所应用的领域是人脸识别的子领域——人脸比对，就是判断两张图片是不是同一个人。</li>
                    </ul>
                </section>
                <section>
                    <h2><strong>算法优点</strong></h2>
                    <ul>
                        <li>在众多人脸比对算法中脱颖而出，比对准确率达99.1%</li>
                        <li>对于图片中的遮挡有很好的鲁棒性</li>
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

export default DeepId;
