const ProxyChain = require('proxy-chain')

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
