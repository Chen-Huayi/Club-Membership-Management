import {user_role} from '../../utils';
import {Navigate} from 'react-router-dom'

function MemberAuth({children}){
    if (user_role==='Club Member'){
        return <>{children}</>
    }else {
        return <Navigate to="/" replace/>
    }
}

export {MemberAuth}
