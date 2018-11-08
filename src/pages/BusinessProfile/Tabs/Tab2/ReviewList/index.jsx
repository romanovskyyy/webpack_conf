import React from 'react';
import FixedRating from './FixedRating';
import ReviewItem from './ReviewItem';

const reviewArr = [
    {
        img: 'img/listing/list-user-1.jpg',
        name: 'Brown Paul',
        rate: 5,
        time: '3 Oct, 2018',
        msg: 'Trustworthy and great customer service. Gave big discount on my purchase,'
    },
    {
        img: 'img/listing/list-user-4.png',
        name: 'Jessica Brown',
        rate: 4,
        time: '3 Oct, 2018',
        msg: 'Great value for money.Respectful and helpful.'
    },
    {
        img: 'img/listing/list-user-2.jpg',
        name: 'Semmy Joe',
        rate: 4,
        time: '3 Oct, 2018',
        msg: 'Quick and honest. Had exactly what I was looking for.'
    }
];
const Reviews = () => {
    return (
        <div className="row review-list">
            <FixedRating />
            <div className="col-sm-9">
                <div className="detailsInfoBox">
                    <h3>Reviews (3)</h3>
                    {reviewArr.map((item, index) => (
                        <ReviewItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
