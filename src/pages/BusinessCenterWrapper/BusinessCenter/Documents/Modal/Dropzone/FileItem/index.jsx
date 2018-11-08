import React, { Component } from 'react';
import './style.scss';

import Pdf from '../../../../../../../assets/img/pdf.svg';
import Csv from '../../../../../../../assets/img/csv.svg';
import Excel from '../../../../../../../assets/img/excel.svg';
import Word from '../../../../../../../assets/img/word.svg';
import Zip from '../../../../../../../assets/img/zip.svg';
import Exe from '../../../../../../../assets/img/exe.svg';

const renderPreview = ({ name, preview, storageUrl }) => {
    let url;
    if (preview) {
        url = preview;
    } else {
        url = storageUrl;
    }
    const dotIndex = name.lastIndexOf('.');
    const ext = name.substring(dotIndex);
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
            return <img src={url} alt="" />;
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
    render() {
        const { file, click, rejected = false } = this.props;

        return (
            <div className="file-thumbnail">
                <a href={file.storageUrl} target="_blank" download>
                    {rejected ? renderRejected(file) : renderPreview(file)}
                </a>
                {rejected ? <p className="failed">Failed</p> : <p className="success">Success</p>}
                <span className="file-thumbnail_name">
                    {file.originalName ? file.originalName : file.name}
                </span>
                <i className="icon-cancel" onClick={click} />
            </div>
        );
    }
}

export default FileItem;
