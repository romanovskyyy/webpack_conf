import React from 'react';

const Social = ({ socialLinks }) => {
    const saveUserUrl = (e) => {
        sessionStorage.setItem('lastUrl', window.location.href);
    };
    return (
        <div className="social" onClick={saveUserUrl}>
            <a id="facebook_login" className="circle facebook" href={socialLinks.fb}>
                <i className="fa fa-facebook fa-fw" />
            </a>
            <a id="google_login" className="circle google" href={socialLinks.google}>
                <i className="fa fa-google-plus fa-fw" />
            </a>
            <a className="circle twitter" href={socialLinks.twitter}>
                <i className="fa fa-twitter fa-fw" />
            </a>
        </div>
    );
};

export default Social;
