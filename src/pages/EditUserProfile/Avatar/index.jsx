import React from 'react';
import './style.scss';

import { Field } from 'redux-form';
import FileUpload from '../../../components/UI/FileUpload';

const Avatar = ({ ava }) => {
    return (
        <div className="col-md-4 col-sm-5 col-xs-12">
            <div className="dashboardBoxBg mb30">
                <div className="profileImage">
                    {ava ? (
                        <img src={ava} alt="Image User" className="img-circle" />
                    ) : (
                        <i className="fa fa-user-circle-o" />
                    )}

                    <Field name="avatar" component={FileUpload} type="file" />
                </div>
            </div>
        </div>
    );
};

export default Avatar;
