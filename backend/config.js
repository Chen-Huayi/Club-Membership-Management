const db_url='ef297b1b-0ee0-4-231-b9ee:v5RzRacZA9w7VBAIlOaTkgZQkdabLiLy3iAWX1RMr5jq1WEp8N6JROR35MSKmyXddVmfyD3cqTkWTasChDdVYw%3D%3D@ef297b1b-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@ef297b1b-0ee0-4-231-b9ee@'
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
    dbServer: `mongodb://${db_url}`,
    PORT: 8000,
    sysAdmin,
    company: 'green_space_club',
    membership_fee: 648
}
