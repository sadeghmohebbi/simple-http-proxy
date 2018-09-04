const http = require('http')
const ProxyChain = require('proxy-chain');

const requestHandler = (request, response) => {
    response.end('Hello Node.js Http Proxy Server!')
}

const server = http.createServer(requestHandler)

server.listen(8080, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
})

const server = new ProxyChain.Server({
    port: 8000,
    verbose: false,
    prepareRequestFunction: ({ request, username, password, hostname, port, isHttp }) => {
        return {
                requestAuthentication: username !== 'sadeghmohebbi' || password !== '123456789'
        };
    },
})

server.listen(() => {
    console.log(`Proxy server is listening on port ${8000}`);
})
