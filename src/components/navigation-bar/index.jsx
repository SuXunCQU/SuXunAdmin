import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './index.less';

const NAV_BAR_HEIGHT = 16;
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT;
export default class NavigationBar extends Component {
    // 提供属性的类型检查
    static propTypes = {
        title: PropTypes.string,
        titleView: PropTypes.element,
        hide: PropTypes.bool,
    };

    render() {
        let titleView = this.props.titleView ? this.props.titleView :
            <div className="title">{this.props.title}</div>

        let content = this.props.hide ? null :
            <div className="navBar">
                {this.getButtonElement(this.props.leftButton)}
                <div className="navBarTitleContainer">
                    {titleView}
                </div>
                {this.getButtonElement(this.props.rightButton)}
            </div>

        return (
            <div className="navbar-container">
                {content}
            </div>
        )
    }

    getButtonElement(button) {
        return (
            <div className="navBarButton">
                {button ? button : null}
            </div>
        )
    }
}
