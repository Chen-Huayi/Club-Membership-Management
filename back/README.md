# Backend Environment
### Framework
Node.js (Express)
+ Dependencies:
  + bcryptjs: ^2.4.3
  + body-parser: ^1.20.1
  + cors: ^2.8.5
  + express: ^4.18.2
  + joi: ^17.7.0
  + jsonwebtoken: ^8.5.1
  + mongoose: ^6.7.1
### Run
```shell
npm install
npm run server
```
### Configuration
In `config.js` file:
+ jwtSecretKey *( JSON web token secret key )*
+ expiresIn *( token expire time duration )*
+ PORT *( must be the same with frontend PORT, default 8000 )*
+ dbServer *( the url to connect to mongodb database )*
+ sysAdmin *( default system admin staff )*
+ company *( company name )*
+ membership_fee *( default annual fee )*
