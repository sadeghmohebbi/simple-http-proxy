const http = require('http')
const ProxyChain = require('proxy-chain');

const requestHandler = (request, response) => {
    response.end('Hello Node.js Http Proxy Server!')
}

const http_server = http.createServer(requestHandler)

http_server.listen(8080, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Http server is listening on port ${8080}`);
})

const proxy_server = new ProxyChain.Server({
    port: 8000,
    verbose: false,
    prepareRequestFunction: ({ request, username, password, hostname, port, isHttp }) => {
        return {
                requestAuthentication: username !== 'sadeghmohebbi' || password !== '123456789'
        };
    },
})

proxy_server.listen(() => {
    console.log(`Proxy server is listening on port ${8000}`);
})
