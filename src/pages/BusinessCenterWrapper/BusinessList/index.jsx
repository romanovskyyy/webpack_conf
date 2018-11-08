import React, { Component } from 'react';

import BusinessItem from './BusinessItem';
import Pagination from '../../../components/Pagination';
import Preloader from '../../../components/UI/Preloader';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBusinessList, RESET } from '../../../ducks/businessCenter';

class BusinessList extends Component {
    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(getBusinessList());
    };

    componentWillUnmount = () => {
        const { dispatch } = this.props;
        dispatch({ type: RESET });
    };

    render() {
        const { dispatch, businessList } = this.props;

        if (!businessList) {
            return <Preloader />;
        }
        return (
            <section className="clearfix bg-dark businessesSection">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="table-responsive" data-pattern="priority-columns">
                                <table className="table listingsTable">
                                    <thead>
                                        <tr className="rowItem">
                                            <th data-priority="">Businesses</th>
                                            <th data-priority="6">Views</th>
                                            <th data-priority="2">Reviews</th>
                                            <th data-priority="3">Posted on</th>
                                            <th data-priority="4">Action Date</th>
                                            <th data-priority="5">Status</th>
                                            <th data-priority="1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {businessList.businesses.length > 0 ? (
                                            businessList.businesses.map((business) => (
                                                <BusinessItem
                                                    key={business.id}
                                                    business={business}
                                                />
                                            ))
                                        ) : (
                                            <tr className="rowItem">
                                                <td>
                                                    <span>
                                                        You have no businesses right now, you can
                                                        add one by clicking{' '}
                                                        <Link to="/add-business">here</Link>
                                                    </span>
                                                </td>
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                                <td />
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {businessList.pages > 1 && (
                                <Pagination
                                    result={businessList}
                                    customClassName="text-center"
                                    scrollEl=".listingsTable"
                                    change={(selectedPage) =>
                                        dispatch(getBusinessList(selectedPage + 1))
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    businessList: state.businessCenter.businessList
});

export default connect(mapStateToProps)(BusinessList);
