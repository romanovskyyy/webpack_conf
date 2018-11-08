import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

//ducks
import auth from '../ducks/auth';
import explore from '../ducks/explore';
import editUser from '../ducks/editUser';
import addBusiness from '../ducks/addBusiness';
import businessProfile from '../ducks/businessProfile';
import dropdown from '../ducks/dropdown';
import mapRouting from '../ducks/mapRouting';
import businessCenter from '../ducks/businessCenter';
import files from '../ducks/files';

export default combineReducers({
    auth,
    explore,
    editUser,
    mapRouting,
    dropdown,
    businessProfile,
    addBusiness,
    businessCenter,
    files,
    form: formReducer
});
