# Binar: Express.js

This project is about implemetation of Design Pattern with Service Repository, Authentication with JWT Token and API documentation with standarized Open API which used Swagger UI.

## Database Diagram

![ERD](https://user-images.githubusercontent.com/72052154/236868467-8ed8f722-bfbb-49c2-a668-a48c3bff1d66.png)
## Accessing API Documentation
http://{{host}}/api-docs/

## Library
1. cloudinary
2. cookie-parser
3. cors
4. dotenv
5. ejs
6. express
7. multer
8. nodemon
9. pg
10. sequelize
11. uuid
12. bycript
13. jsonwebtoken
14. sequelize-cli
15. swagger-ui-express

## How To Run

1. Install Library

```bash
npm i
```

2. Create an .env file on root folder

```bash
DB_USERNAME = ''
DB_PASSWORD = ''
DB_NAME = ''
DB_HOST = ''
DB_PORT =
DB_DIALECT = 'postgres'

CLOUD_NAME = ''
API_KEY = ''
API_SECRET = ''
CLODINARY_SECURE = true

JWT_SIGNATURE_KEY = "rahasia"
```

3. Create Database

```bash
npm run db:create
```

4. Migrating the model

```bash
npm run db:migrate
```

5. Using seeder

```bash
npm run db:seed
```

6. Running Project on development

```bash
npm run develop
```


### Email: superadmin@gmail.com

### Password: superadmin123
