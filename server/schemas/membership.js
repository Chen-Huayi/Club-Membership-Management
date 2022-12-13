const {user_id, range} = require('./user')


exports.membership_schema = {
    body: {
        member_id: user_id,
        approved_by: user_id,
    }
}

exports.time_range_schema = {
    params: {
        range,
    }
}
