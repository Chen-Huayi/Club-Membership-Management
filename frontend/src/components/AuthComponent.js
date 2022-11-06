import {getToken} from '../utils';
import {Navigate} from 'react-router-dom'


// <AuthComponent> <Layout/> </AuthComponent>
// Login：<><Layout/></>
// Not login：<Navigate to="/login" replace />
function AuthComponent({children}){
    const isToken=getToken()
    if (isToken){
        return <>{children}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}

export {AuthComponent}
