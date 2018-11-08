import React, { Component } from 'react';
import './style.scss';

import Proposal from './Proposal';
import Pdf from '../../../assets/img/pdf.svg';
import Csv from '../../../assets/img/csv.svg';
import Excel from '../../../assets/img/excel.svg';
import Word from '../../../assets/img/word.svg';
import Zip from '../../../assets/img/zip.svg';
import Exe from '../../../assets/img/exe.svg';

const renderPreview = ({ ext, storageUrl }, isImg) => {
    if (isImg) {
        return <img src={storageUrl} alt="" />;
    }
    switch (ext) {
        case '.docx':
        case '.doc':
            return <Word width={70} height={70} />;
        case '.pdf':
            return <Pdf width={70} height={70} />;
        case '.xls':
        case '.xlsx':
            return <Excel width={70} height={70} />;
        case '.zip':
        case '.rar':
            return <Zip width={70} height={70} />;
        case '.csv':
            return <Csv width={70} height={70} />;
        case '.jpg':
        case '.JPG':
        case '.jpeg':
        case '.svg':
        case '.png':
        case '.JPEG':
            return <img src={storageUrl} alt="" />;
        default:
            return <Exe width={70} height={70} />;
    }
};

const renderRejected = ({ type, preview }) => {
    if (type.startsWith('image')) {
        return <img src={preview} alt="" />;
    } else {
        return <Exe width={70} height={70} />;
    }
};

class FileItem extends Component {
    handleRenderWrapper = (children) => {
        const { choosable, file } = this.props;

        if (choosable) {
            return (
                <Proposal isLogo={file.isLogo} isPreview={file.isPreview} id={file.id}>
                    {children}
                </Proposal>
            );
        } else {
            return <React.Fragment>{children}</React.Fragment>;
        }
    };
    render() {
        const { file, click, rejected = false, isImg = false } = this.props;

        return (
            <div className="file-thumbnail">
                {this.handleRenderWrapper(
                    rejected ? renderRejected(file) : renderPreview(file, isImg)
                )}
                {rejected ? <p className="failed">Failed</p> : <p className="success">Success</p>}
                <span className="file-thumbnail_name">
                    {file.name ? file.name : file.originalName}
                </span>
                <i className="icon-cancel" onClick={click} />
            </div>
        );
    }
}

export default FileItem;
