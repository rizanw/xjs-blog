# ExpressJs-blog-CMS

> This repository is a free to use!

### ChangeLog
> 2021/02/12   
- initial blog based on [my expressjs boilerplate](https://github.com/rizanw/restful-js-boilerplate)

## Getting Started:

1. Install the packages  
   `yarn install`  
    or  
   `npm install`
2. Setup the env  
   copy `.env.sample` as `.env` then config the variable
3. Lit it up!  
   `yarn start`  
    or  
   `npm start`

## Structure

    │ 
    ├── index.js                 - ExpressJS application instance
    ├── src
    │    ├── config              - any configs and variables.
    │    ├── controllers         - application logic related stuff
    │    ├── db                  - db related stuff
    │    ├── middlewares         - middle service related stuff
    │    ├── models              - models, scheme, data logic related stuff
    │    └── routes              - web related stuff and handle routes
    └── .env                     - environtment variables.

## Tech Stacks: (furthermore read [package.json](package.json))

- ExpressJS `just an amazing backend framework for Node.js`
- morgan `to add some logging capabilities to your Express API.`
- helmet `to secure Express APIs by defining various HTTP headers.`
- cors `to configure Express to add headers stating that your API accepts requests coming from other origins.`
- body-parser `to convert the body of incoming requests into JavaScript objects.`
- dotenv `to store configuration in the environment.`
- mongoose `an ODM library to make working with MongoDB easier.`
