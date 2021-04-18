import React, {Component} from 'react';
import { Map, Polyline  } from 'react-amap';


const randomPath = () => ({
    longitude: 60 + Math.random() * 50,
    latitude: 10 + Math.random() * 40,
})
class GdMap extends Component {
    constructor(props) {
        super(props);
        this.mapCenter = {longitude: 106.55, latitude: 29.57};
        this.state = {
            visible: true,
            draggable: true,
            path: Array(5).fill(true).map(randomPath),
        };
        this.lineEvents = {
            created: (ins) => {console.log(ins)},
            show: () => {console.log('line show')},
            hide: () => {console.log('line hide')},
            click: () => {console.log('line clicked')},
        }
    }

    toggleVisible(){
        this.setState({
            visible: !this.state.visible,
        });
    }

    toggleDraggable(){
        this.setState({
            draggable: !this.state.draggable,
        })
    }

    changePath(){
        this.setState({
            path: Array(5).fill(true).map(randomPath),
        });
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <Map center={this.mapCenter}  amapkey={"e42246aad47931d04c21276d03fcaac3"}>
                    {/*<Polyline*/}
                    {/*    path={ this.state.path }*/}
                    {/*    events={ this.lineEvents }*/}
                    {/*    visible={ this.state.visible }*/}
                    {/*    draggable={ this.state.draggable }*/}
                    {/*    style={{*/}
                    {/*        strokeWeight: 1,*/}
                    {/*    }}*/}
                    {/*/>*/}
                </Map>

                {/*<button onClick={() => {this.toggleVisible() } }>Toggle Visible</button>*/}
                {/*<button onClick={() => {this.toggleDraggable() } }>Toggle Draggable</button>*/}
                {/*<button onClick={() => {this.changePath() } }>Change Path</button>*/}
            </div>
        );
    }
}

export default GdMap;
