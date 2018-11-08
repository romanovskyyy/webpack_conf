import React from 'react';

import Map from '../../../../components/Map/BusinessProfileMap';
import OpenHours from './OpenHours';

import { Link } from 'react-router-dom';
import { renderCorrectUrl } from '../../../../helpers/common';

const Details = ({
    data: {
        geoLocation,
        area,
        city,
        email,
        facebookUrl,
        twitterUrl,
        instagramUrl,
        snapchatUrl,
        openingHours
    },
    linkId
}) => {
    return (
        <div className="col-sm-4 col-xs-12">
            <div className="clearfix map-sidebar map-right">
                <Map loc={geoLocation} />
            </div>
            <div className="location-details">
                <div className="location">
                    <div className="description">
                        <i className="fa fa-map-marker" aria-hidden="true" />
                        &nbsp;
                        {`${area.name}, ${city.name}, UAE`}
                    </div>
                </div>
                {/* <div className="word-location">
                    <div className="description">
                        <img src="img/what3words.png" alt="What3Word" />{' '}
                        <strong>what3words address:</strong>
                        <span>
                            <a href="#" target="_blank">
                                paint.color.style
                            </a>
                        </span>
                    </div>
                </div> */}
                <div className="email">
                    <div className="description">
                        <i className="fa fa-envelope" aria-hidden="true" />
                        &nbsp;
                        <a href={`mailto:${email}`}>{email}</a>
                    </div>
                </div>
                <div className="searfi-link">
                    <div className="description">
                        <i className="fa fa-link" aria-hidden="true" />
                        &nbsp;
                        <Link target="_blank" to={`/${linkId}`}>
                            {`${process.env.CLIENT_URL}/${linkId}`}
                        </Link>
                    </div>
                </div>
                <div className="media-icons">
                    {facebookUrl && (
                        <a target="_blank" href={renderCorrectUrl(facebookUrl)}>
                            <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                    )}
                    {twitterUrl && (
                        <a target="_blank" href={renderCorrectUrl(twitterUrl)}>
                            <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                    )}

                    {instagramUrl && (
                        <a target="_blank" href={renderCorrectUrl(instagramUrl)}>
                            <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                    )}
                    {snapchatUrl && (
                        <a target="_blank" href={renderCorrectUrl(snapchatUrl)}>
                            <i className="fa fa-snapchat-ghost" aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>
            {openingHours && <OpenHours hours={openingHours} />}
        </div>
    );
};

export default Details;
