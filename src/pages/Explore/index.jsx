import React, { Component } from 'react';

import SearchZone from '../../components/SearchZone';
import ItemList from './ItemList';
import queryString from 'query-string';
import ErrorBounday from '../../components/ErrorBoundary';

import { connect } from 'react-redux';
import { debounce } from 'lodash-es';
import { asyncSearchDebounced, getSearchValue, resetSearch, changePage } from '../../ducks/explore';
import { moveToTop } from '../../helpers/common';
import { addSubcategoryToCategory } from '../../ducks/dropdown';

class Explore extends Component {
    componentWillMount = () => {
        moveToTop();
    };
    componentDidUpdate = (prevProps) => {
        const { match, dispatch, search } = this.props;
        const shouldUpdPage =
            prevProps.search.area !== search.area ||
            prevProps.search.category !== search.category ||
            prevProps.search.search !== search.search ||
            (prevProps.search.lat !== search.lat && search.page !== 1) ||
            (prevProps.search.lon !== search.lon && search.page !== 1);

        if (shouldUpdPage) {
            search.page = 1;
            dispatch(changePage(1));
        }
        let searchQuery = queryString.stringify(search, { arrayFormat: 'none' });

        if (decodeURI(searchQuery) !== decodeURI(match.params.search)) {
            this.debouncedPush(searchQuery);
            dispatch(asyncSearchDebounced(searchQuery));
        }
    };

    debouncedPush = debounce(
        (searchQuery) => this.props.history.replace(`/explore/${searchQuery}`),
        400
    );

    componentDidMount = () => {
        const { match, dispatch } = this.props;
        const parsedQuery = queryString.parse(match.params.search);

        dispatch(getSearchValue(parsedQuery));
        dispatch(asyncSearchDebounced(match.params.search));

        const childrenCat = JSON.parse(sessionStorage.getItem('childrenCat'));
        if (childrenCat) {
            dispatch(addSubcategoryToCategory(childrenCat));
        }
    };

    componentWillUnmount = () => {
        this.props.dispatch(resetSearch());
    };

    render() {
        const { result, savedTags, userLoc } = this.props;
        return (
            <React.Fragment>
                <SearchZone />
                <ErrorBounday>
                    <ItemList result={result} savedTags={savedTags} userLoc={userLoc} />
                </ErrorBounday>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    search: state.explore.search,
    result: state.explore.result,
    savedTags: state.explore.search.tag,
    userLoc: state.auth.geoLocation
});

export default connect(mapStateToProps)(Explore);
