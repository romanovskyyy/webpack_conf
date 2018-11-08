import React from 'react';

import { changeMainSearch } from '../../../ducks/explore';
import { noPercent } from '../../../helpers/normalize';

const Find = ({ dispatch, search }) => {
    return (
        <div className="col-sm-4 col-xs-12">
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-addon">Find</div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What are you looking for?"
                        onChange={(e) => dispatch(changeMainSearch(noPercent(e.target.value)))}
                        value={search}
                    />

                    <div className="input-group-addon addon-right" />
                </div>
            </div>
        </div>
    );
};

export default Find;
