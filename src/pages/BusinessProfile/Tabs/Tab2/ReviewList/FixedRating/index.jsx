import React from 'react';
import { handleRenderStars } from '../../../../../../helpers/arrRender';

const FixedRating = () => {
    return (
        <div className="col-sm-3">
            <div className="detailsInfoBox">
                <h3>
                    Reviews (<span>5</span>)
                </h3>
                <div className="listingReview fixed-rating">
                    <p>
                        <i>Very Good</i>
                        &nbsp;
                        <span className="ui large star rating">{handleRenderStars(5)}</span>
                        <i className="count">(3)</i>
                    </p>
                    <p>
                        <i>Good</i>
                        &nbsp;
                        <span className="ui large star rating">{handleRenderStars(4)}</span>
                        <i className="count">(2)</i>
                    </p>
                    <p>
                        <i>Average</i>
                        &nbsp;
                        <span className="ui large star rating">{handleRenderStars(3)}</span>
                        <i className="count">(0)</i>
                    </p>
                    <p>
                        <i>Poor</i>
                        &nbsp;
                        <span className="ui large star rating">{handleRenderStars(2)}</span>
                        <i className="count">(0)</i>
                    </p>
                    <p>
                        <i>Very Poor</i>
                        &nbsp;
                        <span className="ui large star rating">{handleRenderStars(1)}</span>
                        <i className="count">(0)</i>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FixedRating;
