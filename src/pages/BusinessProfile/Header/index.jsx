import React from 'react';
import './style.scss';

import Tag from '../Info/Labels/Tag';
import { handleRenderBusinessStars } from '../../../helpers/arrRender';
import { isEqual } from 'lodash-es';
import { renderCorrectUrl } from '../../../helpers/common';

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

const Title = React.memo(({ data }) => {
    return (
        <section className="clearfix paddingAdjustBottom">
            <div className="container">
                <div className="row">
                    <div className="listingTitleArea">
                        <div className="col-sm-12 col-m-12 col-xs-12 no-float">
                            <h2>{data.listingTitle || data.name}</h2>
                            {data.slogan && <p>{data.slogan}</p>}
                        </div>
                        <div className="col-sm-12">
                            <div className="ui middle aligned list business-profile-tag">
                                {data.categories
                                    .filter((item) => item.parent === null)
                                    .map((item) => (
                                        <Tag
                                            key={item.name}
                                            icon={
                                                item.icon ||
                                                'circular outline logo-color icon-wrench'
                                            }
                                            text={item.name}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="col-sm-4 col-m-4 col-xs-12">
                            <div className="listingReview">
                                <ul className="list-inline rating">
                                    {handleRenderBusinessStars(4)}
                                </ul>
                                {/* <span>( 5 Reviews )</span> */}
                            </div>
                        </div>
                        <div className="col-sm-4 col-m-4 col-xs-12">
                            <div className="listingReview">
                                <i className="fa fa-phone" aria-hidden="true" />
                                &nbsp;
                                <a href={`tel:${data.contactNumber}`}>{data.contactNumber}</a>
                                {data.phoneNumber ? (
                                    <a href={`tel:${data.phoneNumber}`}>, {data.phoneNumber}</a>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        {data.website && (
                            <div className="col-sm-4 col-m-4 col-xs-12">
                                <div className="listingReview">
                                    <i className="fa fa-globe" aria-hidden="true" />
                                    &nbsp;
                                    <a target="_blank" href={renderCorrectUrl(data.website)}>
                                        {data.website}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}, areEqual);

export default Title;
