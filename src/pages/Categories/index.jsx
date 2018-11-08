import React, { Component } from 'react';

import SearchZone from '../../components/SearchZone';
import FilterTag from '../Explore/ItemList/TagFilter';
import Item from './Item';
import Masonry from 'react-masonry-component';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

class Categories extends Component {
    render() {
        const { categories, dispatch, search } = this.props;
        return (
            <React.Fragment>
                <SearchZone />
                <section className="clearfix allBusiness">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-xs-12" style={{ float: 'none' }}>
                                <FilterTag />
                            </div>
                            <Masonry>
                                {categories.map((item) => (
                                    <Item
                                        key={item.id}
                                        item={item}
                                        dispatch={dispatch}
                                        search={search}
                                    />
                                ))}
                            </Masonry>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.dropdown.categoryWithChildren,
    search: state.explore.search
});

export default connect(mapStateToProps)(
    reduxForm({
        form: 'categories'
    })(Categories)
);
