import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import FileItem from './FileItem';

export default class DocumentsDropzone extends Component {
    render() {
        const { handleDrop, acceptedFiles, rejectedFiles, click } = this.props;
        return (
            <div className="form-group inputDnD">
                <label className="sr-only" htmlFor="inputFile">
                    File Upload
                </label>
                <Dropzone
                    onDrop={handleDrop}
                    accept="image/*, .doc, .gif, .pdf, .xls, .rtf, .pages, .xlsx, .xslm, .xlsb, .csv, .docx, .xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="form-control-file font-weight-bold"
                    style={{ marginBottom: '30px' }}
                    maxSize={10485760}
                    multiple={true}
                >
                    <label>Drag and drop files</label>
                </Dropzone>
                {(acceptedFiles.length > 0 || rejectedFiles.length > 0) && (
                    <div className="file-thumbnail-wrapper">
                        {acceptedFiles.length > 0 &&
                            acceptedFiles.map((file, index) => (
                                <FileItem
                                    key={index}
                                    file={file}
                                    index={index}
                                    click={() => click(index, 'accepted')}
                                />
                            ))}
                        {rejectedFiles.length > 0 &&
                            rejectedFiles.map((file, index) => (
                                <FileItem
                                    key={index}
                                    file={file}
                                    rejected
                                    index={index}
                                    click={() => click(index, 'rejected')}
                                />
                            ))}
                    </div>
                )}
            </div>
        );
    }
}
