import {user_role} from '../../utils';
import {Navigate} from 'react-router-dom'

function SystemAdminAuth({children}) {
    if (user_role === 'System Admin') {
        return <>{children}</>
    } else {
        return <Navigate to="/" replace/>
    }
}

export {SystemAdminAuth}
