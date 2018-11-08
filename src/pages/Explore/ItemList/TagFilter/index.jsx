import React, { Component } from 'react';
import withDropdown from '../../../../hoc/Dropdown';
import TagFilter from '../../../../components/TagFilter';

import { connect } from 'react-redux';
import { changeTag } from '../../../../ducks/explore';
import { Field } from 'redux-form';

class Dropdown extends Component {
    render() {
        const { tags, savedTags } = this.props;
        return (
            <div className="resultBar">
                <Field
                    name="tags"
                    component={TagFilter}
                    placeholder="Filter"
                    className="filter2"
                    tags={tags}
                    savedValue={savedTags || []}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tags: state.dropdown.allTags,
    savedTags: state.explore.search.tag
});

export default connect(mapStateToProps)(
    withDropdown({
        clearable: false,
        className: '.ui.dropdown.filter2',
        change: (value) => (dispatch) => dispatch(changeTag(value.split(',')))
    })(Dropdown)
);
