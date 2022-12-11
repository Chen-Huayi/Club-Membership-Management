# Backend Environment
### Framework
Node.js (Express)
+ Dependencies:
  + @escook/express-joi: ^1.1.1
  + bcryptjs: ^2.4.3
  + body-parser: ^1.20.1
  + cors: ^2.8.5
  + express: ^4.18.2
  + express-jwt: ^7.7.7,
  + joi: ^17.7.0
  + jsonwebtoken: ^8.5.1
  + mongoose: ^6.7.1
### Run
```shell
npm install
npm run start
```
### Configuration
In `config.js` file:
+ jwtSecretKey *( JSON web token secret key )*
+ expiresIn *( token expire time duration )*
+ PORT *( must be the same with frontend PORT, default `8080` )*
+ url *( the url to connect to mongodb database )*
+ admin *( default system admin staff, **staff_id**: `sysAdmin`, **password**: `000000` )*
+ company *( company name )*
+ fee *( default annual membership fee )*



[//]: # (### azure-cosmos-db)

[//]: # (```)

[//]: # (const username='azurecosmos-chuaii12138')

[//]: # (const password='cyJyCwfbIfxK1JDLIcfaNn9AUoTIuf75Gd28qh5Ul4wpUMOd3MucY5z55pugfnnC52bv2xwKDsa3ACDbXBWw4Q==')

[//]: # (const host='azurecosmos-chuaii12138.mongo.cosmos.azure.com')

[//]: # (const port=10255)

[//]: # (const db_name='club')

[//]: # (const config='ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@azurecosmos-chuaii12138@')

[//]: # (const DB_URL=`mongodb://${username}:${password}@${host}:${port}/${db_name}?${config}`)

[//]: # (```)
