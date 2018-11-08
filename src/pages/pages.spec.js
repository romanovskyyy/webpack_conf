import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

describe('Page Components', () => {
    it('should renders Header ', () => {
        const wrapper = shallow(<Header />);
        expect(wrapper).toHaveLength(1);
    });

    it('should renders Footer ', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper).toHaveLength(1);
    });
});
