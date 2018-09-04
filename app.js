const http = require('http')
const ProxyChain = require('proxy-chain');

const requestHandler = (request, response) => {
    response.end('Hello Node.js Http Proxy Server!')
}

const http_server = http.createServer(requestHandler)

let http_port = process.env.PORT || 80;
http_server.listen(http_port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Http server is listening on port ${http_port}`);
})

let proxy_port = process.env.PORT || 8000;
const proxy_server = new ProxyChain.Server({
    port: proxy_port,
    verbose: false,
    prepareRequestFunction: ({ request, username, password, hostname, port, isHttp }) => {
        return {
            requestAuthentication: username !== 'sadeghmohebbi' || password !== '123456789'
        }
    },
})

proxy_server.listen(() => {
    console.log(`Proxy server is listening on port ${proxy_port}`);
})
