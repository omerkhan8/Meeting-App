const DashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case "SAVE_USER": {
            return { ...state, user: action.user }
        }

        default: {
            return state
        }
    }
}

export default DashboardReducer;