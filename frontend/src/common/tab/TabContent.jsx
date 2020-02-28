import React, { Component } from 'react'
import { connect } from 'react-redux'

import If from '../operator/If'

class TabContent extends Component {
    render() {
        const selected = this.props.tab.selectedTab === this.props.id
        const visible = this.props.tab.tabsToShow[this.props.id]

        return (
            <If condition={visible}>
                <div id={this.props.id}
                    className={`tab-pane ${selected ? "active" : ""}`}>
                    {this.props.children}
                </div>
            </If>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
export default connect(mapStateToProps)(TabContent)