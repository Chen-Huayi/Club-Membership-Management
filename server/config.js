require('dotenv').config()
const bcrypt = require('bcryptjs')


module.exports = {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.EXPIRESIN,
    port: process.env.PORT,
    databaseURL: process.env.DB_URL,
    company: process.env.COMPANY,
    fee: process.env.FEE,
    sysAdmin: {
        staff_id: 'sysAdmin',
        user_role: 'System Admin',
        firstname: 'firstname',
        lastname: 'lastname',
        email: '666666@qq.com',
        phone: '2046666666',
        password: bcrypt.hashSync('000000', 10),
        membership_status: true
    }
}
