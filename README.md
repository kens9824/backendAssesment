
# Spam Detection API
 Overview
This project implements a REST API for a spam detection and user search service, similar to popular apps that identify spam phone numbers and allow users to search for people by name or phone number. The API is built using Node.js and TypeORM for ORM functionality, with a relational database as the backend.

add .env file in root folder of project 

DATABASE_TYPE=mysql    
DATABASE_HOST=sql12.freesqldatabase.com  
DATABASE_USERNAME=sql12711851  
DATABASE_PASSWORD=2BG1Uek2jx  
DATABASE_NAME=sql12711851  
TOKEN_SECRET=123456789  
REFRESH_TOKEN_SECRET=wqwertyuiop  
PORT=3000  

Setup and Installation
*Prerequisites*
1. Node.js
2. TypeORM
3. MySQL

first run below command 

npm install 

for run as Development  
 you need to run *npm run watch* in terminal and another terminal you need to run *npm run dev*  

for run as Production  
 you need to run *npm run build* in terminal after completing previous command you need to run *npm run start*  

for Sample Data 
you need to call baseUrl + /getAll api by which you can get all table data 
