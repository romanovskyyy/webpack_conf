import React, { Component } from 'react';
import './style.scss';

import ReactPaginate from 'react-paginate';

class Pagination extends Component {
    handlePageClick = ({ selected }) => {
        const { result, scrollEl, change } = this.props;
        const el = document.querySelector(scrollEl);

        if (result.page - 1 !== selected) {
            el.scrollIntoView(true);
        }
        change(selected);
    };

    render() {
        const { result, customClassName } = this.props;
        return (
            <div className={`paginationCommon blogPagination ${customClassName}`}>
                <ReactPaginate
                    pageCount={result.pages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    containerClassName="pagination"
                    previousLabel={<i className="fa fa-angle-left" />}
                    nextLabel={<i className="fa fa-angle-right" />}
                    activeClassName="active"
                    onPageChange={this.handlePageClick}
                    initialPage={result.page - 1}
                    forcePage={result.page - 1}
                />
            </div>
        );
    }
}

export default Pagination;
