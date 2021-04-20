import React, {Component} from "react";
import ReactWordcloud from "react-wordcloud";

class LostPlace extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const wordsJsonList = [
            {text: "hello", value: 3},
            {text: "world", value: 12.5},
            {text: "github", value: 1},
            {text: "code", value: 1}
        ];
        return (
            <ReactWordcloud words={wordsJsonList}/>
        )
    }
}


export default LostPlace;

