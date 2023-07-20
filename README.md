# JWT-Authentication-Backend
Authentication and Authorization with JWT.


//Features.
JWT-based authentication with the jsonwebtoken library.
MongoDB's ODM library, mongoose.
bcrypt library to hash and later comapare passwords.
validator library to check the email format passed by the user.
middleware used with specfic routes to authorize access.
cookie-parser library to set and get cookies.


// Configuration.
Run npm init -y to install all dependencies used. Make sure you have node installed beforehand.
Open a .env file and set your database connection and JWT secret key.

// Usage.
Testing done with Postman.

//Security Considerations.
hashing passwords before saving to database.
using HTTPS.
verifying jwt before granting access after logging in/signing up.
giving the cookies which store the token's an expiry date.


