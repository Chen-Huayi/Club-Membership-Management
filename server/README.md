# Backend Environment
### Framework
Node.js (Express)  
+ Version: 18.12.1
+ Dependencies:
  + @escook/express-joi: ^1.1.1
  + bcryptjs: ^2.4.3
  + body-parser: ^1.20.1
  + cors: ^2.8.5
  + dotenv: ^16.0.3
  + express: ^4.18.2
  + express-jwt: ^7.7.7
  + joi: ^17.7.0
  + jsonwebtoken: ^8.5.1
  + mongoose: ^6.7.1
### Run
```shell
npm install
npm start
```
### Configuration
In `config.js` file:
+ jwtSecretKey ( *JSON web token secret key* )
+ expiresIn ( *token expire time duration* )
+ port ( *must be the same with frontend port, default `12138`* )
+ databaseURL ( *the url to connect to mongodb database* )
+ company ( *company name* )
+ fee ( *default annual membership fee* )
+ sysAdmin ( *default system admin staff, **staff_id**: `sysAdmin`, **password**: `000000`* )

### Cloud Database (Azure Cosmos DB)
MongoDB database URL should be like this:
```
const username=example
const password=example
const host=example
const port=example
const db_name=example
const config=example
const databaseURL=`mongodb://${username}:${password}@${host}:${port}/${db_name}?${config}`
```
