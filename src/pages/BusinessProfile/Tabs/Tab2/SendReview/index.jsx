import React from 'react';
import Rate from 'rc-rate';

const handleChangeRate = (val) => {
    console.log(val);
};
const SendReview = () => {
    return (
        <div className="row review">
            <div className="col-sm-12">
                <div className="detailsInfoBox">
                    <h3>Write A Review </h3>
                    <div className="listingReview">
                        <span>( 5 Reviews )</span>
                        <div className="ui large star rating">
                            <Rate
                                defaultValue={4}
                                onChange={handleChangeRate}
                                character={<i className="icon" />}
                            />
                        </div>
                    </div>
                    <form action="#">
                        <div className="formSection formSpace">
                            <div className="form-group">
                                <textarea className="form-control" rows="3" placeholder="Comment" />
                            </div>
                            <div className="form-group mb0">
                                <button type="submit" className="btn btn-primary btn-block-mob">
                                    Send Review
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendReview;
