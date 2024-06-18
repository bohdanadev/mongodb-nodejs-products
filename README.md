### MONGODB-NODEJS-PRODUCTS
This project is a full-stack web application that provides a simple API for managing products in a shop. The API is built with MongoDB, Express.js, and Mongoose on the backend, and the frontend is built with React, using Axios for making HTTP requests.

## Features  
* User Authentication: Users can sign up, sign in, and logout.  
* Product Management: Users can get a list of products, add new products, edit existing products, and delete products.  
* Detailed Product Information: Users can view detailed information about each product.  

## Technologies Used  
**MongoDB**: A NoSQL database used to store product and user data.  
**Express.js**: A web application framework for Node.js used to build the API.  
**Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js used to model application data.  
**React**: A JavaScript library for building user interfaces.   
**Axios**: A promise-based HTTP client for making requests from the frontend to the backend API.  

## Installation  
1. Clone the repository:  
```bash
git clone https://github.com/bohdanadev/mongodb-nodejs-products.git
```
2. Install dependencies:
```bash
cd mongodb-nodejs-products
npm install
```
3. Set up environment variables:  

Create .env file in the root of the project.  
Add the following variables to the .env file:  
```.env
MONGO_URL=
PORT=
HOST=
JWT_SECRET=
JWT_EXP=
SALT=
```  
4. Start the backend server:  
```bash
npm run start:server
```  

5. Open new terminal and start the frontend development server:  
```bash  
npm start
```  

## API Endpoints
POST **/signup**: Register a new user.
POST **/auth**: Sign in an existing user.
POST **/logout**: Logout the current user.
GET **/products**: Get a list of all products.
POST **/products/add**: Add a new product.
GET **/products/:id**: Get detailed information about a specific product.
PUT **/products/:id/edit**: Update an existing product.
DELETE **/products/:id**: Delete a product.