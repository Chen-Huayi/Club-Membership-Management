import {token} from '../../utils';
import {Navigate} from 'react-router-dom'


// <LoginAuth> <Layout/> </LoginAuth>
// Login：<><Layout/></>
// Not login：<Navigate to="/login" replace />
function LoginAuth({children}){
    if (token){
        return <>{children}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}

export {LoginAuth}
