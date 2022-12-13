import {user_role} from '../../utils';
import {Navigate} from 'react-router-dom'

function MembershipAdminAuth({children}) {
    if (user_role === 'Membership Admin') {
        return <>{children}</>
    } else {
        return <Navigate to="/" replace/>
    }
}

export {MembershipAdminAuth}
