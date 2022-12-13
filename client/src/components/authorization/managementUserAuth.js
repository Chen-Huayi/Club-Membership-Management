import {user_role} from '../../utils';
import {Navigate} from 'react-router-dom'

function ManagementUserAuth({children}) {
    if (user_role === 'Club Management User') {
        return <>{children}</>
    } else {
        return <Navigate to="/" replace/>
    }
}

export {ManagementUserAuth}
