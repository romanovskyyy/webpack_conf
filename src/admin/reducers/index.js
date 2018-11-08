import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//ducks
import main from '../ducks/main';
import signin from '../ducks/signin';
import businessCenter from '../ducks/businessCenter';
import businessProfile from '../ducks/businessProfile';

export default combineReducers({
    main,
    signin,
    businessCenter,
    businessProfile,
    form: formReducer
});
