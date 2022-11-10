import {token} from '../../utils';
import {Navigate} from 'react-router-dom'


// <LoggedAuth> <Layout/> </LoggedAuth>
// Login：<><Layout/></>
// Not login：<Navigate to="/login" replace />
function LoggedAuth({children}){
    if (token){
        return <>{children}</>
    }else {
        return <Navigate to="/login" replace/>
    }
}

export {LoggedAuth}
