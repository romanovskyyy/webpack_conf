import React from 'react';

const Preloader = () => {
    return (
        <div id="preloader" className="smooth-loader-wrapper">
            <div className="smooth-loader">
                <div className="loader1">
                    <div className="loader-target">
                        <div className="loader-target-main" />
                        <div className="loader-target-inner" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
