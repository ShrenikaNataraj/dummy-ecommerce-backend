# dummy-ecommerce-backend
E-commerce backend application

Steps to run Application:
1)npm install

2)To Run docker:
    1)create .env
    2)ADD the following variables in .env
        PORT=8000
        NODE_ENV='dev'
        DB_PASSWORD= 'postgres'
        DB_USERNAME='postgres'
        DB_NAME='postgres'

3)Run command : docker compose up -d 

4)Run command :npm run migrate

5)Run command: npm run seed

6)npm run start

7)use the api's on the URL localhost:8000


