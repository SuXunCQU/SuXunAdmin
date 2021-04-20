import React, {Component} from 'react';

class MegviiFace extends Component {
    render() {
        return (
            <div>
                <section>
                    <h2><strong>描述</strong></h2>
                    <ul>
                        <li>将两个人脸进行比对，来判断是否为同一个人，返回比对结果置信度和不同误识率下的阈值</li>
                        <li>支持传入图片或 face_token 进行比对。使用图片时会自动选取图片中检测到人脸尺寸最大的一个人脸。</li>
                    </ul>
                </section>
                <section>
                    <h2><strong>输入限制</strong></h2>
                    <ul>
                        <li><strong>图像格式：</strong>JPG(JPEG)，PNG。</li>
                        <li><strong>图像大小：</strong>不超过2M。</li>
                        <li><strong>图像分辨率：</strong>最小 48*48 像素，最大 4096*4096 像素</li>
                        <li><strong>最小人脸像素尺寸：</strong>系统能够检测到的人脸框为一个正方形，正方形边长的最小值为 150 像素。</li>
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

export default MegviiFace;
