const saveTokenMiddleware = store => next => action => {
    switch(action.type){
        case 'login/fulfilled':
            localStorage.setItem('ACCESS_TOKEN', action.payload.accessToken)
            break
        default:
            break
    }
    return next(action)
}

export default saveTokenMiddleware