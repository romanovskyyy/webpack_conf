import React, { Component } from 'react';

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import ImageItem from './ImageItem';

class Tab3 extends Component {
    state = {
        currentImg: 0
    };
    openLightbox = (event, obj) => {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true
        });
    };
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    };
    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    };
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    };
    render() {
        const { gallery } = this.props;
        return (
            <div className="ui tab active" data-tab="third">
                <div className="row">
                    <Gallery
                        photos={gallery}
                        onClick={this.openLightbox}
                        ImageComponent={ImageItem}
                    />
                    <Lightbox
                        images={gallery}
                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}
                        backdropClosesModal={true}
                    />
                </div>
            </div>
        );
    }
}

export default Tab3;
