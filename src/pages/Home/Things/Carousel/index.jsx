import React, { Component } from 'react';
import './style.scss';
import Siema from 'siema';
import Item from './Item';

const isMobile = window.innerWidth < 768;
export default class SiemaWrapper extends Component {
    state = {
        perPage: isMobile ? 1 : 3
    };

    prev = () => {
        this.siema.prev(this.state.perPage);
    };

    next = () => {
        this.siema.next(this.state.perPage);
    };

    handleUpdActiveDot = () => {
        const current = this.siema.currentSlide;
        const dots = document.querySelectorAll('.carousel-indicators li');
        if (this.state.perPage === 3) {
            const index = current === 3;
            dots[index ? 0 : 1].classList.remove('active');
            dots[index ? 1 : 0].classList.add('active');
        } else {
            for (let i = 0; i < dots.length; i++) {
                const addOrRemove = current === i ? 'add' : 'remove';
                dots[i].classList[addOrRemove]('active');
            }
        }
    };

    updateDimensions = () => {
        const dotsWrapper = document.querySelector('.carousel-indicators');
        this.setState({ perPage: window.innerWidth < 768 ? 1 : 3 }, () => {
            this.siema.config.perPage = this.state.perPage;
        });

        dotsWrapper.innerHTML = '';
        this.siema.addPagination(this.state.perPage);
        this.handleUpdActiveDot();
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        const { perPage } = this.state;

        this.siema = new Siema({
            perPage,
            loop: true,
            duration: 500,
            onChange: () => this.handleUpdActiveDot()
        });
        Siema.prototype.addPagination = function(count) {
            for (let i = 0; i < this.innerElements.length / count; i++) {
                const li = document.createElement('li');
                if (i === 0) {
                    li.classList.add('active');
                }
                li.classList.add('dot');
                li.addEventListener('click', () => this.goTo(i));
                document.querySelector('.carousel-indicators').appendChild(li);
            }
        };
        this.siema.addPagination(perPage);
        this.timer = setInterval(() => this.next(), 3000);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimensions);
        this.siema.destroy();
        clearInterval(this.timer);
    };

    render() {
        return (
            <div className="carousel-inner">
                <a className="left carousel-control" onClick={this.prev}>
                    <i className="fa fa-angle-left" aria-hidden="true" />
                </a>
                <a className="right carousel-control" onClick={this.next}>
                    <i className="fa fa-angle-right" aria-hidden="true" />
                </a>
                <div className="siema">
                    <Item
                        name="Jotun Al Fannan Decor"
                        location="Al Shahama, Abu Dhabi - United Arab Emirates"
                        rate="3"
                        img="/img/listing/Jotun1.jpg"
                    />
                    <Item
                        name="RelayRides Rent A Car"
                        location="Al Shahama, Abu Dhabi - United Arab Emirates"
                        rate="4"
                        img="/img/listing/car.png"
                    />
                    <Item
                        name="Telal Shahama"
                        location="Al Shahama, Abu Dhabi - United Arab Emirates"
                        rate="1"
                        img="/img/listing/tlal.png"
                    />
                    <Item
                        name="Vintage Cafe"
                        location="Al Shahama, Abu Dhabi - United Arab Emirates"
                        rate="5"
                        img="/img/listing/vic.png"
                    />
                    <Item
                        name="FAWQ Al ssahb Travel & Tourism"
                        location="Al Shahama, Abu Dhabi - United Arab Emirates"
                        rate="4"
                        img="/img/listing/alfurat.png"
                    />
                    <Item
                        name="Telal Shahama"
                        location="Al Shahama, Abu Dhabi - United Arab Emirates"
                        rate="1"
                        img="/img/listing/tlal.png"
                    />
                </div>
                <div className="carousel-indicators" />
            </div>
        );
    }
}
