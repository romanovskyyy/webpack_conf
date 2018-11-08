import React from 'react';
import TimeAgo from 'react-timeago';
import { handleRenderStars } from '../../../../../../helpers/arrRender';

const ReviewItem = ({ item }) => {
    return (
        <div className="media media-comment">
            <div className="media-left">
                <img src={item.img} className="media-object img-circle" alt="Image User" />
            </div>
            <div className="media-body">
                <h4 class="media-heading">{item.name}</h4>
                <div className="rate-and-time">
                    <span className="ui large star rating">{handleRenderStars(item.rate)}</span>
                    <span className="review-time pull-right">
                        (<TimeAgo date={item.time} />)
                    </span>
                </div>
                <p />
                <div className="review-action">
                    <div className="choice">
                        <a href="#" className="like">
                            <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                        </a>
                        <a href="#" className="dislike">
                            <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                        </a>
                    </div>
                    <div className="action-links">
                        <a href="#">
                            <i className="fa fa-flag" aria-hidden="true" />
                            &nbsp;Report
                        </a>
                        <a href="#">
                            <i className="fa fa-share-alt" aria-hidden="true" />
                            &nbsp;Share
                        </a>
                        <a href="#">
                            <i className="fa fa-comment-o" aria-hidden="true" />
                            &nbsp;Comment
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
