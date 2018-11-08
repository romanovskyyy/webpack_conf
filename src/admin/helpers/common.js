import ReactDOMServer from 'react-dom/server';
import moment from 'moment';

import { chunk, isEqual } from 'lodash';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const renderToMarkup = (el) => ReactDOMServer.renderToStaticMarkup(el);

export const moveToTop = () => {
    var header_area = $('.nav-wrapper');
    header_area.innerHTML = '';
    var main_area = $('.navbar.navbar-sticky');
    main_area.removeClass('navbar-sticky').appendTo(header_area);
    window.scrollTo(0, 0);
};

export const hideMenu = () => {
    $('.nav li:last-child').removeClass('show-list');
    $('.profile-dropdown').fadeOut('slow');
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const escKeyDown = (e, func) => {
    if (e.keyCode === 27) {
        func();
    }
};

export const makeOpeningHoursArr = (days) => {
    const res = {};
    Object.keys(days).forEach((day) => {
        res[day] = chunk(Object.values(days[day]), 2).map((item) => {
            return item.every((el) => !!el) ? item : [];
        });
    });
    return res;
};

export const makeInitialData = (data) => {
    if (!data) {
        return { sun: {}, mon: {}, tue: {}, wed: {}, thu: {}, fri: {}, sat: {} };
    }
    const res = {};
    Object.keys(data).forEach((key) => {
        res[key] = {
            startTime: (!!data[key].length && data[key][0] && data[key][0][0]) || undefined,
            endTime: (!!data[key].length && data[key][0] && data[key][0][1]) || undefined,
            secondStartTime: (data[key].length > 1 && data[key][1] && data[key][1][0]) || undefined,
            secondEndTime: (data[key].length > 1 && data[key][1] && data[key][1][1]) || undefined
        };
    });

    return res;
};

export const dayRender = (day) => {
    switch (day) {
        case 'sat':
            return 'Saturday';
        case 'sun':
            return 'Sunday';
        case 'mon':
            return 'Monday';
        case 'tue':
            return 'Tuesday';
        case 'wed':
            return 'Wednesday';
        case 'thu':
            return 'Thursday';
        case 'fri':
            return 'Friday';
    }
};

export const renderTrue = (item, withComma = false) =>
    item ? (withComma ? item + ',' : item) : '';

export const renderTimePeriod = (time) =>
    `${moment(time[0], 'hh:mma').format('hh:mma')} - ${moment(time[1], 'hh:mma').format('hh:mma')}`;

export const fixedHeader = () => {
    const header_area = $('.nav-wrapper');
    const main_area = header_area.find('.navbar');
    //SCROLL
    $(window).scroll(function() {
        if (
            main_area.hasClass('navbar-sticky') &&
            ($(this).scrollTop() <= 300 || $(this).width() <= 750)
        ) {
            main_area.removeClass('navbar-sticky').appendTo(header_area);
        } else if (
            !main_area.hasClass('navbar-sticky') &&
            $(this).width() > 750 &&
            $(this).scrollTop() > 300
        ) {
            header_area.css('height', header_area.height());
            main_area.css({ opacity: '0' }).addClass('navbar-sticky');
            main_area.appendTo($('body')).animate({ opacity: 1 });
        }
    });
};

export const registerInitialData = { name: '', birth: '', phone: '' };
export const loginInitialData = { email: '', password: '', remember: false };
export const forgetInitialData = { email: '' };
export const addInitialData = {
    name: '',
    buildingNumber: '',
    buildingName: '',
    level: '',
    streetNumber: '',
    streetName: '',
    city: '',
    area: '',
    poBox: '',
    contactNumber: '',
    website: '',
    latitude: '',
    longitude: ''
};

export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const move = (arr, from, to) => arr.splice(to, 0, arr.splice(from, 1)[0]);
