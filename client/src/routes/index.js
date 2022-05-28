import config from '../config'

//Layouts 
import Header from '../layouts/Header'

//Pages
import Home from '../pages/Home'
import Login from '../pages/Login'

const publicRoutes = [ 
    {path: config.routes.login, component: Login}
]

const privateRoutes = [
    {path: config.routes.home, component: Home, layout: Header}
]

export {publicRoutes, privateRoutes}