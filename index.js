// code away!
const server = require('./server');
const port = 3200;

server.listen(port, () => {
    console.log(`* Server Running on http://localhost:${port} *`);
});

