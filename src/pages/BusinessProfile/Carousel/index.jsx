import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';

import Slider from 'react-slick';
import Item from './Item';
import { move } from '../../../helpers/common';

export default class CarouselWrapper extends Component {
    handleSlideToShowCount = (photo) => {
        switch (photo.length) {
            case 1:
                return 1;
            case 2:
                return 2;
            default:
                return 3;
        }
    };

    render() {
        const { coverPhoto } = this.props.data;
        let updArr = [...coverPhoto];

        if (updArr.length === 3) {
            const previewIndex = updArr.findIndex((item) => item.isPreview);
            move(updArr, previewIndex, 1);
        }
        const settings = {
            className: 'center',
            centerMode: true,
            infinite: true,
            slidesToShow: this.handleSlideToShowCount(coverPhoto),
            speed: 500,
            centerPadding: '100px',
            initialSlide: coverPhoto.findIndex((item) => item.isPreview),
            focusOnSelect: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        };

        return (
            <section className="clearfix paddingAdjustTopBottom">
                <div className="shop">
                    <Slider className="listingImage" {...settings}>
                        {updArr.map((photo) => (
                            <Item key={photo.id} img={photo.storageUrl} length={updArr.length} />
                        ))}
                        {/* <div className="slide">
                            <div className="cl">1</div>
                        </div>
                        <div className="slide">
                            <div className="cl">2</div>
                        </div>
                        <div className="slide">
                            <div className="cl">3</div>
                        </div> */}
                    </Slider>
                </div>
            </section>
        );
    }
}
