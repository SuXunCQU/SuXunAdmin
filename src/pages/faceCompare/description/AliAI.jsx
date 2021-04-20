import React, {Component} from 'react';

class AliAI extends Component {
    render() {
        return (
            <div>
                <section>
                    <h2><strong>功能描述</strong></h2>
                    <p>人脸比对1:1基于您输入的两张图片，分别挑选两张图片中的最大人脸进行比较，判断是否为同一人。同时返回这两个人脸的矩形框坐标、比对的置信度，以及不同误识率的置信度阈值。</p>
                </section>
                <section>
                    <h2><strong>一般应用场景</strong></h2>
                    <ul>
                        <li><strong>金融业务：</strong>比对用户身份证照片和现场拍摄的已获授权的真人照片，判断用户信息真实性，可提供快速安全的身份核验流程，适用于互联网远程开户、刷脸支付等金融业务。</li>
                        <li><strong>人脸考勤：</strong>无接触式刷脸考勤，疫情防控场景下企业考勤首选，且能有效防止代打卡等作弊行为。</li>
                        <li><strong>公共服务：</strong>客户直接刷脸办理业务，通过人脸比对识别身份信息，减少身份证查验、复印存档等环节，提高公共服务窗口办理业务的效率。</li>
                        <li><strong>酒店自助入住：</strong>住客刷脸自助办理入住，将现场授权获取的人脸照片，与身份证提取的照片进行1:1比对，确保住客身份的真实性的同时，减少人工核查和服务成本，向住客提供便捷的入住体验。</li>
                    </ul>
                </section>
                <section >
                    <h2><strong>特色优势</strong></h2>
                    <ul>
                        <li><strong>高精度识别：</strong> 由达摩院提供业内领先的人脸识别算法，算法准确率超过99%。</li>
                        <li><strong>平台服务稳定：</strong>提供在高并发，大流量下的毫秒级识别响应和99.999%的可靠性保障。</li>
                    </ul>
                </section>
                <section>
                    <h2><strong>输入限制</strong></h2>
                    <ul>
                        <li><strong>图像格式：</strong>JPEG、JPG、PNG、BMP。</li>
                        <li><strong>图像大小：</strong>不超过3M。</li>
                        <li><strong>图像分辨率：</strong>大于32×32像素，小于2048×2048像素，人脸占比不低于64×64像素。</li>
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

export default AliAI;
