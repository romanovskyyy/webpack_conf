import React, { Component } from 'react';

import Dropzone from '../../../../../components/Dropzone';
import { resetFiles } from '../../../../../ducks/files';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

class CoverPhoto extends Component {
    componentWillUnmount = () => {
        this.props.dispatch(resetFiles());
    };

    render() {
        const { id, savedFiles } = this.props;
        return (
            <AccordionItem className="accordion-item">
                <AccordionItemTitle href="#" className="heading">
                    <div className="icons" />
                    <div className="title">Cover Photo</div>
                </AccordionItemTitle>

                <AccordionItemBody className="content accordion__body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <div className="form uploadImg">
                                <h3> Your Cover Photos Appear On Your Profile Page.</h3>
                                <p className="note">
                                    <i>
                                        Upload a maximum of 6 photos (e.g Logo, Store front, etc) as
                                        jpeg or png
                                    </i>
                                </p>
                                <p className="note">
                                    <i>Maximum file size is 1 mb</i>
                                </p>
                                <Dropzone
                                    savedFiles={savedFiles}
                                    id={id}
                                    maxFileSize={1048576}
                                    fileLimit={6}
                                    withCrop
                                    choosable
                                    type="cover-photo"
                                />
                            </div>
                        </div>
                    </div>
                </AccordionItemBody>
            </AccordionItem>
        );
    }
}

export default CoverPhoto;
