import React, { Component } from 'react';

import Dropdown from './Dropdown';
import queryString from 'query-string';
import TopCategory from './TopCategory';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeMainSearch } from '../../../ducks/explore';
import { noPercent } from '../../../helpers/normalize';

class Banner extends Component {
    handleRedirectToExplore = (e, item) => {
        e.preventDefault();
        let { search, history } = this.props;

        if (item && item.id) {
            if (item.parent) {
                const updItem = { value: item.id, label: item.name };
                sessionStorage.setItem('childrenCat', JSON.stringify(updItem));
            }
            search.category = item.id;
        }

        const searchQuery = queryString.stringify(search, { arrayFormat: 'none' });

        history.push(`/explore/${searchQuery}`);
    };

    render() {
        const { dispatch, search, categoryByRating } = this.props;
        return (
            <section className="clearfix homeBanner">
                <div className="background-holder">
                    <video autoPlay="autoplay" loop="loop" muted="muted" playsInline="playsInline">
                        <source src="video/home-hero-quicktime.mov" type="video/webm" />
                        <source src="video/home-hero.mp4" type="video/mp4" />
                        <source src="video/home-hero-quicktime.mov" type="video/ogv" />
                    </video>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="banerInfo">
                                <h1>Search. Find. Share</h1>
                                <p>Searfi helps to find the needle in the haystack</p>
                                <form
                                    className="form-inline"
                                    onSubmit={this.handleRedirectToExplore}
                                >
                                    <div className="form-group">
                                        <div className="ui form input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="What are you looking for?"
                                                style={{ fontFamily: 'Hanken', height: '50px' }}
                                                value={search.search}
                                                onChange={(e) =>
                                                    dispatch(
                                                        changeMainSearch(noPercent(e.target.value))
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <Dropdown />
                                    <button type="submit" className="btn btn-primary">
                                        Search <i className="fa fa-search" aria-hidden="true" />
                                    </button>
                                </form>
                                <div className="top-categories">
                                    {categoryByRating.map((category) => (
                                        <TopCategory
                                            key={category.id}
                                            category={category}
                                            click={(e) => this.handleRedirectToExplore(e, category)}
                                        />
                                    ))}
                                    <Link to="/categories" style={{ cursor: 'pointer' }}>
                                        <span className="cat__icon">
                                            <i className="demo-icon icon-dot-3" />
                                        </span>
                                        <span className="cat__text">More</span>
                                    </Link>

                                    <div className="hidden-xs" style={{ position: 'relative' }}>
                                        <span className="cta-text">Or browse the highlights</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ dropdown, explore }) => ({
    search: explore.search,
    categoryByRating: dropdown.categoryByRating
});

export default withRouter(connect(mapStateToProps)(Banner));
