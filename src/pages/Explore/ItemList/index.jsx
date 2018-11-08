import React from 'react';
import './style.scss';

import TagFilter from './TagFilter';
import Item from './Item';
import ExploreMap from '../../../components/Map/ExploreMap';
import Pagination from '../../../components/Pagination';

import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { changePage } from '../../../ducks/explore';

const ItemList = ({ dispatch, result, userLoc }) => {
    return (
        <section className="clerfix list-section">
            <div className="container">
                <div className="row ">
                    <div className="col-sm-6 col-xs-12 height">
                        <TagFilter />
                        {result && result.business.length ? (
                            <React.Fragment>
                                <div className="row_custom">
                                    {result.business.map((item) => (
                                        <Item
                                            key={Math.random() + item.listingTitle}
                                            img={
                                                item.files && item.files.length
                                                    ? item.files[0].storageUrl
                                                    : '/img/business.jpg'
                                            }
                                            loc={`${item.area.name}, ${item.city.name}`}
                                            rate={Math.ceil(Math.random() * 5)}
                                            category={item.categories}
                                            listingTitle={item.listingTitle}
                                            linkId={item.linkId}
                                            geoLoc={item.geoLocation}
                                            dispatch={dispatch}
                                            userLoc={userLoc}
                                        />
                                    ))}
                                </div>
                                {result &&
                                    result.pages > 1 && (
                                        <Pagination
                                            result={result}
                                            customClassName="categoryPagination"
                                            scrollEl=".row_custom"
                                            change={(selectedPage) =>
                                                dispatch(changePage(selectedPage + 1))
                                            }
                                        />
                                    )}
                            </React.Fragment>
                        ) : (
                            'Nothing was found'
                        )}
                    </div>
                    <div className="col-sm-6 hidden-xs sticky map-margin-btm">
                        <div className="clearfix map-sidebar map-right">
                            <ExploreMap height="100vh" business={result.business} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(reduxForm({ form: 'categoryList' })(ItemList));
