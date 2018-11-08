import React from 'react';

import Area from './Area';
import Category from './Category';
import Find from './Find';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

const SearchArea = ({ areaArr, savedArea, category, savedCategory, search, dispatch }) => {
    return (
        <section className="clearfix searchArea banerInfo searchAreaGray">
            <form>
                <div className="container">
                    <div className="row">
                        <Find search={search} dispatch={dispatch} />
                        <Field
                            category={category}
                            savedValue={savedCategory}
                            name="category"
                            component={Category}
                        />
                        <Field
                            areaArr={areaArr}
                            savedValue={savedArea}
                            name="area"
                            component={Area}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

const mapStateToProps = (state) => ({
    areaArr: state.dropdown.area,
    savedArea: state.explore.search.area,
    category: state.dropdown.category,
    savedCategory: state.explore.search.category,
    search: state.explore.search.search
});

export default connect(mapStateToProps)(reduxForm({ form: 'explore' })(SearchArea));
