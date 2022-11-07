import {token} from '../utils';
import {Navigate} from 'react-router-dom'


// <AuthComponent> <Layout/> </AuthComponent>
// Login：<><Layout/></>
// Not login：<Navigate to="/login" replace />
function AuthComponent({children}){
    if (token){
        return <>{children}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}

export {AuthComponent}
