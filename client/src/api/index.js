/* RESTful style APIs */
const HttpManager = {
    login_url: '/api/login',
    signup_url: '/api/signup',

    memberProfile_url: '/member/profiles',
    activeMember_url: '/member/active',
    inactiveMember_url: '/member/inactive',

    staffProfile_url: '/staff/profiles',
    activeStaff_url: '/staff/active',
    inactiveStaff_url: '/staff/inactive',

    memberEmail_url: '/member/emails',
    memberCard_url: '/member/cards',
    memberPassword_url: '/member/password',
    membershipRecord_url: '/membership/record',
    membershipFee_url: '/fee',
}

export {HttpManager}
