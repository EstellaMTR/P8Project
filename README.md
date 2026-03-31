# To run backend:
    First, cd into "backend" folder.
### Powershell: 
    .\mvnw.cmd spring-boot:run

### Command Prompt:
    mvnw.cmd spring-boot:run    

### Bash (macbook)
    ./mvnw spring-boot:run

##### If having permission problems on Mac, try:
    chmod +x mvnw

    Then

    ./mvnw spring-boot:run

## Swagger:
http://localhost:8080/swagger-ui/index.html#/
This allows you to see the current endpoints and call them (like Postman)

## Database:
The database is a single SQLite file. It is called database.db and is located in the root of the backend folder.
You can view it using DB browser. If the database.db file is not there, then run the backend first.
When we make a change to our entities, we should delete the database.db file, then run the backend again, so that it generates the database.db file again, with the updated schema

# To run Frontend
- cd to "frontend"
- First, run "npm install" to install all node packages 
- The run "npm run dev" to run the frontend

# Dependencies:
### Backend:
java version 25 or older
### Frontend:
node.js

# Openapi
How to call the backend from the frontend:

cd into "openapi" folder
Call command "npm run generate"
    - This generates a http client that makes it easier to call the backend from the frontend

# DTO's
How DTO's work:
Frontend (JSON)
      ↓
DTO (GoalRequest)
      ↓
Entity (Goal)
      ↓
Database