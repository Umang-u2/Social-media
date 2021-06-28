# Social-media
A Social media App to register and login Users to the website and create, delete and update posts using Node.JS, Express.JS and MongoDb

#Tools used:
Node.Js
Express.JS
MongoDB

#NPM Packages used:
bcrypt: To generate hashed passwords
express: framework for node for routing web pages 
mongoose: To connect to MongoDB
dotenv: to Access .env file which contains secret properties like mongo URL, Secret keys
helmet: to secure the express app by setting various HTTP requests
jsonwebtoken: to create access token to secure user sign ins
morgan: to provide logs for the HTTP requests made on the app
nodemon: to automatically restart the application when app files are updated
multer: used for uploading images as profile picture while user sign up
fs: file system management to provide path for the uploaded image

#Future Enhancements
The functionality to friend or unfriend another user.
The functionality to like a post and check the number of like for a given post.
Sentiment Analysis to process the recent posts of a particular user and provide daily quotes based on the mood of the user on a particular day/week.
