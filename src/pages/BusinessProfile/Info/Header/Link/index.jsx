import React, { Component } from 'react';
import './style.scss';

import { FacebookShareButton, GooglePlusShareButton, TwitterShareButton } from 'react-share';

class Link extends Component {
    componentDidMount = () => {
        if (this.props.text === 'Share') {
            $('.popup-button2').popup({
                popup: $('.custom.popup'),
                on: 'click',
                lastResort: 'top left'
            });
        }
    };

    render() {
        const { icon, text, click = undefined, disabled = false } = this.props;
        return (
            <div className="col-sm-3 col-m-4 col-xs-3" onClick={click} disabled={disabled}>
                <a
                    className={`ui circular outline logo-color icon button ${
                        text === 'Share' ? 'popup-button2' : ''
                    }`}
                >
                    <i className={icon} />
                </a>
                <span className="hidden-xs">{text}</span>
                {text === 'Share' && (
                    <div className="ui custom flowing popup top left">
                        <div className="ui buttons">
                            <button className="ui icon facebook button">
                                <FacebookShareButton url={window.location.href}>
                                    <i className="fa fa-facebook fa-fw" />
                                </FacebookShareButton>
                            </button>
                            <button className="ui icon google plus button">
                                <GooglePlusShareButton url={window.location.href}>
                                    <i className="fa fa-google-plus fa-fw" />
                                </GooglePlusShareButton>
                            </button>
                            <button className="ui icon twitter button">
                                <TwitterShareButton url={window.location.href}>
                                    <i className="fa fa-twitter fa-tw" />
                                </TwitterShareButton>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Link;
