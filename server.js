const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const cors = require('cors');

const postsRouter = require('./routers/posts-router');
const usersRouter = require('./routers/users-router');

const server = express();
server.use(cors());
server.use(helmet());
// global middleware
function checkForCapital(req, res, next) {
    if((req.method === "POST" || req.method === "PUT") && req.body.name){
        req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    }
    next();
}

function teamNamer(req, res, next) {
    req.team = 'Web XVII'; // middleware can modify the request
    next(); // go ahead and execute the next middleware/route handler
}

server.use(express.json()); // built-in, no need to yarn add

// routing
server.use('/posts', postsRouter);
server.use('/users', checkForCapital, usersRouter);

// route handlers ARE middleware
server.get('/', restricted, (req, res) => {
    res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

function restricted(req, res, next) {
    const password = req.headers.password;
    
    if (password === 'mellon') {
        next();
    } else {
        res.status(401).send('You shall not pass Balrog!');
    }
}

module.exports = server;
