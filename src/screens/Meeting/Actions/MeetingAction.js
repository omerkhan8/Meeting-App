const requestedUser = (rUser) => {
    return {
        type: 'REQUESTED_USER',
        rUser
    }
}

export { requestedUser }