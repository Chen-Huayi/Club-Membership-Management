const username='azurecosmos-chuaii12138'
const password='cyJyCwfbIfxK1JDLIcfaNn9AUoTIuf75Gd28qh5Ul4wpUMOd3MucY5z55pugfnnC52bv2xwKDsa3ACDbXBWw4Q=='
const host='azurecosmos-chuaii12138.mongo.cosmos.azure.com'
const port=10255
const db_name='club'
const config='ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@azurecosmos-chuaii12138@'

const DB_URL=`mongodb://${username}:${password}@${host}:${port}/${db_name}?${config}`

const admin= {
    staff_id: 'sys-admin',
    user_role: 'System Admin',
    firstname: '[firstname]',
    lastname: '[lastname]',
    email: '666666@qq.com',
    phone: '204-666-6666',
    password: '000000',
    membership_status: true
}

module.exports = {
    jwtSecretKey: 'sa_nv_nei_78',
    expiresIn: '1h',
    PORT: 8000,
    // url: 'mongodb://localhost:27017/club_member',
    url: DB_URL,
    admin,
    company: 'green_space_club',
    fee: 648
}
