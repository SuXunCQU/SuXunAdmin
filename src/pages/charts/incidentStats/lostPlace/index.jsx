import React, {Component} from "react";
import ReactWordcloud from "react-wordcloud";

class LostPlace extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const wordsJsonList = [
            {text: "超市", value: 45},
            {text: "公园", value: 100},
            {text: "广场", value: 52},
            {text: "学校附近", value: 40},
            {text:'步行街',value: 34},
            {text:'家门口',value: 10},
            {text:'海边',value: 20},
            {text:'码头附近',value: 33},
            {text:'湖边',value: 33},
            {text:'河边',value: 88},
            {text:'小区门口',value: 60},
            {text:'街道',value: 66},
            {text:'商城',value: 110},
            {text:'大桥底',value: 20},
            {text:'马路边',value: 33},
        ];
        return (
            <ReactWordcloud words={wordsJsonList}/>
        )
    }
}


export default LostPlace;

