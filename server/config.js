const bcrypt=require('bcryptjs')
// const DB_URL='mongodb://localhost:27017/club_member'
// const DB_URL=`mongodb://azurecosmos-chuaii12138:cyJyCwfbIfxK1JDLIcfaNn9AUoTIuf75Gd28qh5Ul4wpUMOd3MucY5z55pugfnnC52bv2xwKDsa3ACDbXBWw4Q==@azurecosmos-chuaii12138.mongo.cosmos.azure.com:10255/club?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@azurecosmos-chuaii12138@`
const DB_URL='mongodb+srv://chuaii12138:0131chychy@cluster0.irxke6g.mongodb.net/club'

const admin= {
    staff_id: 'sysAdmin',
    user_role: 'System Admin',
    firstname: 'firstname',
    lastname: 'lastname',
    email: '666666@qq.com',
    phone: '2046666666',
    password: bcrypt.hashSync('000000', 10),
    membership_status: true
}

module.exports = {
    jwtSecretKey: 'sa_nv_nei_78',
    expiresIn: '3h',
    PORT: 8080,
    url: DB_URL,
    admin,
    company: 'green_space_club',
    fee: 648
}
