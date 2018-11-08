import React from 'react';
import './style.scss';

import moment from 'moment';

// import { handleRenderBusinessStars } from '../../../../helpers/arrRender';
import { Link } from 'react-router-dom';
// import { renderTrue } from '../../../../helpers/common';

const findParentCategory = (categories) =>
    categories.filter((item) => item.parent === null).map((item) => (
        <span key={item.id} className="category">
            {item.name}
        </span>
    ));

const statusRender = (status) => {
    switch (status) {
        case 'ACTIVE':
            return <span className="label label-success">Active</span>;
        case 'CANCELED':
            return <span className="label label-danger">Canceled</span>;
        case 'PENDING':
            return <span className="label label-warning">Pending</span>;
    }
};
const BusinessItem = ({
    business: {
        listingTitle,
        files,
        buildingNumber,
        streetNumber,
        streetName,
        city,
        categories,
        visits,
        created,
        status,
        linkId,
        buildingName,
        streetType,
        area
    }
}) => {
    return (
        <tr className="rowItem">
            <td>
                <ul className="list-inline listingsInfo">
                    <li>
                        <Link to={`/${linkId}`} className="listingsInfo-img">
                            <img
                                src={
                                    (files && files.length && files[0].storageUrl) ||
                                    '/img/business.jpg'
                                }
                                alt="Image Listings"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${linkId}`}>
                            <h3>{listingTitle}</h3>
                        </Link>
                        <h5>
                            {/* {`${renderTrue(buildingNumber)} ${renderTrue(
                                buildingName
                            )} ${renderTrue(streetNumber)} ${renderTrue(streetName)} ${renderTrue(
                                streetType
                            )}`} */}
                            &nbsp;
                            <span className="cityName">
                                {area.name} {city.name}
                            </span>
                        </h5>
                        {findParentCategory(categories)}
                    </li>
                </ul>
            </td>
            <td>{visits}</td>
            <td>
                <ul className="list-inline rating">
                    {/* {handleRenderBusinessStars(4)} */}
                    {/* <li>(7)</li> */}
                </ul>
            </td>
            <td width="90px">
                {moment(created).format('DD/MM/YYYY')}
                <br />
                {moment(created).format('h.mm a')}
            </td>
            <td>{/* Today <br />
                11.00am */}</td>
            <td>{statusRender(status)}</td>
            <td width="90px" className="action-column">
                <Link to={`/business-center/${linkId}`} className="action-btn">
                    <i className="fa fa-pencil" aria-hidden="true" />
                    Edit Business
                </Link>
                <Link to="#" className="action-btn" disabled>
                    <i className="fa fa-plus" aria-hidden="true" />
                    Add Branch
                </Link>
            </td>
        </tr>
    );
};

export default BusinessItem;
