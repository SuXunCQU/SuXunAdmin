import React, {Component} from 'react';

class BaiduAi extends Component {
    render() {
        return (
            <div>
                <h2><strong>接口能力</strong></h2>
                <ul>
                    <li><strong>两张人脸图片相似度对比</strong>：比对两张图片中人脸的相似度，并返回相似度分值；		</li>
                    <li><strong>多种图片类型</strong>：支持<strong>生活照</strong>、<strong>证件照</strong>、<strong>身份证芯片照</strong>、<strong>带网纹照</strong>四种类型的人脸对比；</li>
                    <li><strong>活体检测控制</strong>：基于图片中的破绽分析，判断其中的人脸是否为<strong>二次翻拍</strong>（举例：如用户A用手机拍摄了一张包含人脸的图片一，用户B翻拍了图片一得到了图片二，并用图片二伪造成用户A去进行识别操作，这种情况普遍发生在金融开户、实名认证等环节。）；</li>
                    <li><strong>质量检测控制</strong>：分析图片的中人脸的模糊度、角度、光照强度等特征，判断图片质量；</li>
                </ul>
                <section>
                    <h2><strong>输入限制</strong></h2>
                    <ul>
                        <li><strong>图像格式：</strong>现支持PNG、JPG、JPEG、BMP，不支持GIF图片。</li>
                        <li><strong>图像大小：</strong>不超过10M。</li>
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

export default BaiduAi;
