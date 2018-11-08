import React, { Component } from 'react';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

export default class Tabs extends Component {
    state = {
        activeTab: 'Gallery'
    };

    // handleChangeActiveTab = (e) => this.setState({ activeTab: e.target.innerText });

    render() {
        const { activeTab } = this.state;
        const { data, showModal, gallery } = this.props;
        return (
            <section className="clearfix worksArea" id="tab-section">
                <div className="container">
                    <div
                        className="ui three item secondary pointing menu"
                        onClick={this.handleChangeActiveTab}
                    >
                        <a className={`item ${activeTab === 'Products' ? 'active' : ''}`}>
                            Products & Services
                        </a>
                        <a className={`item ${activeTab === 'Reviews' ? 'active' : ''}`}>Reviews</a>
                        <a className={`item ${activeTab === 'Gallery' ? 'active' : ''}`}>Gallery</a>
                    </div>
                    <div className="main ui">
                        {(() => {
                            switch (activeTab) {
                                case 'Products':
                                    return <Tab1 />;
                                case 'Reviews':
                                    return <Tab2 />;
                                case 'Gallery':
                                    return <Tab3 gallery={gallery} />;
                                default:
                                    return <Tab1 />;
                            }
                        })()}
                    </div>
                </div>
            </section>
        );
    }
}
