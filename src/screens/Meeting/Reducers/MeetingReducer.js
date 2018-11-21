const MeetingReducer = (state = {}, action) => {
    switch (action.type) {
        case "REQUESTED_USER": {
            return { ...state, requestedUser: action.rUser }
        }
        default: {
            return state
        }
    }
}

export default MeetingReducer;