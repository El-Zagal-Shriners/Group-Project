const accountsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ACCOUNTS':
            return action.payload;
        default:
                return state;
    }
}

export default accountsReducer;