import React from 'react';
import Children from './Children';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';
import { changeCategory } from '../../../ducks/explore';

const Item = ({ item: { name, children, id }, history: { push }, dispatch, search }) => {
    const handleCategoryClick = (e, id, item) => {
        e.persist();
        e.stopPropagation();
        if (e.target.className === 'header') {
            const updItem = { value: item.id, label: item.name };
            sessionStorage.setItem('childrenCat', JSON.stringify(updItem));
        }
        let updSearch = { ...search, category: id };
        let searchQuery = queryString.stringify(updSearch, { arrayFormat: 'none' });
        dispatch(changeCategory(id));
        push(`/explore/${searchQuery}`);
    };
    return (
        <div className="col-sm-4 col-xs-12 itemTest">
            <div className="ui card link">
                <div className="content">
                    <div
                        className="left floated author"
                        onClick={(e) => handleCategoryClick(e, id)}
                    >
                        <i className="circular large inverted logo-color icon-painting icon" />
                        <span>{name}</span>
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui middle aligned animated list">
                        {children.map((item) => (
                            <Children
                                key={item.id}
                                item={item}
                                click={(e) => handleCategoryClick(e, item.id, item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Item);
