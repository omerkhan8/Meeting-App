import { combineReducers } from 'redux';
import DashboardReducer from '../screens/Dashboard/Reducers/DashboardReducers';
import MeetingReducer from '../screens/Meeting/Reducers/MeetingReducer';

export default combineReducers({
    DashboardReducer,
    MeetingReducer
})