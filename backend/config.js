const db_url='mongodb://azurecosmos-chuaii12138:cyJyCwfbIfxK1JDLIcfaNn9AUoTIuf75Gd28qh5Ul4wpUMOd3MucY5z55pugfnnC52bv2xwKDsa3ACDbXBWw4Q==@azurecosmos-chuaii12138.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@azurecosmos-chuaii12138@'
const sysAdmin= {
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
    // dbServer: 'mongodb://localhost:27017/club_member',
    dbServer: db_url,
    PORT: 8000,
    sysAdmin,
    company: 'green_space_club',
    membership_fee: 648
}
